import pearlFarmAbi from "./abi/PearlFarm.json";
import { contractFactory } from "./index";
import { clamNFTAddress, pearlFarmAddress } from "./constants";
import { store } from "../store/redux";
import { approveContractForMaxUintErc721 } from "./bep20";
import { getBalance, approveSpending } from "./gem";
import { formatFromWei } from "./shared";
import BigNumber from "bignumber.js";

const pearlFarm = () =>
  contractFactory({
    abi: pearlFarmAbi,
    address: pearlFarmAddress,
  });

const getAccount = () => {
  const address = store.getState().account.address;
  if (address) return address;
  throw new Error("No address found");
};

const stakePrice = async () => {
  return await pearlFarm().methods.pearlPrice().call();
};

export const getStakedClamIds = (account) => {
  return pearlFarm().methods.getStakedClamIds(account).call();
};

export const hasClamBeenStakedBeforeByUser = (clamId) => {
  const account = getAccount();
  return pearlFarm().methods.hasClamBeenStakedBeforeByUser(account, clamId).call();
};

export const stakeClam = async (clamId) => {
  const account = getAccount();

  const gemBalance = await getBalance(account).then((v) => new BigNumber(v)); // from string to BN
  const pearlPrice = await stakePrice().then((v) => new BigNumber(v)); // from string to BN

  if (gemBalance.lt(pearlPrice))
    throw new Error(`You need at least ${formatFromWei(pearlPrice)} GEM to stake Clam`);

  await approveContractForMaxUintErc721(account, clamNFTAddress, pearlFarmAddress, clamId);
  await approveSpending(account, pearlFarmAddress, pearlPrice);

  const method = pearlFarm().methods.stakeClam(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const stakeClamAgain = async (clamId) => {
  const account = getAccount();

  await approveContractForMaxUintErc721(account, clamNFTAddress, pearlFarmAddress, clamId);

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

  const method = pearlFarm().methods.propClamOpenForPearl(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
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
