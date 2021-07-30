import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import ClamUnknown from "../../assets/img/clam_unknown.png";
import { deposit, harvest, withdraw, pendingGem } from "../../web3/masterChef";
import {
  approveMasterchefForMaxUint,
  hasMaxUintAllowance,
} from "../../web3/bep20";
import { useAsync } from "react-use";

const PoolItem = ({ updateAccount, ...pool }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [gemEarned, setGemEarned] = useState(0);
  const [depositValue, setDepositValue] = useState(0);

  useAsync(async () => {
    const earnedGem = await pendingGem(pool.poolId);
    setGemEarned(earnedGem);

    const isEnabled = await hasMaxUintAllowance(pool.account, pool.lpToken);
    setIsEnabled(isEnabled);
  });

  const handleHarvest = async () => {
    try {
      await harvest(pool.poolId);
    } catch (error) {
      updateAccount({ error: error.message });
    }
  };

  const handleDeposit = async () => {
    try {
      await deposit(pool.poolId, web3.utils.toWei(depositValue));
    } catch (error) {
      updateAccount({ error: error.message });
    }
  };

  const handleApprove = async () => {
    try {
      await approveMasterchefForMaxUint(pool.account, pool.lpToken);
    } catch (error) {
      updateAccount({ error: error.message });
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 flex flex-col justify-between">
        <div className="flex-1 justify-between  md:flex items-center p-1">
          <div className="w-2/5 avatar-group -space-x-6">
            {pool.images &&
              pool.images.map((image, i) => (
                <div className="avatar bg-white" key={i}>
                  <div className="w-12 h-12">
                    <img src={image} />
                  </div>
                </div>
              ))}
          </div>
          <div className="w-3/5 mx-2">{pool.name}</div>
        </div>

        <div className="px-4 md:px-6 py-2">
          <div className="text-sm flex flex-row justify-between">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                APY
              </p>
              <p className="font-bold text-black">{pool.apy}</p>
            </div>
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Multiplier
              </p>
              <p className="font-bold text-black text-center">
                {pool.multiplier}
              </p>
            </div>
          </div>

          <div className="text-sm flex flex-row justify-between my-2">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                $GEM Earned
              </p>
              <p className="font-bold text-gray-300">{gemEarned}</p>
            </div>
            <div className="text-sm block">
              <button
                className="bg-gray-300 hover:bg-gray-500 px-2 text-white font-semibold text-xs rounded-xl"
                onClick={handleHarvest}
              >
                Harvest
              </button>
            </div>
          </div>

          {!isEnabled && (
            <div className="flex flex-col">
              <button
                className="btn btn-info btn-outline"
                onClick={handleApprove}
              >
                Enable Pool
              </button>
            </div>
          )}

          {isEnabled && (
            <div className="flex flex-col">
              <input
                onChange={(v) => setDepositValue(v.currentTarget.value)}
                value={depositValue}
                className="bg-gray-100 text-center text-xl text-black p-2 font-normal rounded  border font-extrabold w-full my-2"
              />
              <button className="btn btn-info" onClick={handleDeposit}>
                Deposit
              </button>
            </div>
          )}

          <div className="flex flex-col items-center mt-4">
            <button className="w-1/2 btn btn-ghost btn-xs">Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PoolItem;
