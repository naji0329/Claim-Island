import pearlFarmAbi from "./abi/PearlFarm.json";
import { contractFactory } from "./index";
import { clamNFTAddress, pearlFarmAddress } from "./constants";
import { store } from "../store/redux";
import { approveContractForMaxUintErc721 } from "./bep20";
import { getBalance, approveSpending } from "./gem";

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

export const stakeClam = async (clamId) => {
  const account = getAccount();
  const gemBal = await getBalance(account);
  const pearlPrice = await stakePrice();
  if (gemBal <= pearlPrice) throw new Error("You need at least 50 GEM to stake Clam");

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

  await approveContractForMaxUintErc721(account, clamNFTAddress, pearlFarmAddress, clamId);

  const method = pearlFarm().methods.unstakeClam(clamId);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};
