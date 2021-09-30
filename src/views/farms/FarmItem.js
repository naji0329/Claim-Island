import { useState, useEffect, useCallback } from "react";
import { connect } from "redux-zero/react";
import clsx from "clsx";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";

import { actions } from "store/redux";
import { useTimer } from "hooks/useTimer";
import { secondsToFormattedTime } from "utils/time";
import { Spinner } from "components/spinner";

import {
  getRemainingPearlProductionTime,
  collectPearl,
  rngRequestHashForProducedPearl,
  propClamOpenForPearl,
  stakeClam,
  stakeClamAgain,
  stakePrice,
  hasClamBeenStakedBeforeByUser,
} from "web3/pearlFarm";
import { canCurrentlyProducePearl, canStillProducePearls } from "web3/clam";
import { nextPearlId, getPearlData } from "web3/pearl";

import { getBalance, infiniteApproveSpending } from "web3/gem";
import { approveContractForMaxUintErc721 } from "web3/bep20";
import { clamNFTAddress, pearlFarmAddress } from "web3/constants";
import { formatFromWei } from "web3/shared";

import {
  pearlCollectSuccess,
  pearlSendToSaferoom,
  pearlGenerateNew,
  pearlGemPrompt,
  pearlCollectProcessing,
  pearlNotEnoughGems
} from "./character/pearlCollection";
import { getPearlDNADecoded } from "web3/pearlDnaDecoder";

import { ifPearlSendSaferoom } from './utils';

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
  const [action, setAction] = useState("");
  const [buttonText, setButtonText] = useState("");
  const now = Math.round(new Date().getTime() / 1000);
  const [pearlProductionTime, setPearlProductionTime] = useState("");
  const [canStillProducePearl, setCanStillProducePearl] = useState(false);
  const [canProducePearl, setCanProducePearl] = useState(false);
  const [readyForPearl, setReadyForPearl] = useState(false);
  const [gemsNeededForPearlProd, setGemsNeededForPearl] = useState(0);
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
        const _pearlProductionTime = +pearlProductionStart + +_productionTimeTotal;
        setPearlProductionTime(_pearlProductionTime);

        const rngHashForProducedPearl = await rngRequestHashForProducedPearl(clamId, address);
        setReadyForPearl(!!+rngHashForProducedPearl);

        const canProduce = await canCurrentlyProducePearl(clamId);
        setCanProducePearl(canProduce);

        const canStillProduce = await canStillProducePearls(clamId);
        setCanStillProducePearl(canStillProduce);

        const priceForPearlInGem = await stakePrice();
        setGemsNeededForPearl(priceForPearlInGem);
      } catch (err) {
        updateAccount({ error: err.message });
      }
    };

    init();
  }, [inTx, address]);

  useEffect(() => {
    setButtonText("Hold on ...");
    if (readyForPearl) {
      setButtonText("Collect Pearl");
      setAction("collect");
    } else if (canProducePearl) {
      setButtonText("Open Clam");
      setAction("open");
    }

    if (!canStillProducePearl) {
      setButtonText("Can't produce anymore!");
    }
  }, [readyForPearl, canProducePearl, canStillProducePearl]);

  const clam = {
    remainingFormattedTime: secondsToFormattedTime(timeLeft),
    remainingTime: timeLeft,
    progress,
    processing: timeLeft > 0,
    dnaDecoded,
    heading: dnaDecoded.rarity,
    harvestableShell: 1 + pearlsProduced * 0.1,
    remainingLifeSpan: pearlProductionCapacity - pearlsProduced,
  };

  const onClickViewPearl = async () => {
    setButtonText("Hold on ...");
    const success = await onViewPearl(clamId);
    if (!success) {
      setButtonText("View Pearl");
    }
  };

  const onClickOpenClam = async () => {
    try {
      setInTx(true);
      setButtonText("Hold on ...");
      await propClamOpenForPearl(clamId);
      setInTx(false);
    } catch (err) {
      updateAccount({ error: err.message });
      setButtonText("Open Clam");
      setAction("open");
      setInTx(false);
    }
  };

  const onClickCollectPearl = async () => {
    const gems = gemsNeededForPearlProd;
    pearlGemPrompt({ updateCharacter, gems: formatFromWei(gems) }, async () => {
      pearlCollectProcessing({ updateCharacter });
      try {
        setInTx(true);
        setButtonText("Hold on ...");

        const pearlId = await nextPearlId();

        await collectPearl(clamId);
        const { dna: pearlDna } = await getPearlData(pearlId);
        const pearlDnaDecoded = await getPearlDNADecoded(pearlDna);

        const viewPearl = () => {
          onViewPearl({
            clamId,
            dna: pearlDna,
            dnaDecoded: pearlDnaDecoded,
            showPearlModal: true
          });
        };

        // character speaks
        pearlCollectSuccess({ updateCharacter, viewPearl }, () => {
          ifPearlSendSaferoom({
            updateCharacter,
            address,
            clamId,
            setInTx
          });
        });
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
    });
  };

  const getClamFunction = () => {
    if (action === "collect") return onClickCollectPearl();
    if (action === "open") return onClickOpenClam();
  };

  return (
    <div className="FarmItem">
      <div className="w-1/4 m-2 mx-auto text-center px-4 py-2 badge badge-success">#{clamId}</div>
      <div className="flex-1 justify-center md:flex items-center p-4">
        <button onClick={(e) => onViewDetails(e, clam)}>
          <img className="w-auto" src={img} />
        </button>
      </div>
      {clam.processing ? (
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
              disabled={withdrawingClamId}
            >
              <Spinner show={isWithdrawing} color="#ff4b47" />
              Withdraw
            </button>
          </div>

          <div className="px-4 py-2 text-center">
            <button className="view-details" onClick={(e) => onViewDetails(e, clam)}>
              View Details
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 py-2">
          <button
            className={clsx("view-pearl-btn", (!canProducePearl || inTx) && "btn-disabled")}
            onClick={getClamFunction}
            disabled={!canProducePearl || inTx}
          >
            {buttonText}
          </button>
        </div>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(FarmItem);
