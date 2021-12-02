import { contractFactory } from "./index";
import gemOracleAbi from "./abi/GemOracle.json";
import { gemOracleAddress } from "../constants/constants";
import { formatFromWei } from "./shared";

const gemOracle = contractFactory({
  abi: gemOracleAbi,
  address: gemOracleAddress,
});

export const getGemPrice = async () => {
  const GemPriceInWei = await gemOracle.methods.consult().call();
  return formatFromWei(GemPriceInWei);
};
