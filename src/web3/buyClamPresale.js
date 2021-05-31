import clamPresaleAbi from './abi/clamPresale.json'
import {clamPresaleAddress} from './constants'
import { contractFactory } from './index'
import { web3 } from "./index"

const buyClamPresale = async ({ account, amount }, callback, errCallback) => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })

  // i would never do it this way normally
  if (web3 && web3.eth && !account) {
    const acc = await web3.eth.getAccounts();
    console.log("acc: ", acc);
    account = acc[0];
  }

  const method = clamPresale.methods.buyTokens()

  const gasEstimation = await method.estimateGas({
    from: account,
    value: amount
  });

  await method.send({
    from: account,
    gas: gasEstimation,
    value: amount
  }).once('confirmation', async () => {
    try {
      console.log('Success') // add a toaster here
      callback('sale_success');
    } catch (error) {
      console.error(error) // add toaster to show error
      callback('sale_failure');
      errCallback(error.message);
    }
  });
}

export default buyClamPresale;

export const getPresaleRate = async () => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const rate = await clamPresale.methods.RATE().call()

  return rate;
}

export const individualLimitUsed = async (account) => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const value = await clamPresale.methods.individualLimit(account).call()

  return value;
}

export const weiRaised = async () => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const weiRaised = await clamPresale.methods.weiRaised().call();

  return weiRaised;
};

export const presaleCap = async () => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const cap = await clamPresale.methods.CAP().call();

  return cap;
};