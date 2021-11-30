import { contractFactory } from "./index";
import gemOracleAbi from "./abi/GemOracle.json";
import { gemOracleAddress } from "../constants/constants";

const gemOracle = contractFactory({
  abi: gemOracleAbi,
  address: gemOracleAddress,
});

export const getGemPrice = async () => {
  return gemOracle.methods.consult().call();
};
