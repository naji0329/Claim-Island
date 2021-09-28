import React, { useState } from "react";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
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
  const startTime = +rewards.startTime * 1000;

  const calculateTimeLeft = () => {
    if (!rewards) return "calculating...";
    const { farmingRewards, vestedClamRewards, vestedPearlRewards } = rewards;
    if (!farmingRewards.length && !vestedClamRewards.length && !vestedPearlRewards.length)
      return "No locked rewards yet";

    const getUnlockDay = () => {
      if (vestedClamRewards.length || vestedPearlRewards.length) {
        const sortedRewards = [...vestedClamRewards, ...vestedPearlRewards].sort(
          (a, b) => b.endDay - a.endDay
        );
        return sortedRewards[0].endDay;
      }
      if (farmingRewards.length) return farmingRewards[farmingRewards.length - 1].lockedUntilDay;
    };

    const unlockDay = getUnlockDay();
    if (!unlockDay) return "No locked rewards yet";

    const unlockMoment = moment(startTime).add(unlockDay, "d");
    const remainingMs = unlockMoment.diff(moment());

    return formatMsToDuration(remainingMs);
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

  const UnlockRow = ({ type, amount, unlockDay }) => {
    const calculateTimeLeft = () => {
      if (!rewards) return "calculating...";

      const unlockMoment = moment(startTime).add(unlockDay, "d");
      const remainingMs = unlockMoment.diff(moment());

      return formatMsToDuration(remainingMs);
    };

    const { timeLeft } = useTimer(calculateTimeLeft);

    return (
      <tr>
        <th>{type}</th>
        <td className="text-right">{amount}</td>
        <td className="text-right">{timeLeft}</td>
      </tr>
    );
  };

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
        <div className="flex justify-center">
          <div className="flex items-start">
            <div className="avatar -mt-1">
              <div className="rounded-full w-12 h-12">
                <img src="https://clamisland.fi/favicon/android-chrome-192x192.png" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-around">
            <div className="mx-2 text-4xl text-right">{harvestAmount}</div>
            {selectedPool.isNative &&
              (!rewards ? (
                <div className="text-center">Loading rewards data...</div>
              ) : (
                <div className="flex flex-row items-center justify-end">
                  <div className="mx-2 text-2xl text-right">
                    +
                    {renderNumber(
                      +rewards.availableClamRewards + +rewards.availablePearlRewards,
                      2
                    )}
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-around">
            <div className="text-md">GEM EARNED</div>
            {selectedPool.isNative && rewards && (
              <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                <div className="flex text-sm items-center">
                  GEM BOOST
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>

                <div className="w-64 p-2 card dropdown-content bg-gray-800 text-primary-content text-sm">
                  <div className="flex flex-col">
                    <div className="flex justify-between p-2">
                      <span>from Clams:</span>
                      <span>{renderNumber(+rewards.availableClamRewards, 2)}</span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span>from Pearls:</span>
                      <span>{renderNumber(+rewards.availablePearlRewards, 2)}</span>
                    </div>
                    <div className="flex justify-between p-2">
                      <span>total ready to harvest:</span>
                      <span>
                        {renderNumber(
                          +rewards.availableClamRewards + +rewards.availablePearlRewards,
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {selectedPool.isNative && rewards && (
          <div className="flex justify-around">
            <div className="flex flex-col">
              <div>
                Total locked:
                <InfoTooltip text="Available from any native pool" />
              </div>
              <div>Fully unlocks in:</div>
            </div>
            <div className="flex flex-col">
              <div className="text-right">{renderNumber(+rewards.totalLocked, 2)} GEM</div>
              <div className="text-right">{timeLeft}</div>
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
          width={"36rem"}
          title="Vested GEM breakdown"
        >
          <div className="mb-2">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Reward from</th>
                    <th>$GEM Amount</th>
                    <th style={{ minWidth: 180 }}>Fully unlocks in</th>
                  </tr>
                </thead>
                <tbody>
                  {rewards.farmingRewards.map((rewardData) => (
                    <UnlockRow
                      key={rewardData.lockedUntilDay}
                      type={"Farming locked"}
                      amount={renderNumber(rewardData.amount)}
                      unlockDay={rewardData.lockedUntilDay - rewards.currentDay}
                    />
                  ))}

                  {rewards.vestedClamRewards.map((rewardData, i) => (
                    <UnlockRow
                      key={`clam-${i}`}
                      type={"Clam staking"}
                      amount={renderNumber(rewardData.bonusRemaining)}
                      unlockDay={rewardData.endDay}
                    />
                  ))}
                  {rewards.vestedPearlRewards.map((rewardData, i) => (
                    <UnlockRow
                      key={`pearl-${i}`}
                      type={"Pearl burn"}
                      amount={renderNumber(rewardData.bonusRemaining)}
                      unlockDay={rewardData.endDay}
                    />
                  ))}

                  <tr>
                    <th>Total vesting GEM:</th>
                    <td className="text-right">{renderNumber(+rewards.totalLocked, 3)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PoolHarvest);
