import { pick } from "lodash";
import BigNumber from "bignumber.js";
import { formatEther } from "@ethersproject/units";

import bankAbi from "./abi/Bank.json";
import { bankAddress, gemTokenAddress, shellTokenAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getAccount, formatFromWei } from "./shared";

import { aggregate } from "./multicall";
import poolAssets from "../views/bank/poolsAssets";
import { getUsdValueOfPair, getUsdPriceOfToken } from "./pancakeRouter";
import { getGemPrice } from "./gemOracle";
import { totalSupply } from "./bep20";

const bank = () =>
  contractFactory({
    abi: bankAbi,
    address: bankAddress,
  });

const eventCallback = async (res) => {
  try {
    console.log("Success", { res }); // add a toaster here

    return res;
  } catch (error) {
    console.error(error); // add toaster to show error

    return error;
  }
};

export const getPoolInfo = async (pid) => {
  const poolInfo = await bank().methods.poolInfo(pid).call();
  return poolInfo;
};

export const prepGetPoolInfoForMulticall = (len) => {
  const contractCalls = [];
  for (let index = 0; index < Number(len); index++) {
    contractCalls.push([
      bankAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "poolInfo",
          type: "function",
          inputs: [
            {
              type: "uint256",
              name: "pid",
            },
          ],
        },
        [index]
      ),
    ]);
  }

  return contractCalls;
};

export const decodePoolInfoReturnFromMulticall = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      poolId: index,
      poolInfoValues: web3.eth.abi.decodeParameter(
        {
          poolInfo: {
            lpToken: "address",
            allocPoint: "uint256",
            lastRewardBlock: "uint256",
            accGemPerShare: "uint256",
            depositFeeBP: "uint256",
          },
        },
        values[index]
      ),
    });
  }

  return result;
};

export const prepGetUserInfoForMulticall = (len, account) => {
  const contractCalls = [];
  for (let index = 0; index < Number(len); index++) {
    contractCalls.push([
      bankAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "userInfo",
          type: "function",
          inputs: [
            {
              internalType: "uint256",
              name: "pid",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
        },
        [index, account]
      ),
    ]);
  }

  return contractCalls;
};

export const decodeUserInfoReturnFromMulticall = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      poolId: index,
      userValues: web3.eth.abi.decodeParameter(
        {
          user: {
            amount: "uint256",
            rewardDebt: "uint256",
          },
        },
        values[index]
      ),
    });
  }

  return result;
};

export const getTokenSupplies = async () => {
  return await bank().methods.getTokenSupplies().call();
};

export const getPoolsLength = async () => {
  const poolsLen = await bank().methods.poolLength().call();
  return poolsLen;
};

export const deposit = async (pid, amount) => {
  const account = getAccount();
  const method = bank().methods.deposit(pid, amount);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation }).once("Deposit", eventCallback);
};

export const harvestAllPools = async () => {
  const account = getAccount();
  const method = bank().methods.harvestAllPools();
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation }).once("Deposit", eventCallback);
};

export const harvest = async (pid) => {
  const account = getAccount();
  const method = bank().methods.deposit(pid, 0);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation }).once("Deposit", eventCallback);
};

export const withdraw = async (pid, amount) => {
  const account = getAccount();
  const method = bank().methods.withdraw(pid, amount);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation }).once("Withdraw", eventCallback);
};

export const pendingGem = async (pid) => {
  let account;
  try {
    account = getAccount();
  } catch {
    return 0;
  }
  const gemPending = await bank().methods.pendingGem(pid, account).call();

  return gemPending;
};

export const gemPerBlock = async () => {
  return bank().methods.gemPerBlock().call();
};

export const totalAllocPoint = async () => {
  return bank().methods.totalAllocPoint().call();
};

export const getStartBlock = async () => {
  return bank().methods.startBlock().call();
};

export const updatePool = async (poolId) => {
  return bank().methods.updatePool(poolId).call();
};

