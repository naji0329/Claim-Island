import { formatEther, parseEther } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import pancakeRouterAbi from "./abi/PancakeRouter.json";
import { pancakeRouterAddress, wBNB, BUSD } from "./constants";
import { contractFactory } from "./index";

const router = () =>
  contractFactory({
    abi: pancakeRouterAbi,
    address: pancakeRouterAddress,
  });

const bnbPriceWei = async () => {
  return await getAmountsOut(parseEther("1"), [wBNB, BUSD]);
};

export const getUsdPriceOfToken = async (tokenAddress) => {
  const [, tokenInBNB] = await getAmountsOut(parseEther("1"), [tokenAddress, wBNB]);
  const [, bnbPrice] = await bnbPriceWei();
  const price = new BigNumber(formatEther(tokenInBNB)).multipliedBy(formatEther(bnbPrice));
  return price.toNumber();
};

const getAmountsOut = async (amount, path) => {
  return await router().methods.getAmountsOut(amount, path).call();
};
