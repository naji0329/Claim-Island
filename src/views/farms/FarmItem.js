import { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import clsx from "clsx";
import { ChainId, useEthers } from "@usedapp/core";

import { actions } from "../../store/redux";
import FarmPearl from "../../assets/img/farm_pearl.png";

import { web3 } from "../../web3";
import {
  getRemainingPearlProductionTime,
  collectPearl,
  rngRequestHashForProducedPearl,
  propClamOpenForPearl,
} from "../../web3/pearlFarm";
import { canCurrentlyProducePearl, canStillProducePearls } from "../../web3/clam";

const FarmItem = ({
  clamId,
  img,
  dnaDecoded,
  clamDataValues,
  onViewDetails,
  onWithdrawClam,
  onViewPearl,
  updateAccount,
}) => {
  const { chainId } = useEthers();

  const [inTx, setInTx] = useState(false);
  const [buttonText, setButtonText] = useState("Can't produce yet");
  const now = Math.round(new Date().getTime() / 1000);
  const [pearlProductionTime, setPearlProductionTime] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [canStillProducePearl, setCanStillProducePearl] = useState(false);
  const [canProducePearl, setCanProducePearl] = useState(false);
  const [readyForPearl, setReadyForPearl] = useState(false);

  const { pearlProductionStart, pearlProductionCapacity, pearlsProduced } = clamDataValues;

  const progress =
    !+pearlProductionTime || !+remainingTime
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

        const _remainingTime = now > _pearlProductionTime ? 0 : _pearlProductionTime - now;
        setRemainingTime(_remainingTime);

        const rngHashForProducedPearl = await rngRequestHashForProducedPearl(clamId);
        setReadyForPearl(!!+rngHashForProducedPearl);

        const canProduce = await canCurrentlyProducePearl(clamId);
        setCanProducePearl(canProduce);

        const canStillProduce = await canStillProducePearls(clamId);
        setCanStillProducePearl(canStillProduce);
      } catch (err) {
        updateAccount({ error: err.message });
      }
    };

    init();
  }, [inTx]);

  useEffect(() => {
    if (canProducePearl) setButtonText("Collect Pearl");
    if (!readyForPearl) setButtonText("Open Clam");
    if (!canStillProducePearl) setButtonText("Can't produce anymore!");
  }, [readyForPearl, canProducePearl, canStillProducePearl]);

  const clam = {
    remainingTime: new Date(+remainingTime * 1000).toISOString().substr(11, 8),
    progress,
    processing: remainingTime > 0,
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
      setInTx(false);
    }
  };

  const onClickCollectPearl = async () => {
    try {
      setInTx(true);
      setButtonText("Hold on ...");
      await collectPearl(clamId);
      setInTx(false);
    } catch (err) {
      updateAccount({ error: err.message });
      setInTx(false);
    }
  };

  const getClamFunction = () => {
    if (!readyForPearl) return onClickOpenClam();
    if (canProducePearl) return onClickCollectPearl();
  };

  return (
    <div className="FarmItem">
      <div className="flex-1 justify-center md:flex items-center p-4">
        <img className="w-auto" src={img} />
      </div>
      {chainId === ChainId.Localhost && (
        <button
          className="btn m-2"
          onClick={async () => {
            const block = await web3.eth.getBlock(await web3.eth.getBlockNumber());
            console.log(`block`, block.number);
            console.log(`timestamp`, block.timestamp);
            await web3.currentProvider.send(
              {
                jsonrpc: "2.0",
                method: "evm_mine",
                id: new Date().getTime(),
              },
              (err, result) => {
                console.log(`err`, err);
                console.log(`result`, result);
              }
            );

            await web3.currentProvider.send(
              {
                jsonrpc: "2.0",
                method: "evm_increaseTime",
                params: [100000],
                id: new Date().getTime(),
              },
              (err, result) => {
                console.log(`err`, err);
                console.log(`result`, result);
              }
            );
          }}
        >
          Advance time
        </button>
      )}

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
                <p className="font-bold text-black">{clam.remainingTime}</p>
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
            <button className="withdraw-btn" onClick={onWithdrawClam}>
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
