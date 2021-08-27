import bankAbi from "./abi/Bank.json";
import { bankAddress } from "./constants";
import { contractFactory } from "./index";
import { store } from "../store/redux";

const bank = () =>
  contractFactory({
    abi: bankAbi,
    address: bankAddress,
  });

const getAccount = () => {
  const address = store.getState().account.address;
  if (address) return address;
  throw new Error("No address found");
};

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
  const account = getAccount();
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
