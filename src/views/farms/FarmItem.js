import { useState, useEffect, useCallback } from "react";
import { connect } from "redux-zero/react";
import clsx from "clsx";
import { ChainId, useEthers } from "@usedapp/core";
import BigNumber from "bignumber.js";

import { actions } from "store/redux";
import { useTimer } from "../../hooks/useTimer";
import { secondsToFormattedTime } from "../../utils/time";

import { web3 } from "web3";
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
} from "./character/pearlCollection";
import { getPearlDNADecoded } from "web3/pearlDnaDecoder";

const FarmItem = ({
  clamId,
  img,
  dna,
  dnaDecoded,
  clamDataValues,
  onViewDetails,
  onWithdrawClam,
  onViewPearl,
  updateCharacter,
  updateAccount,
  account: { address },
}) => {
  const { chainId } = useEthers();

  const [inTx, setInTx] = useState(false);
  const [action, setAction] = useState("");
  const [buttonText, setButtonText] = useState("");
  const now = Math.round(new Date().getTime() / 1000);
  const [pearlProductionTime, setPearlProductionTime] = useState("");
  const [canStillProducePearl, setCanStillProducePearl] = useState(false);
  const [canProducePearl, setCanProducePearl] = useState(false);
  const [readyForPearl, setReadyForPearl] = useState(false);
  const [gemsNeededForPearlProd, setGemsNeededForPearl] = useState(0);

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

        const rngHashForProducedPearl = await rngRequestHashForProducedPearl(clamId);
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
    if (canProducePearl) {
      setButtonText("Collect Pearl");
      setAction("collect");
    }
    if (!readyForPearl) {
      setButtonText("Open Clam");
      setAction("open");
    }
    if (!canStillProducePearl) setButtonText("Can't produce anymore!");
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
    try {
      setInTx(true);
      setButtonText("Hold on ...");

      const pearlId = await nextPearlId();
      const gems = gemsNeededForPearlProd;

      await collectPearl(clamId).then(async () => {
        const { dna: pearlDna } = await getPearlData(pearlId);
        const pearlDnaDecoded = await getPearlDNADecoded(pearlDna);

        const viewPearl = () => {
          onViewPearl({
            clamId,
            dna: pearlDna,
            dnaDecoded: pearlDnaDecoded,
            showPearlModal: true,
          });
        };
        // character speaks
        pearlCollectSuccess({ updateCharacter, viewPearl }, () => {
          pearlSendToSaferoom({ updateCharacter }, () => {
            pearlGenerateNew({ updateCharacter, gems: formatFromWei(gems) }, async () => {
              const pricePerPearlInGem = gemsNeededForPearlProd;
              const gemBalance = await getBalance(address).then((v) => new BigNumber(v)); // from string to BN
              if (gemBalance.lt(pricePerPearlInGem))
                throw new Error(
                  `You need at least ${formatFromWei(pricePerPearlInGem)} $GEM to stake Clam`
                );
              await approveContractForMaxUintErc721(clamNFTAddress, pearlFarmAddress);
              await infiniteApproveSpending(address, pearlFarmAddress, pricePerPearlInGem);

              const hasClamBeenStakeByUserBefore = await hasClamBeenStakedBeforeByUser(clamId);
              if (hasClamBeenStakeByUserBefore) {
                await stakeClamAgain(clamId);
              } else {
                await stakeClam(clamId);
              }
            });
          });
        });
        setInTx(false);
      });
    } catch (err) {
      updateAccount({ error: err.message });
      setInTx(false);
      setButtonText("Collect Pearl");
      setAction("collect");
    }
  };

  const getClamFunction = () => {
    if (action === "open" || !readyForPearl) return onClickOpenClam();
    if (action === "collect" || canProducePearl) return onClickCollectPearl();
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
