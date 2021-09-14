import React, { useState } from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import classnames from "classnames";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import BigNumber from "bignumber.js";

import { exchangeUrl, getBalancesFormatted, PoolData } from "./utils";
import PoolHarvest from "./utils/PoolHarvest";
import PoolDepositWithdraw from "./utils/PoolDepositWithdraw";

import { pendingGem, gemPerBlock } from "web3/bank";
import { totalSupply } from "web3/bep20";
import { gemTokenAddress, shellTokenAddress } from "web3/constants";
import { getUsdValueOfPair, getGemPrice, getUsdPriceOfToken } from "web3/pancakeRouter";

import InfoTooltip from "components/InfoTooltip";
import Tooltip from "components/Tooltip";

const PoolItem = ({
  account: { address },
  bank: { selectedPool },
  toggleModal,
  updateBank,
  pool,
  updateAccount,
}) => {
  const depositFee = pool.depositFeeBP / 100;
  const isAdditionalInfoVisible = selectedPool?._poolReference === pool;

  const [gemEarned, setGemEarned] = useState(0);
  const [apr, setApr] = useState();
  const [tvl, setTvl] = useState(0);

  const [urlForExchange, setUrlForExchange] = useState("");

  const { activateBrowserWallet } = useEthers();

  const riskClass = (risk) => {
    if (risk == "High Risk") {
      return "rounded-full bg-red-500 py-2 px-4 text-white";
    } else if (risk == "Medium Risk") {
      return "rounded-full bg-yellow-500 py-2 px-4 text-white";
    } else if (risk == "Low Risk") {
      return "rounded-full bg-blue-500 py-2 px-4 text-white";
    } else {
      return "rounded-full bg-green-500 py-2 px-4 text-white";
    }
  };

  const riskStyle = riskClass(pool.risk);

  useAsync(async () => {
    const blocksPerYear = 10512000; // seconds per year / 3
    const supply = +pool.poolLpTokenBalance > 0 ? formatEther(pool.poolLpTokenBalance) : 1;
    let apr;
    let _tvl;
    const getTvl = (price) => new BigNumber(supply).multipliedBy(price);

    try {
      const earnedGem = await pendingGem(pool.poolId);
      setGemEarned(earnedGem);

      const gemsPerBlock = await gemPerBlock();
      const gemPrice = await getGemPrice();
      const allocationShare = +pool.allocPoint / +pool.totalAllocation;
      const gemPerYearByAlloc = new BigNumber(formatEther(gemsPerBlock))
        .multipliedBy(allocationShare)
        .multipliedBy(blocksPerYear);

      if (pool.lpToken === gemTokenAddress) {
        apr = gemPerYearByAlloc.dividedBy(supply).multipliedBy(100).toNumber().toFixed(2);

        _tvl = getTvl(gemPrice);
      } else if (pool.lpToken === shellTokenAddress) {
        const shellPrice = await getUsdPriceOfToken(pool.lpToken);

        apr = new BigNumber(gemPrice)
          .multipliedBy(gemPerYearByAlloc)
          .dividedBy(new BigNumber(shellPrice).multipliedBy(supply))
          .multipliedBy(100)
          .toNumber()
          .toFixed(2);

        _tvl = getTvl(shellPrice);
      } else {
        const pairUsdValue = await getUsdValueOfPair(pool.lpToken);
        const totalLpSupply = await totalSupply(pool.lpToken);
        const tokenPrice = new BigNumber(pairUsdValue).dividedBy(formatEther(totalLpSupply));

        apr = new BigNumber(gemPrice)
          .multipliedBy(gemPerYearByAlloc)
          .dividedBy(new BigNumber(tokenPrice).multipliedBy(supply))
          .multipliedBy(100)
          .toNumber()
          .toFixed(2);

        _tvl = getTvl(tokenPrice);
      }

      if (+apr > 1_000_000_000_000) {
        apr = "∞";
      }

      setTvl(_tvl);
      setApr(apr);
    } catch (err) {
      updateAccount({ error: err.message });
    }
  });

  const handleOpen = async () => {
    const balances = await getBalancesFormatted(address, pool.lpToken, pool.isSingleStake);

    const url = await exchangeUrl({
      tokenAddress: pool.lpToken,
      isSingleStake: pool.isSingleStake,
    });
    setUrlForExchange(url);

    updateBank({
      balances: balances,
      depositAmount: "0",
      withdrawAmount: "0",
      selectedPool: {
        ...pool,
        earnedGem: gemEarned,
        apr,
        _poolReference: pool,
      },
    });
  };

  const handleClose = () => {
    updateBank({
      selectedPool: null,
    });
  };

  const handleClick = () => {
    if (isAdditionalInfoVisible) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between mb-4 overflow-hidden bg-white border-2 border-gray-800 shadow-md rounded-xl">
        <div className="flex items-center justify-between px-4 py-1">
          <div className="flex items-center justify-start min-w-xs">
            <div className="-space-x-6 avatar-group">
              {pool.images &&
                pool.images.map((image, i) => (
                  <div className="bg-white avatar" key={i}>
                    <div className="w-12 h-12">
                      <img src={image} />
                    </div>
                  </div>
                ))}
            </div>
            <div className="mx-2 text-xl font-aristotelica-bold">{pool.name}</div>
          </div>

          <div className="block text-sm">
            <Tooltip text="Relative to other investment pools - higher means more risk of capital value fluctuation">
              <p className={riskStyle}>{pool.risk}</p>
            </Tooltip>
          </div>
          <div className="block text-sm">
            <p className="mb-1 text-xs font-semibold leading-none text-gray-500">Reward Share</p>
            <div className="font-bold text-center text-black">
              {pool.multiplier}%
              <InfoTooltip text="The share of overall rewards allocated to this pool" />
            </div>
          </div>

          <div className="block text-sm">
            <p className="mb-1 text-xs font-semibold leading-none text-center text-gray-500">APR</p>

            <div className="items-center font-bold text-black">
              {apr ? `${apr}%` : "loading..."}
              <InfoTooltip text="Annual Percentage Return - non-compounded rate of return" />
            </div>
          </div>

          <div className="block text-sm">
            <p className="mb-1 text-xs font-semibold leading-none text-gray-500">Deposited</p>
            <p className="font-bold text-center text-gray-300">{pool.userDepositAmountInPool}</p>
          </div>

          <div className="block text-sm">
            <p className="mb-1 text-xs font-semibold leading-none text-gray-500">To Harvest</p>
            <p className="font-bold text-center text-gray-300">{pool.userRewardAmountInPool}</p>
          </div>

          <div className="block text-sm">
            {address ? (
              <button onClick={handleClick}>
                <svg
                  className={classnames(
                    "fill-current text-blue-700 h-6 w-6 transform transition-transform duration-500",
                    { "rotate-180": isAdditionalInfoVisible }
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                </svg>
              </button>
            ) : (
              <p
                className="mb-1 text-xs font-semibold leading-none text-gray-500"
                onClick={() => activateBrowserWallet()}
              >
                Connect Wallet
              </p>
            )}
          </div>
        </div>

        {isAdditionalInfoVisible && (
          <div className="flex items-start justify-between p-4 border-t-2 border-gray-700 h-96">
            <div className="flex w-1/5">
              <PoolData depositFee={depositFee} urlForExchange={urlForExchange} tvl={tvl} />
            </div>

            <div className="flex w-2/5 h-full">
              <PoolDepositWithdraw depositFee={depositFee} />
            </div>

            <div className="flex w-2/5 h-full">
              <PoolHarvest toggleModal={toggleModal} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PoolItem);
