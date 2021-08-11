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
  prepGetPoolInfoForMulticall,
  getPoolsLength,
  decodePoolInfoReturnFromMulticall,
} from "../../web3/masterChef";
import { aggregate } from "../../web3/multicall";
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
      const calls = prepGetPoolInfoForMulticall(poolLength);
      const { returnData } = await aggregate(calls);
      const values = decodePoolInfoReturnFromMulticall(returnData);

      const setUpPools = values.map(({ poolInfoValues, poolId }) => {
        return {
          name: poolAssets[poolInfoValues.lpToken].name,
          apy: poolAssets[poolInfoValues.lpToken].apy,
          multiplier: poolAssets[poolInfoValues.lpToken].multiplier,
          images: poolAssets[poolInfoValues.lpToken].images,
          poolId: poolId,
          lpToken: poolInfoValues.lpToken,
          allocPoint: poolInfoValues.allocPoint,
          depositFeeBP: poolInfoValues.depositFeeBP,
          lastRewardBlock: poolInfoValues.lastRewardBlock,
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