const calculateAPRandTVL = async (pool) => {
  const getTvl = (price, sup) => new BigNumber(sup).multipliedBy(price);

  let apr;
  let tvl;
  let tokenPrice;
  const blocksPerYear = 10512000; // seconds per year / 3
  const supply = +pool.poolLpTokenBalance > 0 ? formatEther(pool.poolLpTokenBalance) : 1;
  const allocationShare = +pool.allocPoint / +pool.totalAllocation;

  const [gemsPerBlock, gemPrice] = await Promise.all([gemPerBlock(), getGemPrice()]);

  const gemPerYearByAlloc = new BigNumber(formatEther(gemsPerBlock))
    .multipliedBy(allocationShare)
    .multipliedBy(blocksPerYear);

  // if is GEM pool
  if (pool.lpToken === gemTokenAddress) {
    apr = gemPerYearByAlloc.dividedBy(supply).multipliedBy(100).toNumber().toFixed(2);

    tvl = getTvl(gemPrice, supply);

    tokenPrice = gemPrice;

    // if is SHELL pool
  } else if (pool.lpToken === shellTokenAddress) {
    const shellPrice = await getUsdPriceOfToken(pool.lpToken);

    apr = new BigNumber(gemPrice)
      .multipliedBy(gemPerYearByAlloc)
      .dividedBy(new BigNumber(shellPrice).multipliedBy(supply))
      .multipliedBy(100)
      .toNumber()
      .toFixed(2);

    tvl = getTvl(shellPrice, supply);

    tokenPrice = shellPrice;

    //if is Pankcae tokens pool
  } else {
    const [pairUsdValue, totalLpSupply] = await Promise.all([
      getUsdValueOfPair(pool.lpToken),
      totalSupply(pool.lpToken),
    ]);

    tokenPrice = new BigNumber(pairUsdValue).dividedBy(formatEther(totalLpSupply));

    apr = new BigNumber(gemPrice)
      .multipliedBy(gemPerYearByAlloc)
      .dividedBy(new BigNumber(tokenPrice).multipliedBy(supply))
      .multipliedBy(100)
      .toNumber()
      .toFixed(2);

    tvl = getTvl(tokenPrice, supply);
  }

  if (+apr > 1_000_000_000_000) {
    apr = "∞";
  }

  return [apr, tvl, +tokenPrice];
};

const getPoolInfoValues = async (poolLength) => {
  const poolInfocalls = prepGetPoolInfoForMulticall(poolLength);
  const poolInfo = await aggregate(poolInfocalls);
  const poolInfoValues = decodePoolInfoReturnFromMulticall(poolInfo.returnData);

  return poolInfoValues;
};

const getUserInfoValues = async (address, poolLength) => {
  if (!address) {
    return [];
  }
  const userInfocalls = prepGetUserInfoForMulticall(poolLength, address);
  const userInfo = await aggregate(userInfocalls);
  const userInfoValues = decodeUserInfoReturnFromMulticall(userInfo.returnData);

  return userInfoValues;
};

export const getAllPools = async ({ address }) => {
  const [poolLength, poolLpTokenBalances, totalAllocation] = await Promise.all([
    getPoolsLength(),
    getTokenSupplies(),
    totalAllocPoint(),
  ]);

  const [poolInfoValues, userInfoValues] = await Promise.all([
    getPoolInfoValues(poolLength),
    getUserInfoValues(address, poolLength),
  ]);

  const pools = await Promise.all(
    poolInfoValues.map(async (pool, index) => {
      const poolAsset = poolAssets[pool.poolInfoValues.lpToken];
      const poolInfo = pool.poolInfoValues;
      const pending = await pendingGem(index);

      if (poolAsset) {
        return {
          poolId: pool.poolId,
          ...pick(poolAsset, ["name", "apy", "images", "risk", "isSingleStake", "isNative"]),
          ...pick(poolInfo, ["lpToken", "allocPoint", "depositFeeBP", "lastRewardBlock"]),

          totalAllocation,
          multiplier: ((Number(poolInfo.allocPoint) / Number(totalAllocation)) * 100).toFixed(1),
          userDepositAmountInPool: +formatFromWei(userInfoValues[index]?.userValues?.amount),
          userRewardAmountInPool: +formatFromWei(pending),
          poolLpTokenBalance: poolLpTokenBalances[index],
        };
      }
    })
  );

  const poolsWithApr = await Promise.all(
    pools
      .filter((p) => p)
      .map(async (pool) => {
        const [apr, tvl, tokenPrice] = await calculateAPRandTVL(pool);
        return {
          ...pool,
          apr,
          tvl,
          tokenPrice,
        };
      })
  );

  return poolsWithApr.filter((p) => p);
};
