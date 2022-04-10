import { useState, useEffect, useCallback } from "react";
import { connect } from "redux-zero/react";
import { toast } from "react-toastify";

import { actions } from "store/redux";
import { useTimer } from "hooks/useTimer";
import { ifPearlSendSaferoom } from "./utils";
import { secondsToFormattedTime } from "utils/time";
import { Spinner } from "components/spinner";

import {
  getRemainingPearlProductionTime,
  collectPearl,
  rngRequestHashForProducedPearl,
  propClamOpenForPearl,
  stakePrice,
  gemsTransferred,
} from "web3/pearlFarm";
import { getRNGFromHashRequest } from "web3/rng";
import { getAllowance, getBalance, infiniteApproveSpending } from "web3/gem";
import { canCurrentlyProducePearl, canStillProducePearls } from "web3/clam";
import { tokenOfOwnerByIndex, accountPearlBalance } from "web3/pearl";
import { formatFromWei, getOwnedPearls } from "web3/shared";
import { pearlFarmAddress, zeroHash } from "constants/constants";

import {
  pearlCollectSuccess,
  pearlGemPrompt,
  pearlCollectProcessing,
  pearlOpenClam,
  pearlError,
  pearlCollectReadyPrompt,
} from "./character/pearlCollection";

import ActionButton from "views/bank/utils/ActionButton";
import BigNumber from "bignumber.js";
import { renderNumber } from "utils/number";

