import pearlNFTAbi from "./abi/PearlNFT.json";
import { pearlNFTAddress } from "./constants";
import { contractFactory } from "./index";

const balanceOf = async ({ account, abi, address }) => {
  const token = contractFactory({ abi, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const accountPearlBalance = async (account) => {
  const bal = await balanceOf({
    account,
    abi: pearlNFTAbi,
    address: pearlNFTAddress,
  });
  return bal;
};

export const totalPearlSupply = async () => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const totalSupply = await pearlNft.methods.totalSupply().call();
  return totalSupply;
};

export const getPearlData = async (tokenId) => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.pearlData(tokenId).call();
  return value;
};

export const getPearlByIndex = async (account, index) => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.tokenOfOwnerByIndex(account, index).call();
  return value;
};

export default {
  balanceOf,
  accountPearlBalance,
  totalPearlSupply,
  getPearlData,
  getPearlByIndex,
};
