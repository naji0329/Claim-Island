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
import { getBalance } from "web3/gem";
import { canCurrentlyProducePearl, canStillProducePearls } from "web3/clam";
import { getPearlData, tokenOfOwnerByIndex, accountPearlBalance } from "web3/pearl";
import { formatFromWei } from "web3/shared";
import { zeroHash } from "constants/constants";
import { getPearlDNADecoded } from "web3/pearlDnaDecoder";

import {
  pearlCollectSuccess,
  pearlGemPrompt,
  pearlCollectProcessing,
  pearlOpenClam,
  pearlError,
  pearlCollectReadyPrompt,
} from "./character/pearlCollection";

import ActionButton from "views/bank/utils/ActionButton";

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
  const [pearlPrice, setPearlPrice] = useState(new BigNumber(0));
  const [isPearlCollected, setIsPearlCollected] = useState(false);
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
      const isLegacyPearl = gems.gte(0);
      pearlGemPrompt(
        {
          updateCharacter,
          pearlPrice: formatFromWei(pearlPrice),
          gems: isLegacyPearl ? formatFromWei(gems) : "",
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
                console.log(pearlPrice);
                await infiniteApproveSpending(address, pearlFarmAddress, pearlPrice);
              }
            }

            await collectPearl(clamId);

            const userBalanceOfPearls = await accountPearlBalance(address);
            updateAccount({ pearlBalance: userBalanceOfPearls });
            const lastUsersPearlId = await tokenOfOwnerByIndex(address, +userBalanceOfPearls - 1);

            const { dna: pearlDna } = await getPearlData(lastUsersPearlId);
            const pearlDnaDecoded = await getPearlDNADecoded(pearlDna);

            const viewPearl = () => {
              onViewPearl({
                clamId,
                dna: pearlDna,
                dnaDecoded: pearlDnaDecoded,
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
                setInTx,
              });
            });
            setIsPearlCollected(true);
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

  if (isPearlCollected) {
    return null;
  }

  return (
    <div className="FarmItem bg-opacity-90">
      <div className="w-1/4 m-2 mx-auto text-center px-4 py-2 badge badge-success">#{clamId}</div>
      <div className="flex-1 justify-center md:flex items-center p-4">
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
                <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                  Lifespan Remaining
                </p>
                <p className="font-bold text-black text-right">{clam.remainingLifeSpan}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-2">
            <button
              className="withdraw-btn flex justify-center items-center"
              onClick={onWithdrawClam}
              disabled={isWithdrawing}
            >
              <Spinner show={isWithdrawing} color="#ff4b47" />
              Withdraw
            </button>
          </div>

          <div className="px-4 py-2 text-center">
            <button className="view-details" onClick={(e) => onViewDetails(e)}>
              View Details
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 py-2">
          {isInitLoading ? (
            <ActionButton
              onClick={getClamFunction}
              style={action === "open" ? "btn-deposit w-full" : "btn-harvest w-full"}
              isDisabled={true}
              isLoading={inTx}
            >
              <Spinner show="true" color="#333333" /> Loading...
            </ActionButton>
          ) : (
            <ActionButton
              onClick={getClamFunction}
              style={action === "open" ? "btn-deposit w-full" : "btn-harvest w-full"}
              isDisabled={!canProducePearl || inTx || now <= pearlProductionTime}
              isLoading={inTx}
            >
              {buttonText}
            </ActionButton>
          )}
        </div>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(FarmItem);
