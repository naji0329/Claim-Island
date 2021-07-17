import masterChefAbi from "./abi/MasterChef.json";
import { masterChefAddress } from "./constants";
import { contractFactory } from "./index";
import { store } from "../store/redux";

const masterChef = contractFactory({
  abi: masterChefAbi,
  address: masterChefAddress,
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

export const deposit = async (pid, amount) => {
  const account = getAccount();
  const method = masterChef.methods.deposit(pid, amount);
  const gasEstimation = await method.estimateGas({ from: account });

  await method
    .send({ from: account, gas: gasEstimation })
    .once("Deposit", eventCallback);
};

export const harvest = async (pid) => {
  const account = getAccount();
  const method = masterChef.methods.deposit(pid, 0);
  const gasEstimation = await method.estimateGas({ from: account });

  await method
    .send({ from: account, gas: gasEstimation })
    .once("Deposit", eventCallback);
};

export const withdraw = async (pid, amount) => {
  const account = getAccount();
  const method = masterChef.methods.withdraw(pid, amount);
  const gasEstimation = await method.estimateGas({ from: account });

  await method
    .send({ from: account, gas: gasEstimation })
    .once("Withdraw", eventCallback);
};

export const pendingGem = async (pid) => {
  const account = getAccount();
  const gemPending = await masterChef.methods.pendingGem(pid, account).call();

  return gemPending;
};
