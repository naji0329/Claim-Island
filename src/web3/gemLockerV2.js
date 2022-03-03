import { formatEther } from "@ethersproject/units";
import { contractFactory } from "./index";
import gemLockerAbi from "./abi/GemLockerV2.json";
import { gemLockerV2Address } from "../constants/constants";
import { getAccount } from "./shared";
import { aggregate } from "./multicall";

const gemLocker = () =>
  contractFactory({
    abi: gemLockerAbi,
    address: gemLockerV2Address,
  });

const totalLockedRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.totalLockedRewards(account).call());
};

const pendingFarmingRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.pendingFarmingRewards(account).call());
};

const pendingPearlRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.pendingPearlRewards(account).call());
};

const lockedFarmingRewardsLength = async () => {
  const account = getAccount();
  return gemLocker().methods.lockedFarmingRewardsLength(account).call();
};

const lockedPearlRewardsLength = async () => {
  const account = getAccount();
  return gemLocker().methods.lockedPearlRewardsLength(account).call();
};

const totalPearlRewardsLocked = async () => {
  const account = getAccount();
  return gemLocker().methods.totalPearlRewardsLocked(account).call();
};

const getCurrentDay = async () => {
  return gemLocker().methods.getDay().call();
};

const startTimestamp = async () => {
  return gemLocker().methods.startTimestamp().call();
};

const prepFarmingRewardsCalls = async () => {
  const account = getAccount();
  const length = await lockedFarmingRewardsLength();
  const calls = [];
  for (let index = 0; index < +length; index++) {
    calls.push([
      gemLockerV2Address,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "lockedFarmingRewards",
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

const prepPearlRewardsCalls = async () => {
  const account = getAccount();
  const length = await lockedPearlRewardsLength();
  const calls = [];
  for (let index = 0; index < +length; index++) {
    calls.push([
      gemLockerV2Address,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "lockedPearlRewards",
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

const decodeLockedFarmingRewards = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push(
      web3.eth.abi.decodeParameter(
        {
          lockedFarmingRewards: {
            amount: "uint256",
            startDay: "uint256",
            unlockDay: "uint256",
          },
        },
        values[index]
      )
    );
  }

  return result;
};

const decodeLockedPearlRewards = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push(
      web3.eth.abi.decodeParameter(
        {
          lockedPearlRewards: {
            bonusRemaining: "uint256",
            bonusRemainingCorrected: "uint256",
            startDay: "uint256",
            unlockDay: "uint256",
            lastRewardDay: "uint256",
          },
        },
        values[index]
      )
    );
  }

  return result;
};

const getFarmingRewards = async () => {
  const calls = await prepFarmingRewardsCalls();
  const lockedRewards = await aggregate(calls);
  const valuesDecoded = decodeLockedFarmingRewards(lockedRewards.returnData);

  const rewards = valuesDecoded.map((rewardData) => ({
    amount: +formatEther(rewardData.amount),
    unlockDay: +rewardData.unlockDay,
  }));

  return rewards.sort((a, b) => a.lockedUntilDay - b.lockedUntilDay);
};

const getPearlRewards = async () => {
  const calls = await prepPearlRewardsCalls();
  const lockedRewards = await aggregate(calls);
  const valuesDecoded = decodeLockedPearlRewards(lockedRewards.returnData);

  const rewards = valuesDecoded.map((rewardData) => ({
    startDay: +rewardData.startDay,
    unlockDay: +rewardData.unlockDay,
    bonusRemaining: +formatEther(rewardData.bonusRemainingCorrected),
  }));

  return rewards.sort((a, b) => a.lockedUntilDay - b.lockedUntilDay);
};

const getVestedPearlRewards = async () => {
  const rewards = await getPearlRewards();
  let availableRewards = +(await pendingPearlRewards());

  return rewards.reduce((acc, curr) => {
    if (availableRewards >= curr.bonusRemaining) {
      availableRewards -= curr.bonusRemaining;
    } else {
      curr.bonusRemaining -= availableRewards;
      availableRewards = 0;
      acc.push(curr);
    }
    return acc;
  }, []);
};

export const getVestedGem = async () => {
  const farmingRewards = await getFarmingRewards();
  const vestedPearlRewards = await getVestedPearlRewards();

  const totalFarmingRewards = farmingRewards.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPearlRewards = vestedPearlRewards.reduce((acc, curr) => acc + +curr.bonusRemaining, 0);
  const totalVested = totalFarmingRewards + totalPearlRewards;

  return totalVested;
};

export const fetchRewards = async () => {
  const currentDay = await getCurrentDay();
  const farmingRewards = await getFarmingRewards();
  const vestedPearlRewards = await getVestedPearlRewards();
  const totalLocked = await totalLockedRewards();
  const availableFarmingRewards = await pendingFarmingRewards();
  const availablePearlRewards = await pendingPearlRewards();
  const startTime = await startTimestamp();
  const hasLockedPearlRewards = +(await totalPearlRewardsLocked()) > 0;

  const totalFarmingRewards = farmingRewards.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPearlRewards = vestedPearlRewards.reduce((acc, curr) => acc + +curr.bonusRemaining, 0);
  const totalVested = totalFarmingRewards + totalPearlRewards;

  const rewards = {
    startTime,
    currentDay,
    farmingRewards,
    vestedPearlRewards,
    totalLocked,
    availableFarmingRewards,
    availablePearlRewards,
    hasLockedPearlRewards,
    totalVested,
  };

  return rewards;
};
