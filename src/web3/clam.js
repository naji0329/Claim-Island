import clamNFTAbi from "./abi/ClamNFT.json";
import { clamNFTAddress } from "./constants";
import { contractFactory } from "./index";

const balanceOf = async ({ account, abi, address }) => {
  const token = contractFactory({ abi, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const accountClamBalance = async (account) => {
  const bal = await balanceOf({
    account,
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });
  return bal;
};

export const totalClamSupply = async (account) => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const totalSupply = await clamNft.methods.totalSupply().call();
  return totalSupply;
};

export default {
  balanceOf,
  accountClamBalance,
  totalClamSupply,
};
