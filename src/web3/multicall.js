import multicallAbi from "./abi/MultiCall.json";
import { multicallAddress } from "../constants/constants";
import { contractFactory } from "./index";

const multicall = () =>
  contractFactory({
    abi: multicallAbi,
    address: multicallAddress,
  });

export const aggregate = async (calls) => {
  const values = await multicall().methods.aggregate(calls).call();
  return values;
};
