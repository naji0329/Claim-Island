import { contractFactory } from "./index";
import gemLockerAbi from "./abi/GemLocker.json";
import { gemLockerAddress } from "./constants";
import { getAccount } from "./shared";

const gemLocker = () =>
  contractFactory({
    abi: gemLockerAbi,
    address: gemLockerAddress,
  });

export const totalFarmingRewardsLocked = async () => {
  const account = getAccount();
  return gemLocker().methods.totalFarmingRewardsLocked(account).call();
};

export const totalClamRewardsLocked = async () => {
  const account = getAccount();
  return gemLocker().methods.totalClamRewardsLocked(account).call();
};

export const totalPearlRewardsLocked = async () => {
  const account = getAccount();
  return gemLocker().methods.totalPearlRewardsLocked(account).call();
};

export const unlockableFarmingRewards = async () => {
  const account = getAccount();
  return gemLocker().methods.unlockableFarmingRewards(account).call();
};

export const unlockableClamRewards = async () => {
  const account = getAccount();
  return gemLocker().methods.unlockableClamRewards(account).call();
};

export const unlockablePearlRewards = async () => {
  const account = getAccount();
  return gemLocker().methods.unlockablePearlRewards(account).call();
};
