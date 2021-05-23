import shellPresaleAbi from './abi/shellPresale.json'
import {shellPresaleAddress} from './constants'
import { contractFactory } from './index'

const buyShellPresale = async ({ account, amount }) => {
  const shellPresale = contractFactory({abi: shellPresaleAbi, address: shellPresaleAddress })

  const method = shellPresale.methods.buyTokens()

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
    } catch (error) {
      console.error(error) // add toaster to show error
    }
  });
}

export default buyShellPresale;