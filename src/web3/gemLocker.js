import { formatEther } from "@ethersproject/units";
import { contractFactory } from "./index";
import gemLockerAbi from "./abi/GemLocker.json";
import { gemLockerAddress } from "../constants/constants";
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

const pendingFarmingRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.pendingFarmingRewards(account).call());
};

const pendingClamRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.pendingClamRewards(account).call());
};

const pendingPearlRewards = async () => {
  const account = getAccount();
  return formatEther(await gemLocker().methods.pendingPearlRewards(account).call());
};

const lockedFarmingRewardsLength = async () => {
  const account = getAccount();
  return gemLocker().methods.lockedFarmingRewardsLength(account).call();
};

const clamsStakedPerUserLength = async () => {
  const account = getAccount();
  return gemLocker().methods.clamsStakedPerUserLength(account).call();
};

const clamIdsStakedPerUserAt = async (index) => {
  const account = getAccount();
  return gemLocker().methods.clamIdsStakedPerUserAt(account, index).call();
};

const pearlsBurnedPerUserLength = async () => {
  const account = getAccount();
  return gemLocker().methods.pearlsBurnedPerUserLength(account).call();
};

const pearlIdsBurnedPerUserAt = async (index) => {
  const account = getAccount();
  return gemLocker().methods.pearlIdsBurnedPerUserAt(account, index).call();
};

const totalPearlRewardsLocked = async () => {
  const account = getAccount();
  return gemLocker().methods.totalPearlRewardsLocked(account).call();
};

const prepFarmingRewardsCalls = async () => {
  const account = getAccount();
  const length = await lockedFarmingRewardsLength();
  const calls = [];
  for (let index = 0; index < +length; index++) {
    calls.push([
      gemLockerAddress,
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

const prepNftRewardsCalls = async (isClam) => {
  const account = getAccount();
  const length = isClam ? await clamsStakedPerUserLength() : await pearlsBurnedPerUserLength();
  const calls = [];

  for (let index = 0; index < length; index++) {
    const nftId = isClam
      ? await clamIdsStakedPerUserAt(index)
      : await pearlIdsBurnedPerUserAt(index);
    calls.push([
      gemLockerAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: isClam ? "lockedClamRewards" : "lockedPearlRewards",
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
        [account, nftId]
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
            lockedUntilDay: "uint256",
          },
        },
        values[index]
      )
    );
  }

  return result;
};

const decodeLockedNftBonus = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push(
      web3.eth.abi.decodeParameter(
        {
          lockedNftBonus: {
            bonusRemaining: "uint256",
            bonusRemainingCorrected: "uint256",
            startDay: "uint256",
            endDay: "uint256",
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
    lockedUntilDay: +rewardData.lockedUntilDay,
  }));

  return rewards.sort((a, b) => a.lockedUntilDay - b.lockedUntilDay);
};

const getNftRewards = async (isClam) => {
  const calls = await prepNftRewardsCalls(isClam);
  const lockedNftRewards = await aggregate(calls);
  const valuesDecoded = decodeLockedNftBonus(lockedNftRewards.returnData);

  const rewards = valuesDecoded.map((bonusData) => ({
    bonusRemaining: +formatEther(
      isClam ? bonusData.bonusRemaining : bonusData.bonusRemainingCorrected
    ),
    startDay: +bonusData.startDay,
    endDay: +bonusData.endDay,
  }));

  return rewards.sort((a, b) => a.startDay - b.startDay);
};

const getCurrentDay = async () => {
  return gemLocker().methods.getDay().call();
};

const startTimestamp = async () => {
  return gemLocker().methods.startTimestamp().call();
};

export const clamHasGeneratedBoost = async (clamId) => {
  const account = getAccount();
  const bonusInfo = await gemLocker().methods.lockedClamRewards(account, clamId).call();
  return +bonusInfo.endDay > 0; // endDay cannot be 0 clam has generated rewards
};

const getVestedNftRewards = async (isClam) => {
  const rewards = await getNftRewards(isClam);
  let availableRewards = isClam ? +(await pendingClamRewards()) : +(await pendingPearlRewards());

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
  const vestedClamRewards = await getVestedNftRewards(true);
  const vestedPearlRewards = await getVestedNftRewards();

  const totalFarmingRewards = farmingRewards.reduce((acc, curr) => acc + curr.amount, 0);
  const totalClamRewards = vestedClamRewards.reduce((acc, curr) => acc + +curr.bonusRemaining, 0);
  const totalPearlRewards = vestedPearlRewards.reduce((acc, curr) => acc + +curr.bonusRemaining, 0);
  const totalVested = totalFarmingRewards + totalClamRewards + totalPearlRewards;

  return totalVested;
};

export const fetchRewards = async () => {
  const currentDay = await getCurrentDay();
  const farmingRewards = await getFarmingRewards();
  const vestedClamRewards = await getVestedNftRewards(true);
  const vestedPearlRewards = await getVestedNftRewards();
  const totalLocked = await totalLockedRewards();
  const availableFarmingRewards = await pendingFarmingRewards();
  const availableClamRewards = await pendingClamRewards();
  const availablePearlRewards = await pendingPearlRewards();
  const startTime = await startTimestamp();
  const hasLockedPearlRewards = +(await totalPearlRewardsLocked()) > 0;

  const totalFarmingRewards = farmingRewards.reduce((acc, curr) => acc + curr.amount, 0);
  const totalClamRewards = vestedClamRewards.reduce((acc, curr) => acc + +curr.bonusRemaining, 0);
  const totalPearlRewards = vestedPearlRewards.reduce((acc, curr) => acc + +curr.bonusRemaining, 0);
  const totalVested = totalFarmingRewards + totalClamRewards + totalPearlRewards;

  const rewards = {
    startTime,
    currentDay,
    farmingRewards,
    vestedClamRewards,
    vestedPearlRewards,
    totalLocked,
    availableFarmingRewards,
    availableClamRewards,
    availablePearlRewards,
    hasLockedPearlRewards,
    totalVested,
  };

  return rewards;
};
