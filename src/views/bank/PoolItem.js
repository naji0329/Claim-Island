import React, { useState } from "react";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import classnames from "classnames";

import { exchangeUrl, getBalancesFormatted, PoolData } from "./utils";
import PoolHarvest from "./utils/PoolHarvest";
import PoolDepositWithdraw from "./utils/PoolDepositWithdraw";
import PoolHarvestDepositWithdraw from "./utils/PoolHarvestDepositWithdraw";
import { getFormattedRisk } from "./utils/getFormattedRisk";

import { renderPercentage, renderUsd, renderNumber } from "utils/number";
import InfoTooltip from "components/InfoTooltip";
import Tooltip from "components/Tooltip";
import { useWeb3Modal } from "components/Web3ProvidersModal";

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

const PoolItem = ({
  account: { address },
  bank: { selectedPool },
  toggleModal,
  updateBank,
  pool,
  ...state
}) => {
  const depositFee = pool.depositFeeBP / 100;
  const isAdditionalInfoVisible = selectedPool?.poolId === pool.poolId;
  const userRewardsInPool = renderNumber(pool.userRewardAmountInPool, 2);

  const [urlForExchange, setUrlForExchange] = useState("");

  const { onConnect } = useWeb3Modal(state);

  const handleOpen = async () => {
    let balances;
    if (address) {
      balances = await getBalancesFormatted(address, pool.lpToken, pool.isSingleStake);
    }

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
      <div className="div_lg">
        <div className="flex flex-col justify-between mb-4 glass bg-white hover:bg-white bg-opacity-50 hover:bg-opacity-50 backdrop-blur-lg hover:backdrop-blur-lg border-2 border-gray-800 shadow-md rounded-xl">
          <div
            className="flex items-center justify-between px-4 py-1 cursor-pointer"
            onClick={handleClick}
          >
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
              <Tooltip text="Relative to other investment pools - higher means more likelihood of capital value fluctuation">
                <p className={riskClass(pool.risk)}>{getFormattedRisk(pool.risk)}</p>
              </Tooltip>
            </div>
            <div className="block text-sm">
              <p className="mb-1 text-xs font-semibold leading-none">Reward Share</p>
              <div className="font-bold text-center text-black">
                {pool.multiplier}%
                <InfoTooltip text="The share of overall rewards allocated to this pool" />
              </div>
            </div>

            <div className="block text-sm">
              <p className="mb-1 text-xs font-semibold leading-none text-center">APR</p>

              <div className="items-center font-bold text-black">
                {pool.apr ? renderPercentage(+pool.apr, 2) : "loading..."}
                <InfoTooltip text="Annual Percentage Return - non-compounded rate of return" />
              </div>
            </div>

            <div className="block text-sm">
              <p className="mb-1 text-xs font-semibold leading-none">Deposited</p>
              <p className="font-bold text-center text-black-300">
                {renderUsd(pool.userDepositAmountInPool * pool.tokenPrice)}
              </p>
            </div>

            <div className="block text-sm">
              <p className="mb-1 text-xs font-semibold leading-none">$GEM to harvest</p>
              <p className="font-bold text-center text-black-300">{userRewardsInPool}</p>
            </div>

            <div className="block text-sm">
              {address ? (
                <button>
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
                <button
                  className="mb-2 text-xs font-semibold leading-none text-gray-500"
                  onClick={onConnect}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

          {isAdditionalInfoVisible && (
            <div className="flex items-start justify-between p-4 border-t-2 border-gray-700 h-96">
              <div className="flex w-1/5">
                <PoolData urlForExchange={urlForExchange} tvl={pool.tvl} />
              </div>

              <div className="flex w-2/5 h-full">
                <PoolDepositWithdraw depositFee={depositFee} disabled={!address} />
              </div>

              <div className="flex w-2/5 h-full">
                <PoolHarvest toggleModal={toggleModal} harvestAmount={userRewardsInPool} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="div_sm">
        <div className="flex flex-col justify-between pb-5 mb-4 glass bg-white hover:bg-white bg-opacity-50 hover:bg-opacity-50 backdrop-blur-lg hover:backdrop-blur-lg border-2 border-gray-800 shadow-md rounded-xl">
          <div
            className="flex items-center justify-between px-1 py-1 cursor-pointer"
            onClick={handleClick}
          >
            <div className="flex items-center justify-start">
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
              <div className="mx-2">
                <p className="text-xl font-aristotelica-bold">{pool.name}</p>
                <p className="rounded-xl text-white text-sm px-2" style={{background: "#38DCDC"}}>
                  {pool.multiplier}%
                  <InfoTooltip text="The share of overall rewards allocated to this pool" />
                  &nbsp;&nbsp;&nbsp;&nbsp;
                </p>
              </div>

            </div>


            <div className="block text-sm">
              <p className="mb-1 text-xs font-semibold leading-none text-center">APR</p>

              <div className="items-center font-bold text-black">
                {pool.apr ? renderPercentage(+pool.apr, 2) : "loading..."}
                <InfoTooltip text="Annual Percentage Return - non-compounded rate of return" />
              </div>
            </div>

            <div className="block text-sm">
              <p className="mb-1 text-xs font-semibold leading-none">Deposited</p>
              <p className="font-bold text-center text-black-300">
                {renderUsd(pool.userDepositAmountInPool * pool.tokenPrice)}
              </p>
            </div>

            <div className="block text-sm">
              {address ? (
                <button>
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
                <button
                  className="mb-2 text-xs font-semibold leading-none text-gray-500"
                  onClick={onConnect}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>

          {isAdditionalInfoVisible && (
            <div className="items-start justify-between p-4 border-t-2 border-gray-700">


              <div className="">
                <PoolHarvestDepositWithdraw depositFee={depositFee} disabled={!address} toggleModal={toggleModal} harvestAmount={userRewardsInPool} />
              </div>

              {/* <div className="flex w-2/5 h-full">
                <PoolHarvest toggleModal={toggleModal} harvestAmount={userRewardsInPool} />
              </div> */}

              <div className="">
                <PoolData urlForExchange={urlForExchange} tvl={pool.tvl} />
              </div>
            </div>
          )}
        </div>
      </div>
            
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PoolItem);
