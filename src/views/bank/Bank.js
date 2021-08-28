import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
// import { Link } from "react-router-dom";

import { actions } from "../../store/redux";
import videoImage from "../../assets/locations/Bank.jpg";
import videoMp4 from "../../assets/locations/Bank.mp4";
import videoWebM from "../../assets/locations/Bank.webm";

import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import VideoBackground from "../../components/VideoBackground";

import {
  getPoolsLength,
  prepGetPoolInfoForMulticall,
  decodePoolInfoReturnFromMulticall,
  prepGetUserInfoForMulticall,
  decodeUserInfoReturnFromMulticall,
  totalAllocPoint,
  pendingGem,
  updatePool,
  getStartBlock,
} from "../../web3/bank";

import { aggregate } from "../../web3/multicall";
import { formatFromWei } from "../../web3/shared";
import PoolItem from "./PoolItem";
import "./bank.scss";
import { poolAssets } from "./poolsAssets";
import { web3 } from "../../web3";
import { ChainId, useEthers } from "@usedapp/core";

const Bank = ({ account: { address, isBSChain }, updateCharacter, updateAccount }) => {
  const [pools, setPools] = useState([]);
  const [totalAlloc, setTotalAlloc] = useState(0);

  const { chainId } = useEthers();

  useEffect(() => {
    const getPoolInfo = async () => {
      const poolLength = await getPoolsLength();
      const poolInfocalls = prepGetPoolInfoForMulticall(poolLength);
      const userInfocalls = prepGetUserInfoForMulticall(poolLength, address);
      const _totalAlloc = await totalAllocPoint();
      setTotalAlloc(_totalAlloc);

      const [poolInfo, userInfo] = await Promise.all([
        aggregate(poolInfocalls),
        aggregate(userInfocalls),
      ]);

      const poolInfoValues = decodePoolInfoReturnFromMulticall(poolInfo.returnData);
      const userInfoValues = decodeUserInfoReturnFromMulticall(userInfo.returnData);

      const pools = poolInfoValues.map(async (pool, index) => {
        const poolAsset = poolAssets[pool.poolInfoValues.lpToken];
        const poolInfo = pool.poolInfoValues;
        const pending = await pendingGem(index);
        if (poolAsset) {
          return {
            name: poolAsset.name,
            apy: poolAsset.apy,
            multiplier: ((poolInfo.allocPoint / totalAlloc) * 100).toFixed(1),
            images: poolAsset.images,
            poolId: pool.poolId,
            lpToken: poolInfo.lpToken,
            allocPoint: poolInfo.allocPoint,
            depositFeeBP: poolInfo.depositFeeBP,
            lastRewardBlock: poolInfo.lastRewardBlock,
            userDepositAmountInPool: formatFromWei(userInfoValues[index].userValues.amount),
            userRewardAmountInPool: formatFromWei(pending),
            isSingleStake: poolAsset.isSingleStake,
          };
        }
      });

      const setUpPools = await Promise.all(pools.filter((p) => p));

      setPools(setUpPools);
    };
    if (pools.length === 0 && address) {
      getPoolInfo();
    }
  }, [pools, address, isBSChain]);

  useAsync(async () => {
    updateCharacter({
      name: "tanja",
      action: "bank.connect.text",
      button: {
        text: "Dismiss",
        alt: {
          action: "cb",
          destination: () => {
            updateCharacter({
              name: "tanja",
              action: undefined,
            });
          },
        },
      },
    });
  });

  return (
    <>
      <div className="bg-bank overflow-x-hidden">
        <Web3Navbar title="Clam Bank" />
        {/* container */}
        {/* video */}
        <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />
        {address && (
          <>
            <div className="w-full lg:w-4/5 mx-auto relative z-10">
              <div className="px-2 md:px-8 py-4 mt-24 flex flex-col">
                {chainId === ChainId.Localhost && (
                  <button
                    // only works if web3.setProvider("ws://localhost:8545"); in getWeb3.js
                    className="btn mb-2"
                    onClick={async () => {
                      await updatePool(0);

                      console.log("current block", await web3.eth.getBlockNumber());
                      await web3.currentProvider.send(
                        {
                          jsonrpc: "2.0",
                          method: "evm_mine",
                          id: new Date().getTime(),
                        },
                        (err, result) => {
                          console.log(`err`, err);
                          console.log(`result`, result);
                        }
                      );
                      console.log("bank start block", await getStartBlock());
                    }}
                  >
                    Advance block + update pool 0
                  </button>
                )}
                {pools &&
                  pools.map((pool, i) => (
                    <PoolItem key={i} {...pool} account={address} updateAccount={updateAccount} totalAllocation={totalAlloc} />
                  ))}
              </div>
            </div>
          </>
        )}

        {/* chat character   */}
      </div>

      <Character name="tanja" />
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Bank);
