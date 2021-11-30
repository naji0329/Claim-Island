import { formatEther, parseEther } from "@ethersproject/units";
import pancakeRouterAbi from "./abi/PancakeRouter.json";
import { pancakeRouterAddress, wBNB, BUSD } from "../constants/constants";
import { contractFactory } from "./index";
import { getLPTokens, getReserves } from "./pancakePair";
import BigNumber from "bignumber.js";

const router = () =>
  contractFactory({
    abi: pancakeRouterAbi,
    address: pancakeRouterAddress,
  });

const getBaseCurrency = (token) => {
  switch (token) {
    // add more possible base currencies here, like eth
    default:
      return wBNB;
  }
};

export const getUsdValueOfPair = async (lpToken) => {
  const { 0: t0Supply, 1: t1Supply } = await getReserves(lpToken);
  const [token0, token1] = await getLPTokens(lpToken);
  const [t0Price, t1Price] = await Promise.all([
    getUsdPriceOfToken(token0),
    getUsdPriceOfToken(token1),
  ]);

  const p0 = new BigNumber(formatEther(t0Supply)).multipliedBy(t0Price);
  const p1 = new BigNumber(formatEther(t1Supply)).multipliedBy(t1Price);

  return p0.plus(p1).toString();
};

export const getUsdPriceOfToken = async (tokenAddress, baseCurrency = "BNB") => {
  const base = getBaseCurrency(baseCurrency);
  const path = tokenAddress === base ? [tokenAddress, BUSD] : [tokenAddress, base, BUSD];
  const result = await getAmountsOut(parseEther("1"), path);
  const price = result[result.length - 1];

  return formatEther(price);
};

const getAmountsOut = async (amount, path) => {
  return await router().methods.getAmountsOut(amount, path).call();
};
