import shellTokenAbi from "./abi/BEP20.json";
import { shellTokenAddress } from "./constants";
import { contractFactory } from "./index";

const balanceOf = async ({ account, abi, address }) => {
  const token = contractFactory({ abi, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const accountShellBalance = async (account) => {
  const bal = await balanceOf({ account, abi: shellTokenAbi, address: shellTokenAddress });
  return bal;
};
