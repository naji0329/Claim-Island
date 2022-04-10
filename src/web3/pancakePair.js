import pancakePairAbi from "./abi/PancakePair.json";

import { contractFactory } from "./index";

const pair = (lpAddress) =>
  contractFactory({
    abi: pancakePairAbi,
    address: lpAddress,
  });

export const getLPTokens = (lpAddress) => {
  const contract = pair(lpAddress);
  return Promise.all([contract.methods.token0().call(), contract.methods.token1().call()]);
};

export const getReserves = (lpAddress) => {
  const contract = pair(lpAddress);
  return contract.methods.getReserves().call();
};

export default {
  getLPTokens,
};
