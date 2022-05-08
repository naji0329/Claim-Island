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
import { CONNECT_WALLET_TIP } from "constants/ui";
import ActionButton from "./ActionButton";
import moment from "moment";
import { useTimer } from "hooks/useTimer";
import { fetchRewards_old } from "web3/gemLocker";
import { fetchRewards } from "web3/gemLockerV2";

// WHEN HARVEST IS CLICKED. CALLED IN ./Poolitem.js
const PoolHarvest = ({
  account: { address },
  bank: { selectedPool, rewards, rewards_old },
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
    if (!rewards_old || !rewards) return "calculating...";
    const {
      farmingRewards: farmingRewards_old,
      vestedClamRewards: vestedClamRewards_old,
      vestedPearlRewards: vestedPearlRewards_old,
    } = rewards_old;
    const { farmingRewards, vestedPearlRewards } = rewards;
    if (
      !farmingRewards_old?.length &&
      !vestedClamRewards_old?.length &&
      !vestedPearlRewards_old?.length &&
      !farmingRewards?.length &&
      !vestedPearlRewards?.length
    )
      return "No locked rewards yet";

    const getUnlockDay_old = () => {
      const endDays = [];
      if (vestedClamRewards_old.length || vestedPearlRewards_old.length) {
        const sortedRewards = [...vestedClamRewards_old, ...vestedPearlRewards_old].sort(
          (a, b) => b.endDay - a.endDay
        );
        endDays.push(+sortedRewards[0].endDay);
      }
      if (farmingRewards_old.length) {
        endDays.push(+farmingRewards_old[farmingRewards_old.length - 1].lockedUntilDay);
      }
      if (!endDays.length) return 0;
      return Math.max(...endDays);
    };

    const getUnlockDay = () => {
      if (farmingRewards.length || vestedPearlRewards.length) {
        const sortedRewards = [...farmingRewards, ...vestedPearlRewards].sort(
          (a, b) => b.unlockDay - a.unlockDay
        );
        return +sortedRewards[0].unlockDay;
      }
      return 0;
    };

    const unlockDay_old = getUnlockDay_old();
    const unlockDay = getUnlockDay();
    if (!unlockDay && !unlockDay_old) return "No locked rewards yet";

    const unlockMoment_old = moment(+rewards_old.startTime * 1000).add(unlockDay_old + 1, "d");
    const unlockMoment = moment(+rewards.startTime * 1000).add(unlockDay + 1, "d");

    const remainingMs = (
      unlockMoment.isAfter(unlockMoment_old) ? unlockMoment : unlockMoment_old
    ).diff(moment());

    return formatMsToDuration(remainingMs);
  };

  const { timeLeft } = useTimer(address ? calculateTimeLeft : () => {});

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

      const setUpPools = await getAllPools({ address });
      const rewards_old = await fetchRewards_old();
      const rewards = await fetchRewards();

      updateBank({
        pools: setUpPools, //update all pools
        selectedPool: {
          ...selectedPool,
          userRewardAmountInPool: 0,
        },
        rewards,
        rewards_old,
      });

      onDepositHarvestSuccess(updateCharacter);
    } catch (error) {
      updateAccount({ error: error.message });
      onDepositHarvestError(updateCharacter);
    }
  };

  const UnlockRow = ({ type, amount, unlockDay, isOld }) => {
    const calculateTimeLeft = () => {
      if (!rewards_old || !rewards) return "calculating...";

      const startTime = +(isOld ? rewards_old.startTime : rewards.startTime) * 1000;

      const unlockMoment = moment(startTime).add(unlockDay + 1, "d");
      const remainingMs = unlockMoment.diff(moment());

      return remainingMs > 0 ? formatMsToDuration(remainingMs) : "Unlocked";
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
      <div className="div_lg">
        <div className="flex flex-col justify-between h-full px-4 py-4 rounded-xl bg-gray-100">
          <div className="w-full flex flex-row justify-between items-center">
            <p className="font-aristotelica-bold text-xl">Harvest Rewards</p>
            {isNativePool && (
              <div data-tip={CONNECT_WALLET_TIP} className={!address ? "tooltip" : ""}>
                <button className="btn btn-info" onClick={toggleModal} disabled={!address}>
                  Boost Rewards
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
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <div className="flex items-start">
              <div className="avatar -mt-1">
                <div className="rounded-full w-12 h-12">
                  <img src={`${process.env.PUBLIC_URL}/favicon/android-chrome-192x192.png`} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-around">
              <div className="mx-2 text-4xl text-right">{harvestAmount}</div>
              {selectedPool.isNative &&
                address &&
                (!rewards_old || !rewards ? (
                  <div className="text-center">Loading rewards data...</div>
                ) : (
                  <div className="flex flex-row items-center justify-end">
                    <div className="mx-2 text-2xl text-right">
                      +
                      {renderNumber(
                        +rewards_old.availableClamRewards +
                          +rewards_old.availablePearlRewards +
                          +rewards.availablePearlRewards,
                        2
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col justify-around">
              <div className="text-md">GEM EARNED</div>
              {selectedPool.isNative && (rewards_old || rewards) && (
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
                        Unlocked boost available for harvest from:
                      </div>
                      <div className="flex justify-between p-2">
                        <span>Clams:</span>
                        <span>{renderNumber(+rewards_old.availableClamRewards, 2)}</span>
                      </div>
                      <div className="flex justify-between p-2">
                        <span>Pearls:</span>
                        <span>
                          {renderNumber(
                            +rewards_old.availablePearlRewards + +rewards.availablePearlRewards,
                            2
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between p-2">
                        <a className="link" onClick={toggleBreakdownModal}>
                          View vesting rewards
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {selectedPool.isNative && (rewards_old || rewards) && (
            <div className="flex justify-around">
              <div className="flex flex-col">
                <div>
                  Total locked:
                  <InfoTooltip
                    className="text-left"
                    text="Must be harvested from native pools when unlocked"
                  />
                </div>
                <div>Fully unlocks in:</div>
              </div>
              <div className="flex flex-col">
                <div className="text-right">
                  {renderNumber(+rewards_old.totalVested + +rewards.totalVested, 2)} GEM
                </div>
                <div className="text-right">{timeLeft}</div>
              </div>
            </div>
          )}

          <div className="dropdown dropdown-top dropdown-end dropdown-hover">
            <ActionButton
              onClick={handleHarvest}
              style="btn-secondary w-full"
              isDisabled={inTx || !address}
              isLoading={inTx}
            >
              Harvest
              <FontAwesomeIcon icon={faInfoCircle} className="ml-1" />
            </ActionButton>
            {address ? (
              <div className="w-72 p-4 card dropdown-content bg-gray-800 text-primary-content text-sm">
                <p className="mb-2">
                  50% of GEM earned is locked for a 7-day vesting period starting from the following
                  day. During this time the vesting GEM can still be used to purchase Clams.
                </p>
                {(rewards_old || rewards) && (
                  <>
                    <p className="mb-2">
                      You currently have{" "}
                      {renderNumber(+rewards_old.totalVested + +rewards.totalVested, 2)} GEM rewards
                      vesting.
                    </p>
                    <a className="link" onClick={toggleBreakdownModal}>
                      View vesting breakdown
                    </a>
                  </>
                )}
              </div>
            ) : (
              <div className="p-2 dropdown-content bg-gray-800 text-primary-content text-sm">
                {CONNECT_WALLET_TIP}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="div_sm">
        <div className="flex flex-col justify-between h-full px-4 py-5 rounded-xl bg-gray-100">
          <div className="flex justify-center">
            <div className="flex items-start">
              <div className="avatar -mt-1">
                <div className="rounded-full w-12 h-12">
                  <img src={`${process.env.PUBLIC_URL}/favicon/android-chrome-192x192.png`} />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-around">
              <div className="mx-2 text-2xl text-right">{harvestAmount}</div>
              {selectedPool.isNative &&
                address &&
                (!rewards_old || !rewards ? (
                  <div className="text-center">Loading rewards data...</div>
                ) : (
                  <div className="flex flex-row items-center justify-end">
                    <div className="mx-2 text-xl text-right">
                      +
                      {renderNumber(
                        +rewards_old.availableClamRewards +
                          +rewards_old.availablePearlRewards +
                          +rewards.availablePearlRewards,
                        2
                      )}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col justify-around">
              <div className="text-md">GEM EARNED</div>
              {selectedPool.isNative && (rewards_old || rewards) && (
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
                        Unlocked boost available for harvest from:
                      </div>
                      <div className="flex justify-between p-2">
                        <span>Clams:</span>
                        <span>{renderNumber(+rewards_old.availableClamRewards, 2)}</span>
                      </div>
                      <div className="flex justify-between p-2">
                        <span>Pearls:</span>
                        <span>
                          {renderNumber(
                            +rewards_old.availablePearlRewards + +rewards.availablePearlRewards,
                            2
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between p-2">
                        <a className="link" onClick={toggleBreakdownModal}>
                          View vesting rewards
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>


          <div className="dropdown dropdown-top dropdown-end dropdown-hover mt-4">
            <ActionButton
              onClick={handleHarvest}
              style="btn-secondary w-full"
              isDisabled={inTx || !address}
              isLoading={inTx}
            >
              Harvest
              <FontAwesomeIcon icon={faInfoCircle} className="ml-1" />
            </ActionButton>
            {address ? (
              <div className="w-72 p-4 card dropdown-content bg-gray-800 text-primary-content text-sm">
                <p className="mb-2">
                  50% of GEM earned is locked for a 7-day vesting period starting from the following
                  day. During this time the vesting GEM can still be used to purchase Clams.
                </p>
                {(rewards_old || rewards) && (
                  <>
                    <p className="mb-2">
                      You currently have{" "}
                      {renderNumber(+rewards_old.totalVested + +rewards.totalVested, 2)} GEM rewards
                      vesting.
                    </p>
                    <a className="link" onClick={toggleBreakdownModal}>
                      View vesting breakdown
                    </a>
                  </>
                )}
              </div>
            ) : (
              <div className="p-2 dropdown-content bg-gray-800 text-primary-content text-sm">
                {CONNECT_WALLET_TIP}
              </div>
            )}
          </div>
        </div>
      </div>
      {(rewards_old || rewards) && (
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
                  {rewards_old.farmingRewards?.map((rewardData) => (
                    <UnlockRow
                      key={`farming_old-${rewardData.lockedUntilDay}`}
                      type={"Bank Harvest"}
                      amount={renderNumber(rewardData.amount)}
                      unlockDay={rewardData.lockedUntilDay}
                      isOld
                    />
                  ))}
                  {rewards.farmingRewards?.map((rewardData) => (
                    <UnlockRow
                      key={`farming-${rewardData.unlockDay}`}
                      type={"Bank Harvest"}
                      amount={renderNumber(rewardData.amount)}
                      unlockDay={rewardData.unlockDay}
                    />
                  ))}
                  {rewards_old.vestedClamRewards?.map((rewardData, i) => (
                    <UnlockRow
                      key={`clam-${i}`}
                      type={"Clam Deposit"}
                      amount={renderNumber(rewardData.bonusRemaining)}
                      unlockDay={rewardData.endDay}
                      isOld
                    />
                  ))}
                  {rewards_old.vestedPearlRewards?.map((rewardData, i) => (
                    <UnlockRow
                      key={`pear_old-${i}`}
                      type={"Pearl Yield"}
                      amount={renderNumber(rewardData.bonusRemaining)}
                      unlockDay={rewardData.endDay}
                      isOld
                    />
                  ))}
                  {rewards.vestedPearlRewards?.map((rewardData, i) => (
                    <UnlockRow
                      key={`pearl-${i}`}
                      type={"Pearl Yield"}
                      amount={renderNumber(rewardData.bonusRemaining)}
                      unlockDay={rewardData.unlockDay}
                    />
                  ))}

                  <tr>
                    <th>Total vesting GEM:</th>
                    <td className="text-right">
                      {renderNumber(+rewards_old.totalVested + +rewards.totalVested, 3)}
                    </td>
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
