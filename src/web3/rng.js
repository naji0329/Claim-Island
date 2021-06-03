import rngAbi from './abi/rng.json'
import {rngAddress} from './constants'
import { contractFactory } from './index'


export const getOracleFee = async () => {
  const clamPresale = contractFactory({abi: rngAbi, address: rngAddress })
  const fee = await clamPresale.methods.getOracleFee().call()

  return fee;
}

export const getPearlProductionTime = async (requestHash) => {
  const clamPresale = contractFactory({abi: rngAbi, address: rngAddress })
  const value = await clamPresale.methods.getPearlProductionTime(requestHash).call()

  return value;
}
