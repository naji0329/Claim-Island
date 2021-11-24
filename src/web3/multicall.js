import multicallAbi from "./abi/MultiCall.json";
import { multicallAddress } from "../constants/constants";
import { contractFactory } from "./index";

const multicall = (chainId) =>
  contractFactory({
    abi: multicallAbi,
    address: multicallAddress[chainId],
  });

export const aggregate = async (calls, chainId) => {
  const values = await multicall(chainId).methods.aggregate(calls).call();
  return values;
};
