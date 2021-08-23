import pancakeAbi from "./abi/pancakeSwap.json";

import { contractFactory } from "./index";

const pancake = (lpAddress) =>
  contractFactory({
    abi: pancakeAbi,
    address: lpAddress,
  });

export const getLPTokens = (lpAddress) => {
  const contract = pancake(lpAddress);
  return Promise.all([contract.methods.token0().call(), contract.methods.token1().call()]);
};

export default {
  getLPTokens,
};
