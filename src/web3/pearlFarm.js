import pearlFarmAbi from "./abi/PearlFarm.json";
import { contractFactory } from "./index";
import { pearlFarmAddress } from "../constants/constants";
import { getAccount } from "./shared";
import { getOracleFee } from "./rng";

const pearlFarm = () =>
  contractFactory({
    abi: pearlFarmAbi,
    address: pearlFarmAddress,
  });

export const stakePrice = async () => {
  return await pearlFarm().methods.getUpdatedPearlPrice().call();
};

export const getStakedClamIds = async (account) => {
  return await pearlFarm().methods.getStakedClamIds(account).call();
};

export const hasClamBeenStakedBeforeByUser = async (clamId) => {
  return await pearlFarm().methods.clamHasBeenStaked(clamId).call();
};

export const stakeClam = async (clamId) => {
  const account = getAccount();

  const method = pearlFarm().methods.stakeClam(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const stakeClamAgain = async (clamId) => {
  const account = getAccount();

  const method = pearlFarm().methods.stakeClamAgain(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const unstakeClam = async (clamId) => {
  const account = getAccount();

  const method = pearlFarm().methods.unstakeClam(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const prepareReclaiming = async (clamId) => {
  const account = getAccount();

  const method = pearlFarm().methods.prepareReclaiming(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const reclaimGems = async (clamId) => {
  const account = getAccount();

  const method = pearlFarm().methods.reclaimGems(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const propClamOpenForPearl = async (clamId) => {
  const account = getAccount();

  const oracleFee = await getOracleFee();

  const method = pearlFarm().methods.propClamOpenForPearl(clamId);
  const gasEstimation = await method.estimateGas({ from: account, value: +oracleFee });

  await method.send({ from: account, gas: gasEstimation, value: +oracleFee });
};

export const collectPearl = async (clamId) => {
  const account = getAccount();

  const method = pearlFarm().methods.collectPearl(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const getRemainingPearlProductionTime = async (clamId) => {
  const time = await pearlFarm().methods.getRemainingPearlProductionTime(clamId).call();
  return time;
};

export const isPearlProductionTimeYet = async (clamId) => {
  const productionTimeReached = await pearlFarm().methods.isPearlProductionTimeYet(clamId).call();
  return productionTimeReached;
};

export const clamIdToStaker = async (clamId) => {
  return await pearlFarm().methods.clamIdToStaker(clamId).call();
};

export const rngRequestHashForProducedPearl = async (clamId, account) => {
  return pearlFarm().methods.rngRequestHashForProducedPearl(account, clamId).call();
};

export const gemsTransferred = async (account, clamId) => {
  return pearlFarm().methods.gemsTransferred(account, clamId).call();
};
