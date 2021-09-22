import React, { useState } from "react";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import arrowDownRight from "assets/img/arrow_down_right.png";
import {
  onDepositHarvestTxn,
  onDepositHarvestError,
  onDepositHarvestSuccess,
  onPearlBoostYieldAlert,
} from "../character/OnDepositHarvest";
import { harvest, getAllPools } from "web3/bank";
import { renderNumber } from "utils/number";
import { formatMsToDuration } from "utils/time";
import InfoTooltip from "components/InfoTooltip";
import { Modal, useModal } from "components/Modal";
import ActionButton from "./ActionButton";
import moment from "moment";
import { useTimer } from "hooks/useTimer";

// WHEN HARVEST IS CLICKED. CALLED IN ./Poolitem.js
const PoolHarvest = ({
  account: { address, chainId },
  bank: { selectedPool, rewards },
  updateBank,
  updateCharacter,
  updateAccount,
  toggleModal,
  harvestAmount,
}) => {
  const isNativePool = selectedPool && selectedPool.isNative;
  const [pearlBoostYield, setPearlBoostYield] = useState(false);
  const [inTx, setInTx] = useState(false);
  const { isShowing, toggleModal: toggleBreakdownModal } = useModal();

  const calculateTimeLeft = () => {
    if (!rewards) return "calculating...";
    if (!rewards.farmingRewards.length) return "No locked rewards yet";

    const startTime = +rewards.startTime * 1000;
    const unlockDay = rewards.farmingRewards[rewards.farmingRewards.length - 1].lockedUntilDay;

    const unlockMoment = moment(startTime).add(unlockDay, "d");
    const remainingMs = unlockMoment.diff(moment());

    const duration = formatMsToDuration(remainingMs);

    return duration;
  };

  const { timeLeft } = useTimer(calculateTimeLeft);

  const handleHarvest = async () => {
    setInTx(true);
    if (pearlBoostYield) {
      onPearlBoostYieldAlert(updateCharacter, async () => {
        await executeHarvest();
      });
    } else {
      await executeHarvest();
    }
    setInTx(false);
  };

  const executeHarvest = async () => {
    onDepositHarvestTxn(updateCharacter);
    try {
      await harvest(selectedPool.poolId);

      const setUpPools = await getAllPools({ address, chainId });

      updateBank({
        pools: setUpPools, //update all pools
        selectedPool: {
          ...selectedPool,
          userRewardAmountInPool: 0,
        },
      });

      onDepositHarvestSuccess(updateCharacter);
    } catch (error) {
      updateAccount({ error: error.message });
      onDepositHarvestError(updateCharacter);
    }
  };

  const renderUnlockData = (key, unlockDay, amount) => (
    <div key={key} className="flex justify-between">
      <span>{`GEM unlocking in ${unlockDay} days:`}</span>
      <span>{renderNumber(amount)}</span>
    </div>
  );

  return (
    <div className="w-full" style={{ padding: "0 2%" }}>
      <div className="flex flex-col justify-between h-full px-4 py-4 rounded-xl bg-gray-200">
        <div className="w-full flex flex-row justify-between items-center">
          <p className="font-aristotelica-bold text-2xl">Harvest</p>
          {isNativePool && (
            <button className="btn btn-info" onClick={toggleModal}>
              Boost Yield
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-6 h-6 ml-2 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flew flex-col">
          <div className="flex flex-row items-center justify-center">
            <div className="avatar">
              <div className="mx-2 rounded-full w-12 h-12">
                <img src="https://clamisland.fi/favicon/android-chrome-192x192.png" />
              </div>
            </div>

            <div className="mx-2 text-4xl">{harvestAmount}</div>
            <div className="mx-2 text-md">GEM EARNED</div>
            {/* TODO convert GEM to dola */}
            {/* <div className="mx-2 text-xs">($12.00)</div> */}
          </div>
          {selectedPool.isNative &&
            (!rewards ? (
              <p className="text-center">Loading rewards data...</p>
            ) : (
              <>
                <div className="flex justify-end items-baseline text-xs -mb-2">
                  <span className="w-36 ml-1 opacity-40">FROM</span>
                </div>
                <div className="flex justify-end items-baseline text-xs">
                  <img src={arrowDownRight} width={50} />
                  <span className="w-16 text-right opacity-40">
                    {renderNumber(+harvestAmount + +rewards.availableFarmingRewards, 2)}
                  </span>
                  <span className="w-36 ml-1 opacity-40">FARMING</span>
                </div>
                <div className="flex justify-end items-baseline text-xs -mt-2">
                  <img src={arrowDownRight} width={50} />
                  <span className="w-16 text-right opacity-40">
                    {renderNumber(+rewards.availableClamRewards, 2)}
                  </span>
                  <span className="w-36 ml-1 opacity-40">CLAM</span>
                </div>
                <div className="flex justify-end items-baseline text-xs -mt-2">
                  <img src={arrowDownRight} width={50} />
                  <span className="w-16 text-right opacity-40">
                    {renderNumber(+rewards.availablePearlRewards, 2)}
                  </span>
                  <span className="w-36 ml-1 opacity-40">PEARL</span>
                </div>
              </>
            ))}
        </div>

        {selectedPool.isNative && rewards && (
          <div className="flex flex-col">
            <div className="flex justify-between mx-2">
              <span className="text-right w-1/2">
                Pending boost:
                <InfoTooltip text="Available from any native pool" />
              </span>
              <span className="text-right w-1/2">{renderNumber(+rewards.totalLocked, 2)} GEM</span>
            </div>
            <div className="flex justify-between mx-2">
              <span className="text-right w-1/2">Time left:</span>
              <span className="text-right w-1/2">{timeLeft}</span>
            </div>
          </div>
        )}

        <div className="dropdown dropdown-top dropdown-end dropdown-hover">
          <ActionButton
            onClick={handleHarvest}
            style="btn-harvest w-full"
            isDisabled={inTx}
            isLoading={inTx}
          >
            Harvest
            <FontAwesomeIcon icon={faInfoCircle} className="ml-1" />
          </ActionButton>
          <div className="w-72 p-2 card dropdown-content bg-gray-800 text-primary-content text-sm">
            <p className="mb-2">
              50% of GEM earned is locked for a 7-day vesting period. During this time the vesting
              GEM can still be used to purchase Clams
            </p>
            {rewards && (
              <>
                <p className="mb-2">
                  You currently have {renderNumber(+rewards.totalLocked, 2)} GEM rewards vesting.
                </p>
                <a className="link" onClick={toggleBreakdownModal}>
                  View vesting breakdown
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      {rewards && (
        <Modal
          isShowing={isShowing}
          onClose={toggleBreakdownModal}
          width={"24rem"}
          title="Vested GEM breakdown"
        >
          <div className="mb-2">
            <div className="flex justify-between mb-2">
              <span>Total vesting GEM:</span>
              <span>{renderNumber(+rewards.totalLocked, 3)}</span>
            </div>
            {rewards.farmingRewards.map((rewardData) =>
              renderUnlockData(
                rewardData.lockedUntilDay,
                rewardData.lockedUntilDay - rewards.currentDay,
                rewardData.amount
              )
            )}
            {rewards.clamRewards.map((rewardData, i) =>
              renderUnlockData(i, rewardData.endDay, rewardData.bonusRemaining)
            )}
            {rewards.pearlRewards.map((rewardData, i) =>
              renderUnlockData(i, rewardData.endDay, rewardData.bonusRemainingCorrected)
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PoolHarvest);
