import pearlFarmAbi from "./abi/PearlFarm.json";
import { contractFactory } from "./index";
import { pearlFarmAddress } from "./constants";
import { store } from "../store/redux";

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

export const stakeClam = async (clamId) => {
  const account = getAccount();
  const method = pearlFarm().methods.stakeClam(clamId);
  const gasEstimation = await method.estimateGas({ from: account });
  await method.send({ from: account, gas: gasEstimation });
};
