import React, { useEffect, useState } from "react";

import { bankAddress, wBNB } from "constants/constants";
import { formatFromWei } from "web3/shared";
import { balanceOf } from "web3/bep20";
import pancake from "web3/pancakePair";
import InfoTooltip from "components/InfoTooltip";
import { renderUsd } from "utils/number";

// prevent rounding up
export const formatNumber = (number, decimals) => {
  const n = Math.trunc(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return n.toFixed(decimals);
};

// get the pancakeswap exchange url
export const exchangeUrl = async ({ isSingleStake, tokenAddress }) => {
  if (tokenAddress) {
    if (isSingleStake) return `https://pancakeswap.finance/swap?outputCurrency=${tokenAddress}`;
    let [token0, token1] = await pancake.getLPTokens(tokenAddress);
    token0 = token0 === wBNB ? "BNB" : token0;
    token1 = token1 === wBNB ? "BNB" : token1;
    return `https://pancakeswap.finance/add/${token0}/${token1}`;
  }
};

// get a formatted balance
export const getBalancesFormatted = async (account, lpToken, isSingleStake) => {
  if (lpToken) {
    if (isSingleStake) {
      const balance = await balanceOf(lpToken, account);
      return [formatFromWei(balance), null, null];
    } else {
      // load balances when open pool item
      const [token0, token1] = await pancake.getLPTokens(lpToken);

      return await Promise.all([
        balanceOf(lpToken, account), // lp token
        balanceOf(token0, account), // token0
        balanceOf(token1, account), // token1
      ]).then((balancesWei) => balancesWei.map((b) => formatFromWei(b)));
    }
  }
};

// POOL DATA component
export const PoolData = ({ urlForExchange, tvl }) => {
  const [tvlFmtd, setTVL] = useState("");

  useEffect(() => {
    const formattedTvl = renderUsd(+tvl);
    setTVL(formattedTvl);
  }, [tvl]);

  return (
    <div className="w-full px-2">
      <div className="flex flex-row justify-between">
        <div className="text-gray-500 font-semibold">
          TVL:
          <InfoTooltip text="Total Value Locked - the value of deposits in this pool" />
        </div>
        <div className="font-bold text-black text-center">{tvlFmtd}</div>
      </div>
      <div className="flex">
        <a
          href={`https://bscscan.com/address/${bankAddress}`}
          target="_blank"
          className="text-gray-500 font-semibold underline"
          rel="noreferrer"
        >
          BSC Scan
        </a>
      </div>
      <div className="flex">
        <a
          href={urlForExchange}
          target="_blank"
          className="text-gray-500 font-semibold underline"
          rel="noreferrer"
        >
          Get Token
        </a>
      </div>
    </div>
  );
};
