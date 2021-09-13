import React, { useState } from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import classnames from "classnames";
import { useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

import { pendingGem, gemPerBlock } from "web3/bank";
// import { hasMaxUintAllowanceBank } from "web3/bep20";

import PoolHarvest from "./utils/PoolHarvest";
import PoolDepositWithdraw from "./utils/PoolDepositWithdraw";

import { exchangeUrl, getBalancesFormatted, PoolData } from "./utils";

import { gemTokenAddress } from "web3/constants";

import InfoTooltip from "components/InfoTooltip";
import Tooltip from "components/Tooltip";

const PoolItem = ({
  account: { address },
  bank: { selectedPool, depositAmount },
  toggleModal,
  updateBank,
  pool,
}) => {
  const depositFee = pool.depositFeeBP / 100;
  const isAdditionalInfoVisible = selectedPool?._poolReference === pool;

  const [gemEarned, setGemEarned] = useState(0);
  const [apr, setApr] = useState();

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

  const calcAPR = ({ poolInfo, gemsPerBlock, tokenPrice }) => {
    const blocksPerYear = 10512000; // seconds per year / 3
    const supply = +poolInfo.poolLpTokenBalance > 0 ? +poolInfo.poolLpTokenBalance : 1;
    let finalApr;
    if (poolInfo.lpToken === gemTokenAddress) {
      finalApr =
        Math.round(
          ((((gemsPerBlock * Number(poolInfo.allocPoint)) / Number(poolInfo.totalAllocation)) *
            blocksPerYear) /
            supply) *
            100
        ) / 100;
    } else {
      finalApr =
        Math.round(
          ((((tokenPrice * Number(gemsPerBlock) * Number(poolInfo.allocPoint)) /
            Number(poolInfo.totalAllocation)) *
            blocksPerYear) /
            supply) *
            tokenPrice *
            100
        ) / 100;
      console.log(finalApr);
    }

    if (finalApr > 1000000000000) {
      finalApr = "∞";
    }

    return finalApr;
  };

  useAsync(async () => {
    const fakeTokenPrice = 1000000000000000000;

    const earnedGem = await pendingGem(pool.poolId);
    const gemsPerBlock = await gemPerBlock();

    const apr = calcAPR({
      poolInfo: pool,
      gemsPerBlock,
      tokenPrice: fakeTokenPrice,
    });

    setGemEarned(earnedGem);
    setApr(apr);

    // not used
    // const isEnabled = await hasMaxUintAllowanceBank(pool.account, pool.lpToken);
    // setIsEnabled(isEnabled);
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
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-gray-800 flex flex-col justify-between mb-4">
        <div className="flex justify-between items-center py-1 px-4">
          <div className="flex justify-start items-center min-w-xs">
            <div className="avatar-group -space-x-6">
              {pool.images &&
                pool.images.map((image, i) => (
                  <div className="avatar bg-white" key={i}>
                    <div className="w-12 h-12">
                      <img src={image} />
                    </div>
                  </div>
                ))}
            </div>
            <div className="mx-2 font-aristotelica-bold text-xl">{pool.name}</div>
          </div>

          {/* <div className="badge badge-warning">Medium risk</div> */}

          <div className="text-sm block">
            <Tooltip text="Relative to other investment pools - higher means more risk of capital value fluctuation">
              <p className={riskStyle}>{pool.risk}</p>
            </Tooltip>
          </div>
          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">Reward Share</p>
            <div className="font-bold text-black text-center">
              {pool.multiplier}%
              <InfoTooltip text="The share of overall rewards allocated to this pool" />
            </div>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none text-center">APR</p>

            <div className="font-bold text-black items-center">
              {selectedPool ? `${String(selectedPool.apr)}%` : `${String(apr)}%`}
              <InfoTooltip text="Annual Percentage Return - non-compounded rate of return" />
            </div>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">Deposited</p>
            <p className="font-bold text-gray-300 text-center">
              {selectedPool ? selectedPool.userDepositAmountInPool : pool.userDepositAmountInPool}
            </p>
          </div>

          <div className="text-sm block">
            <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">To Harvest</p>
            <p className="font-bold text-gray-300 text-center">{pool.userRewardAmountInPool}</p>
          </div>

          <div className="text-sm block">
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
                className="text-gray-500 font-semibold text-xs mb-1 leading-none"
                onClick={() => activateBrowserWallet()}
              >
                Connect Wallet
              </p>
            )}
          </div>
        </div>

        {isAdditionalInfoVisible && (
          <div className="flex justify-between items-start p-4 border-t-2 border-gray-700 h-96">
            <div className="flex w-1/5">
              <PoolData
                depositFee={depositFee}
                urlForExchange={urlForExchange}
                tvl={formatEther(
                  selectedPool ? selectedPool.poolLpTokenBalance : pool.poolLpTokenBalance
                )}
              />
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
