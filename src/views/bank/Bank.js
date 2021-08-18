import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
// import { Link } from "react-router-dom";

import { actions } from "../../store/redux";
import videoImage from "../../assets/locations/bank_static.jpg";
import videoMp4 from "../../assets/locations/bank_animated.mp4";
import videoWebM from "../../assets/locations/bank_animated.webm";

import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import VideoBackground from "../../components/VideoBackground";

import {
  getPoolsLength,
  prepGetPoolInfoForMulticall,
  decodePoolInfoReturnFromMulticall,
  prepGetUserInfoForMulticall,
  decodeUserInfoReturnFromMulticall,
} from "../../web3/masterChef";
import { aggregate } from "../../web3/multicall";
import { formatFromWei } from "../../web3/shared";
import PoolItem from "./PoolItem";
import "./bank.scss";
import { poolAssets } from "./poolsAssets";

const Bank = ({
  account: { clamBalance, address },
  updateCharacter,
  updateAccount,
}) => {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const getPoolInfo = async () => {
      const poolLength = await getPoolsLength();
      const poolInfocalls = prepGetPoolInfoForMulticall(poolLength);
      const userInfocalls = prepGetUserInfoForMulticall(poolLength, address);

      const [poolInfo, userInfo] = await Promise.all([
        aggregate(poolInfocalls),
        aggregate(userInfocalls),
      ]);

      const poolInfoValues = decodePoolInfoReturnFromMulticall(
        poolInfo.returnData
      );
      const userInfovalues = decodeUserInfoReturnFromMulticall(
        userInfo.returnData
      );

      let setUpPools = poolInfoValues.map((pool, index) => {
        return {
          name: poolAssets[pool.poolInfoValues.lpToken].name,
          apy: poolAssets[pool.poolInfoValues.lpToken].apy,
          multiplier: poolAssets[pool.poolInfoValues.lpToken].multiplier,
          images: poolAssets[pool.poolInfoValues.lpToken].images,
          poolId: pool.poolId,
          lpToken: pool.poolInfoValues.lpToken,
          allocPoint: pool.poolInfoValues.allocPoint,
          depositFeeBP: pool.poolInfoValues.depositFeeBP,
          lastRewardBlock: pool.poolInfoValues.lastRewardBlock,
          userDepositAmountInPool: formatFromWei(
            userInfovalues[index].userValues.amount
          ),
          userRewardAmountInPool: formatFromWei(
            userInfovalues[index].userValues.rewardDebt
          ),
        };
      });

      setPools(setUpPools);
    };
    if (pools.length === 0 && address) {
      getPoolInfo();
    }
  }, [pools, address]);

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
        <VideoBackground
          videoImage={videoImage}
          videoMp4={videoMp4}
          videoWebM={videoWebM}
        />
        {address && (
          <>
            <div className="w-full md:w-3/4 mx-auto relative z-10">
              <div className="px-2 md:px-8 py-4 mt-24 flex flex-col">
                {pools &&
                  pools.map((pool, i) => (
                    <PoolItem
                      key={i}
                      {...pool}
                      account={address}
                      updateAccount={updateAccount}
                    />
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
