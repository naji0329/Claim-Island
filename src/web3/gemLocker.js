import { formatEther } from "@ethersproject/units";
import { contractFactory } from "./index";
import gemLockerAbi from "./abi/GemLocker.json";
import { gemLockerAddress } from "./constants";
import { getAccount } from "./shared";
import { aggregate } from "./multicall";

const gemLocker = () =>
  contractFactory({
    abi: gemLockerAbi,
    address: gemLockerAddress,
  });

const totalLockedRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.totalLockedRewards(account).call());
};

const unlockableFarmingRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.unlockableFarmingRewards(account).call());
};

const unlockableClamRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.unlockableClamRewards(account).call());
};

const unlockablePearlRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.unlockablePearlRewards(account).call());
};

const lockedFarmingRewardsLength = async () => {
  const account = getAccount();
  return gemLocker().methods.lockedFarmingRewardsLength(account).call();
};

const lockedClamRewardsLength = async () => {
  const account = getAccount();
  return gemLocker().methods.lockedClamRewardsLength(account).call();
};

const lockedPearlRewardsLength = async () => {
  const account = getAccount();
  return gemLocker().methods.lockedPearlRewardsLength(account).call();
};

const rewardType = {
  FARMING: "farming",
  CLAM: "clam",
  PEARL: "pearl",
};

const getLengthCall = async (type) => {
  switch (type) {
    case rewardType.FARMING:
      return lockedFarmingRewardsLength();
    case rewardType.CLAM:
      return lockedClamRewardsLength();
    case rewardType.PEARL:
      return lockedPearlRewardsLength();

    default:
      throw new Error("Reward type not found");
  }
};

const getLockedRewardsFunctionName = (type) => {
  switch (type) {
    case rewardType.FARMING:
      return "lockedFarmingRewards";
    case rewardType.CLAM:
      return "lockedClamRewards";
    case rewardType.PEARL:
      return "lockedPearlRewards";

    default:
      throw new Error("Reward type not found");
  }
};

const prepRewardsCalls = async (type) => {
  const account = getAccount();
  const length = await getLengthCall(type);
  const calls = [];
  for (let index = 0; index < +length; index++) {
    calls.push([
      gemLockerAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: getLockedRewardsFunctionName(type),
          type: "function",
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
        },
        [account, index]
      ),
    ]);
  }

  return calls;
};

const decodeLockedRewards = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push(
      web3.eth.abi.decodeParameter(
        {
          lockedRewards: {
            lockedUntilDay: "uint256",
            amount: "uint256",
          },
        },
        values[index]
      )
    );
  }

  return result;
};

const getAllLockedRewards = async (chainId) => {
  const allRewards = [];

  const rewardTypes = Object.values(rewardType);

  for (let i = 0; i < rewardTypes.length; i++) {
    const calls = await prepRewardsCalls(rewardTypes[i]);
    // const lockedRewards = await aggregate(calls, chainId);
    const lockedRewards = await aggregate(calls, chainId);
    const valuesDecoded = decodeLockedRewards(lockedRewards.returnData);

    valuesDecoded.forEach((rewardData) => {
      const existingUnlock = allRewards.find(
        ({ lockedUntilDay }) => lockedUntilDay === +rewardData.lockedUntilDay
      );

      const amount = +formatEther(rewardData.amount);

      if (existingUnlock) {
        existingUnlock.amount += amount;
      } else {
        allRewards.push({ amount, lockedUntilDay: +rewardData.lockedUntilDay });
      }
    });
  }

  return allRewards.sort((a, b) => a.lockedUntilDay - b.lockedUntilDay);
};

const getCurrentDay = async () => {
  return gemLocker().methods.getDay().call();
};

const startTimestamp = async () => {
  return gemLocker().methods.startTimestamp().call();
};

export const fetchRewards = async (chainId) => {
  const currentDay = await getCurrentDay();
  const allLockedRewards = await getAllLockedRewards(chainId);
  const totalLocked = await totalLockedRewards();
  const availableFarmingRewards = await unlockableFarmingRewards();
  const availableClamRewards = await unlockableClamRewards();
  const availablePearlRewards = await unlockablePearlRewards();
  const startTime = await startTimestamp();

  const rewards = {
    startTime,
    currentDay,
    allLockedRewards,
    totalLocked,
    availableFarmingRewards,
    availableClamRewards,
    availablePearlRewards,
  };

  return rewards;
};
