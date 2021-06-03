import clamPresaleAbi from './abi/clamPresale.json'
import {clamPresaleAddress} from './constants'
import { contractFactory } from './index'

const buyClamPresale = async ({ account, amount }, callback, errCallback) => {
  if (!account) {
    throw new Error('there is no account connected')
  }

  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })

  const method = clamPresale.methods.buyClam()

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

export const collectClam = async ({ account }, callback, errCallback) => {
  if (!account) {
    throw new Error('there is no account connected')
  }

  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })

  const method = clamPresale.methods.collectClam()

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method.send({
    from: account,
    gas: gasEstimation,
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

export const getClamPrice = async () => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const price = await clamPresale.methods.getNFTPrice().call()

  return price;
}

export const presaleCap = async () => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const value = await clamPresale.methods.MAX_SUPPLY().call()

  return value;
}

export const hasSaleStarted = async () => {
  const clamPresale = contractFactory({abi: clamPresaleAbi, address: clamPresaleAddress })
  const value = await clamPresale.methods.hasSaleStarted().call()

  return value;
}
