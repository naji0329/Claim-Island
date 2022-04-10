import rngAbi from "./abi/RNG.json";
import { rngAddress } from "../constants/constants";
import { contractFactory } from "./index";

export const getOracleFee = async () => {
  const rng = contractFactory({ abi: rngAbi, address: rngAddress });
  const fee = await rng.methods.getOracleFee().call();

  return fee;
};

export const getRNGFromHashRequest = async (requestHash) => {
  const rng = contractFactory({ abi: rngAbi, address: rngAddress });
  const value = await rng.methods.getRNGFromHashRequest(requestHash).call();

  return value;
};

export const getPearlProductionTime = async (requestHash) => {
  const rng = contractFactory({ abi: rngAbi, address: rngAddress });
  const value = await rng.methods.getPearlProductionTime(requestHash).call();

  return value;
};