const FarmItem = ({
  clamId,
  img,
  dnaDecoded,
  clamDataValues,
  onViewDetails,
  onWithdrawClam,
  onViewPearl,
  updateCharacter,
  updateAccount,
  account: { address },
  withdrawingClamId,
  updateClams,
  updateStakedClams,
}) => {
  const [inTx, setInTx] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(true);

  const [action, setAction] = useState("");
  const [buttonText, setButtonText] = useState("");
  const now = Math.round(new Date().getTime() / 1000);
  const [pearlProductionTime, setPearlProductionTime] = useState("");
  const [canStillProducePearl, setCanStillProducePearl] = useState(false);
  const [canProducePearl, setCanProducePearl] = useState(false);
  const [readyForPearl, setReadyForPearl] = useState(false);
  const [gemApproved, setGemApproved] = useState(false);
  const [pearlPrice, setPearlPrice] = useState("0");
  const isWithdrawing = withdrawingClamId === clamId;
  const calculateTimeLeft = useCallback(() => {
    const now = Math.round(Date.now() / 1000);
    return now > pearlProductionTime ? 0 : pearlProductionTime - now;
  }, [pearlProductionTime]);
  const { timeLeft } = useTimer(calculateTimeLeft);
  const { pearlProductionStart, pearlProductionCapacity, pearlsProduced } = clamDataValues;

  const progress =
    !+pearlProductionTime || !timeLeft
      ? 100
      : +(
          ((now - pearlProductionStart) / (pearlProductionTime - pearlProductionStart)) *
          100
        ).toFixed(2);

  useEffect(() => {
    const init = async () => {
      try {
        const _productionTimeTotal = await getRemainingPearlProductionTime(clamId);
        const _pearlProductionTime = +now + +_productionTimeTotal;
        setPearlProductionTime(_pearlProductionTime);

        const rngHashForProducedPearl = await rngRequestHashForProducedPearl(clamId, address);
        if (rngHashForProducedPearl !== zeroHash && !!rngHashForProducedPearl) {
          const dna = await getRNGFromHashRequest(rngHashForProducedPearl);
          if (dna !== zeroHash && !!dna) {
            setReadyForPearl(true);
          }
        }

        const canProduce = await canCurrentlyProducePearl(clamId);
        setCanProducePearl(canProduce);

        const canStillProduce = await canStillProducePearls(clamId);
        setCanStillProducePearl(canStillProduce);

        const pPrice = await stakePrice(); // price as string
        setPearlPrice(pPrice);

        // set up for GEM approval comparison check
        const pPriceAsBigNumber = new BigNumber(pPrice);
        const gemAllowance = await getAllowance(address, pearlFarmAddress).then(
          (v) => new BigNumber(v)
        );

        setGemApproved(pPriceAsBigNumber.lt(gemAllowance));
      } catch (err) {
        updateAccount({ error: err.message });
      }
    };

    init().then(() => {
      setIsInitLoading(false);
    });
  }, [inTx, address]);

  useEffect(() => {
    if (!isInitLoading) {
      if (readyForPearl) {
        setButtonText("Collect Pearl");
        setAction("collect");
      } else if (now >= pearlProductionTime && canProducePearl) {
        setButtonText("Open Clam");
        setAction("open");
      } else if (!canStillProducePearl) {
        setButtonText("Can't produce anymore!");
      } else {
        setButtonText("Loading...");
        console.log(pearlProductionTime + " " + now);
      }
    }
  }, [readyForPearl, canProducePearl, canStillProducePearl, isInitLoading]);

  const clam = {
    remainingFormattedTime: secondsToFormattedTime(timeLeft),
    remainingTime: timeLeft,
    progress,
    processing: timeLeft > 0,
    dnaDecoded,
    heading: dnaDecoded.rarity,
    harvestableShell: 1 + pearlsProduced * 0.1,
    remainingLifeSpan: +pearlProductionCapacity - +pearlsProduced,
  };

  const onClickOpenClam = async () => {
    try {
      setInTx(true);
      setButtonText("Hold on ...");
      pearlOpenClam({ updateCharacter });
      await propClamOpenForPearl(clamId);
      setInTx(false);
      pearlCollectReadyPrompt({ updateCharacter, pearlPrice }, async () => {
        return onClickCollectPearl();
      });
    } catch (err) {
      updateAccount({ error: err.message });
      pearlError({ updateCharacter });
      setButtonText("Open Clam");
      setAction("open");
      setInTx(false);
    }
  };

  const onClickCollectPearl = async () => {
    try {
      const gems = await gemsTransferred(address, clamId);
      const isLegacyPearl = new BigNumber(gems).gt(0);
      pearlGemPrompt(
        {
          updateCharacter,
          pearlPrice: renderNumber(+formatFromWei(pearlPrice), 3),
          gems: isLegacyPearl ? renderNumber(+formatFromWei(gems), 3) : "",
        },
        async () => {
          pearlCollectProcessing({ updateCharacter });
          try {
            setInTx(true);
            setButtonText("Hold on ...");

            if (!isLegacyPearl) {
              const gemBalance = await getBalance(address).then((v) => new BigNumber(v)); // from string to BN
              if (gemBalance.lt(pearlPrice))
                throw new Error(
                  `You need at least ${formatFromWei(pearlPrice)} GEM to collect Pearl`
                );

              if (!gemApproved) {
                setButtonText("Approving GEM...");
                await infiniteApproveSpending(address, pearlFarmAddress, pearlPrice);
              }
            }

            await collectPearl(clamId);

            const [pearlBalance] = await Promise.all([accountPearlBalance(address), updateClams()]);

            const lastUsersPearlId = await tokenOfOwnerByIndex(address, +pearlBalance - 1);
            const pearls = await getOwnedPearls({
              address,
              balance: pearlBalance,
            });

            updateAccount({ pearlBalance, pearls });

            const viewPearl = () => {
              onViewPearl({
                clamId,
                pearl: pearls.find(({ pearlId }) => pearlId === lastUsersPearlId),
                showPearlModal: true,
              });
            };

            setInTx(false);

            // character speaks
            pearlCollectSuccess({ updateCharacter, viewPearl }, () => {
              ifPearlSendSaferoom({
                updateCharacter,
                address,
                clamId,
                cb: () => {
                  updateClams();
                  updateStakedClams();
                },
              });
            });
            updateClams();
            updateStakedClams();
          } catch (err) {
            updateAccount({ error: err.message });
            setInTx(false);
            setButtonText("Collect Pearl");
            setAction("collect");
            const errorMsg = JSON.parse(err.message.split("\n").slice(1).join(""));
            toast.error(
              <>
                <p>There was an error collecting your pearl.</p>
                <p>{errorMsg.message}</p>
              </>
            );
          }
        }
      );
    } catch (err) {
      updateAccount({ error: err.message });
      pearlError({ updateCharacter });
    }
  };

  const getClamFunction = () => {
    if (action === "collect") return onClickCollectPearl();
    if (action === "open") return onClickOpenClam();
  };

  return (
    <div className="FarmItem bg-opacity-90">
    <div className="flex justify-between px-4 pt-4">
      <div className=" badge badge-success">#{clamId}</div>
      <div className="text-green-400 text-bold">{dnaDecoded.rarity}</div>
    </div>
      <div className="flex-1 justify-center md:flex items-start p-4">
        <button onClick={(e) => onViewDetails(e)}>
          <img className="w-auto" src={img} />
        </button>
      </div>
      {clam.processing && !isInitLoading ? (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className={"base-bar " + (clam.progress < 100 ? "base-bar-animated" : "")}>
              <div style={{ width: clam.progress + "%" }} className="completion-bar"></div>
              <span>Producing {clam.progress}%</span>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 md:px-6 py-2">
            <div className="text-sm flex flex-row justify-between">
              <div className="text-sm block">
                <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                  Remaining Time
                </p>
                <p className="font-bold text-black">{clam.remainingFormattedTime}</p>
              </div>
              <div className="text-sm block">
                <p className="text-gray-500 font-semibold text-xs text-right mb-1 leading-none">
                  Lifespan Remaining
                </p>
                <p className="font-bold text-black text-right">
                  {clam.remainingLifeSpan + " Pearls"}
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-2">
            <button
              className="btn btn-neutral btn-outline w-full"
              onClick={(e) => onViewDetails(e)}
            >
              View Details
            </button>
          </div>

          <div className="px-4 py-2">
            <button
              className="btn btn-secondary w-full"
              onClick={onWithdrawClam}
              disabled={isWithdrawing}
            >
              <Spinner show={isWithdrawing} color="#ff4b47" />
              Withdraw
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 py-2">
          {isInitLoading ? (
            <ActionButton
              onClick={getClamFunction}
              style={action === "open" ? "btn btn-primary w-full" : "btn btn-secondary w-full"}
              isDisabled={true}
              isLoading={inTx}
            >
              <Spinner show="true" color="#333333" /> Loading...
            </ActionButton>
          ) : (
            <>
              <ActionButton
                onClick={getClamFunction}
                style={action === "open" ? "btn btn-primary w-full" : "btn btn-secondary w-full"}
                isDisabled={!canProducePearl || inTx || now <= pearlProductionTime}
                isLoading={inTx}
              >
                {buttonText}
              </ActionButton>

                <button
                  className="btn btn-secondary w-full mt-4"
                  onClick={onWithdrawClam}
                  disabled={isWithdrawing || inTx || action === "collect"}
                >
                  <Spinner show={isWithdrawing} color="#ff4b47" />
                  Withdraw
                </button>

            </>
          )}
        </div>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(FarmItem);
