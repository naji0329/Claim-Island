import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import classnames from "classnames";

import { deposit, harvest, withdraw, pendingGem } from "../../web3/masterChef";
import pancake from "../../web3/pancake";
import {
  approveMasterchefForMaxUint,
  hasMaxUintAllowance,
  balanceOf,
} from "../../web3/bep20";
import { masterChefAddress } from "../../web3/constants";
import { formatFromWei, formatToWei } from "../../web3/shared";
import { useAsync, createStateContext } from "react-use";

import { useEthers } from "@usedapp/core";
import { useForm } from "react-hook-form";

// shared state across all pool copoments - to avoid passing too much props down to children
const [useSharedState, SharedStateProvider] = createStateContext({
  balances: [null, null, null],
});

const PoolData = ({ depositFee }) => {
  return (
    <div className="w-full px-2">
      <div className="flex flex-row justify-between">
        <p className="text-gray-500 font-semibold">TVL:</p>
        <p className="font-bold text-black text-center">$5,006,710</p>
      </div>
      <div className="flex flex-row justify-between">
        <p className="text-gray-500 font-semibold">Deposit fee:</p>
        <p className="font-bold text-black text-center">{depositFee}%</p>
      </div>
      <div className="flex">
        <a
          href={`https://bscscan.com/address/${masterChefAddress}`}
          target="_blank"
          className="text-gray-500 font-semibold underline"
          rel="noreferrer"
        >
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
  const [state] = useSharedState();
  const { register, handleSubmit, formState } = useForm();
  const { errors, isValid } = formState;
  console.log({ state });

  const handleDeposit = async (data) => {
    try {
      console.log({ data, pool: state.pool });

      await approveMasterchefForMaxUint(state.account, state.pool.lpToken);

      await deposit(state.pool.poolId, formatToWei(data.depositAmount));
    } catch (error) {
      alert("Error! Please try again");
      console.log({ error });
      // updateAccount({ error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleDeposit)}>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between opacity-40 text-xl">
          <div className="">Wallet:</div>
          <div className="flex items-center">
            <div className="mx-2">
              {Number(get(state, "balances[0]", "0.0")).toFixed(4)}
            </div>
            {/* <div className="text-sm">($15.01) </div> */}
          </div>
        </div>

        {/* bank 2.0 feature */}
        {/* <div className="flex items-center  my-4">
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
      </div> */}

        <div className="flex flex-col px-8 py-4">
          <div className="w-full flex justify-between items-center ">
            <input
              {...register("depositAmount", {
                required: true,
                max: get(state, "balances[0]", "0.0"),
              })}
              placeholder="Amount"
              defaultValue={Number("0.0").toFixed(6)}
              className="text-4xl p-2 w-full rounded border-2 border-gray-500 bg-transparent"
            />

            {/* TODO convert to dolar */}
            {/* <div className="text-md opacity-40"> ($7.01) </div> */}
          </div>

          {/* TODO apply range */}
          {/* <div className="my-2">
            <input
              type="range"
              max="100"
              value="4"
              className="range range-xs"
            />
          </div> */}

          {/* TODO better validation with Yulp */}
          {errors.depositAmount && (
            <div className="my-2 text-error">Validation Error</div>
          )}
        </div>

        <button
          // disabled={!isValid}
          type="submit"
          className="w-full text-white bg-green-500 hover:bg-green-400 rounded-xl shadow-xl p-2 text-center text-2xl"
        >
          Deposit {get(state, "pool.name")}
        </button>
      </div>
    </form>
  );
};

const WithdrawTab = () => {
  const [state] = useSharedState();

  const { register, handleSubmit, formState } = useForm();
  const { errors, isValid } = formState;
  console.log({ state });

  const handleWithdraw = async (data) => {
    try {
      console.log({ data, pool: state.pool });

      await withdraw(state.pool.poolId, formatToWei(data.withdrawAmount));
    } catch (error) {
      alert("Error! Please try again");
      console.log({ error });
      // updateAccount({ error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleWithdraw)}>
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between opacity-40 text-xl">
          <div className="">Vault:</div>
          <div className="flex items-center">
            <div className="mx-2">
              {get(state, "pool.userDepositAmountInPool")}
            </div>
            {/* TODO convert LP to dolar */}
            {/* <div className="text-sm">($15.01) </div> */}
          </div>
        </div>

        {/* TODO */}
        {/* <div className="flex items-center  my-4">
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
      </div> */}

        <div className="flex flex-col px-8 py-4">
          <div className="w-full flex justify-between items-center ">
            <input
              {...register("withdrawAmount", {
                required: true,
                max: get(state, "pool.userDepositAmountInPool"),
              })}
              placeholder="Amount"
              defaultValue={Number("0.0").toFixed(6)}
              className="text-4xl p-2 w-full rounded border-2 border-gray-500 bg-transparent"
            />

            {/* TODO convert to dolar */}
            {/* <div className="text-md opacity-40"> ($7.01) </div> */}
          </div>

          {/* TODO RANGE values change */}
          {/* <div className="my-2">
          <input type="range" max="100" value="4" className="range range-xs" />
        </div> */}

          {errors.withdrawAmount && (
            <div className="my-2 text-error">Validation Error</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-white bg-red-500 hover:bg-red-400 rounded-xl shadow-xl p-2 text-center text-2xl"
        >
          Withdraw {get(state, "pool.name")}
        </button>
      </div>
    </form>
  );
};

const PoolDepositWithdraw = () => {
  const [tab, setTab] = useState(0);

  const StateButton = ({ isActive, children, ...rest }) => (
    <button
      {...rest}
      className={classnames("w-full p-4 text-center", {
        "font-aristotelica-bold text-xl bg-gray-300 rounded-t-xl": isActive,
        "font-aristotelica text-xl text-gray-800": !isActive,
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
  const [state] = useSharedState();

  const handleHarvest = async () => {
    try {
      await harvest(state.pool.poolId);
    } catch (error) {
      alert("Error! Try later");
      // updateAccount({ error: error.message });
    }
  };

  return (
    <div className="w-full flex flex-col px-2 bg-gray-200 rounded-xl p-4">
      <div className="w-full flex flex-row justify-between items-center">
        <p className="font-aristotelica-bold text-2xl">Harvest</p>

        <button className="btn btn-info disabled" disabled>
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

          <div className="mx-2 text-6xl">
            {get(state, "pool.userRewardAmountInPool", 0.0)}
          </div>
          <div className="mx-2 text-xl">GEM</div>
          {/* TODO convert GEM to dola */}
          {/* <div className="mx-2 text-xs">($12.00)</div> */}
        </div>

        <button
          onClick={handleHarvest}
          className="w-full text-white bg-blue-500 hover:bg-blue-400 rounded-xl shadow-xl p-2 text-center text-2xl"
        >
          Harvest
        </button>
      </div>
    </div>
  );
};

const PoolItem = ({ account, updateAccount, ...pool }) => {
  // console.log({ pool });
  const depositFee = pool.depositFeeBP / 100;
  const [isOpen, setIsOpen] = useState(false);

  const [isEnabled, setIsEnabled] = useState(false);
  const [gemEarned, setGemEarned] = useState(0);
  const [depositValue, setDepositValue] = useState(0);
  const [, setSharedState] = useSharedState();

  const { activateBrowserWallet } = useEthers();

  useAsync(async () => {
    const earnedGem = await pendingGem(pool.poolId);
    setGemEarned(earnedGem);

    const isEnabled = await hasMaxUintAllowance(pool.account, pool.lpToken);
    setIsEnabled(isEnabled);
  });

  const handleOpen = async () => {
    setIsOpen(true);

    // load balances when open pool item
    const [token0, token1] = await pancake.getLPTokens(pool.lpToken);

    const balancesFormated = await Promise.all([
      balanceOf(pool.lpToken, account), // lp token
      balanceOf(token0, account), // token0
      balanceOf(token1, account), // token1
    ]).then((balancesWei) => balancesWei.map((b) => formatFromWei(b)));
    console.log({ balancesFormated });

    setSharedState({ account, pool, balances: balancesFormated });
  };

  const handleClose = () => setIsOpen(false);

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

          {/* <div className="badge badge-warning">Medium risk</div> */}

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
            <p className="font-bold text-gray-300">
              {pool.userDepositAmountInPool}
            </p>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
              To Harvest
            </p>
            <p className="font-bold text-gray-300">
              {pool.userRewardAmountInPool}
            </p>
          </div>

          <div className="text-sm block">
            {account ? (
              <button onClick={() => (isOpen ? handleClose() : handleOpen())}>
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
              <p
                className="text-gray-500 font-semibold text-xs mb-1 leading-none"
                onClick={() => activateBrowserWallet()}
              >
                Connect Wallet
              </p>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="flex justify-between items-start p-4 border-t-2 border-gray-700">
            <div className="flex w-1/5">
              <PoolData depositFee={depositFee} />
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

const PoolItemWrapper = (props) => {
  return (
    <SharedStateProvider>
      <PoolItem {...props} />
    </SharedStateProvider>
  );
};

export default PoolItemWrapper;
