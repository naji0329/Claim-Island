import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import classnames from "classnames";

import ClamUnknown from "../../assets/img/clam_unknown.png";
import { deposit, harvest, withdraw, pendingGem } from "../../web3/masterChef";
import {
  approveMasterchefForMaxUint,
  hasMaxUintAllowance,
} from "../../web3/bep20";
import { useAsync } from "react-use";

const PoolData = () => {
  return (
    <div className="w-full px-2">
      <div className="flex flex-row justify-between">
        <p className="text-gray-500 font-semibold">TVL:</p>
        <p className="font-bold text-black text-center">$5,006,710</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-gray-500 font-semibold">Deposit fee:</p>
        <p className="font-bold text-black text-center">5%</p>
      </div>
      <div className="flex">
        <a href="#" className="text-gray-500 font-semibold underline">
          BSC Scan
        </a>
      </div>
      <div className="flex">
        <a href="#" className="text-gray-500 font-semibold underline">
          Read Documents
        </a>
      </div>
    </div>
  );
};

const DepositTab = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between opacity-40 text-xl">
        <div className="">Wallet(BNB):</div>
        <div className="flex items-center">
          <div className="mx-2">68.99</div>
          <div className="text-sm">($15.01) </div>
        </div>
      </div>

      <div className="flex items-center  my-4">
        <div className="text-xl mr-4">Deposit with</div>

        <div className="flex items-center">
          <div className="avatar">
            <div className=" rounded-full w-8 h-8">
              <img src="https://clamisland.fi/favicon/android-chrome-192x192.png" />
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col px-8 py-4">
        <div className="w-full flex justify-between items-center ">
          <div className="text-4xl"> 15.16 </div>
          <div className="text-md opacity-40"> ($7.01) </div>
        </div>
        <div className="my-2">
          <input type="range" max="100" value="4" className="range range-xs" />
        </div>
      </div>

      <button className="w-full text-white bg-gray-500 hover:bg-gray-400 rounded-xl shadow-xl p-2 text-center text-2xl">
        Deposit now
      </button>
    </div>
  );
};

const WithdrawTab = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between opacity-40 text-xl">
        <div className="">Vault ($GEM):</div>
        <div className="flex items-center">
          <div className="mx-2">68.99</div>
          <div className="text-sm">($15.01) </div>
        </div>
      </div>

      <div className="flex items-center  my-4">
        <div className="text-xl mr-4">Withdraw to</div>

        <div className="flex items-center">
          <div className="avatar">
            <div className=" rounded-full w-8 h-8">
              <img src="https://clamisland.fi/favicon/android-chrome-192x192.png" />
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col px-8 py-4">
        <div className="w-full flex justify-between items-center ">
          <div className="text-4xl"> 15.16 </div>
          <div className="text-md opacity-40"> ($7.01) </div>
        </div>
        <div className="my-2">
          <input type="range" max="100" value="4" className="range range-xs" />
        </div>
      </div>

      <button className="w-full text-white bg-gray-500 hover:bg-gray-400 rounded-xl shadow-xl p-2 text-center text-2xl">
        Withdraw now
      </button>
    </div>
  );
};

const PoolDepositWithdraw = () => {
  const [tab, setTab] = useState(0);

  const StateButton = ({ isActive, children, ...rest }) => (
    <button
      {...rest}
      className={classnames("w-full p-4 text-center", {
        "text-white bg-gray-300 rounded-t-xl": isActive,
        "text-gray-800": !isActive,
      })}
    >
      {children}
    </button>
  );

  const handleSelect = (i) => {
    console.log({ i });
    setTab(i);
  };

  return (
    <div className="w-full px-2">
      <div className="flex flex-row justify-between">
        <StateButton isActive={tab === 0} onClick={() => handleSelect(0)}>
          Deposit
        </StateButton>
        <StateButton isActive={tab === 1} onClick={() => handleSelect(1)}>
          Withdraw
        </StateButton>
      </div>

      <div
        className={classnames("flex w-full bg-gray-200 p-4", {
          "rounded-b-xl rounded-tr-xl": tab === 0,
          "rounded-b-xl rounded-tl-xl": tab === 1,
        })}
      >
        {tab === 0 && <DepositTab />}

        {tab === 1 && <WithdrawTab />}
      </div>
    </div>
  );
};

const PoolHarvest = () => {
  return (
    <div className="w-full flex flex-col px-2 bg-gray-200 rounded-xl p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-aristotelica-bold text-2xl">Harvest</p>

        <button className="btn btn-info">
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
      </div>
      <div className="flew flex-col">
        <div className="flex flex-row items-center justify-center my-20">
          <div className="avatar">
            <div className="mx-2 rounded-full w-12 h-12">
              <img src="https://clamisland.fi/favicon/android-chrome-192x192.png" />
            </div>
          </div>

          <div className="mx-2 text-6xl">12.00</div>
          <div className="mx-2 text-xs">($12.00)</div>
        </div>

        <button className="w-full text-white bg-gray-500 hover:bg-gray-400 rounded-xl shadow-xl p-2 text-center text-2xl">
          Harvest
        </button>
      </div>
    </div>
  );
};

const PoolItem = ({ account, updateAccount, ...pool }) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-800 flex flex-col justify-between mb-4">
        <div className="flex justify-between items-center py-1 px-4">
          <div className="flex justify-start items-center min-w-xs">
            <div className="avatar-group -space-x-6">
              {pool.images &&
                pool.images.map((image, i) => (
                  <div className="avatar bg-white" key={i}>
                    <div className="w-12 h-12">
                      <img src={image} />
                    </div>
                  </div>
                ))}
            </div>
            <div className="mx-2 font-aristotelica-bold text-xl">
              {pool.name}
            </div>
          </div>

          <div className="badge badge-warning">Medium risk</div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
              Reward Share
            </p>
            <p className="font-bold text-black text-center">
              {pool.multiplier}%
            </p>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
              APR
            </p>
            <p className="font-bold text-black">{pool.apy}</p>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
              Deposited
            </p>
            <p className="font-bold text-gray-300">0.00</p>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
              To Harvest
            </p>
            <p className="font-bold text-gray-300">0.00</p>
          </div>

          <div className="text-sm block">
            {account ? (
              <button onClick={() => setIsOpen(!isOpen)}>
                <svg
                  className={classnames(
                    "fill-current text-blue-700 h-6 w-6 transform transition-transform duration-500",
                    { "rotate-180": isOpen }
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                </svg>
              </button>
            ) : (
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Connect Wallet
              </p>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="flex justify-between items-start p-4 border-t-2 border-gray-700">
            <div className="flex w-1/5">
              <PoolData />
            </div>

            <div className="flex w-2/5">
              <PoolDepositWithdraw />
            </div>

            <div className="flex w-2/5">
              <PoolHarvest />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PoolItem;
