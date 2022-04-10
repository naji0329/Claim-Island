import shellPresaleAbi from "./abi/shellPresale.json";
import { shellPresaleAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { web3 } from "./index";

const buyShellPresale = async ({ account, amount }, callback, errCallback) => {
  const shellPresale = contractFactory({
    abi: shellPresaleAbi,
    address: shellPresaleAddress,
  });

  // i would never do it this way normally
  if (web3 && web3.eth && !account) {
    const acc = await web3.eth.getAccounts();
    console.log("acc: ", acc);
    account = acc[0];
  }

  const method = shellPresale.methods.buyTokens();

  const gasEstimation = await method.estimateGas({
    from: account,
    value: amount,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
      value: amount,
    })
    .once("confirmation", async () => {
      try {
        console.log("Success"); // add a toaster here
        callback("sale_success");
      } catch (error) {
        console.error(error); // add toaster to show error
        callback("sale_failure");
        errCallback(error.message);
      }
    });
};

export default buyShellPresale;

export const getPresaleRate = async () => {
  const shellPresale = contractFactory({
    abi: shellPresaleAbi,
    address: shellPresaleAddress,
  });
  const rate = await shellPresale.methods.RATE().call();

  return rate;
};

export const individualLimitUsed = async (account) => {
  const shellPresale = contractFactory({
    abi: shellPresaleAbi,
    address: shellPresaleAddress,
  });
  const value = await shellPresale.methods.individualLimit(account).call();

  return value;
};

export const weiRaised = async () => {
  const shellPresale = contractFactory({
    abi: shellPresaleAbi,
    address: shellPresaleAddress,
  });
  const weiRaised = await shellPresale.methods.weiRaised().call();

  return weiRaised;
};

export const presaleCap = async () => {
  const shellPresale = contractFactory({
    abi: shellPresaleAbi,
    address: shellPresaleAddress,
  });
  const cap = await shellPresale.methods.CAP().call();

  return cap;
};
