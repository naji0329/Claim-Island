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
} from "../../web3/bank";
import { aggregate } from "../../web3/multicall";
import PoolItem from "./PoolItem";
import Swap from "./Swap";
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
        text: undefined,
      },
    });
  });

  return (
    <>
      <div className="bg-bank overflow-x-hidden">
        <Web3Navbar />
        {/* container */}
        {/* video */}
        <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />
        {address && (
          <div className="flex justify-center items-start pt-24 w-full">
            {/* swap column */}
            <div className="w-1/4 flex flex-col mx-4">
              <div className="w-full bg-white shadow-md rounded-xl mx-auto flex flex-col justify-between">
                <div className="w-full flex flex-col px-3 py-2">
                  <h2 className="text-blue-700 font-semibold text-4xl mb-2">
                    Swap
                  </h2>
                  <p className="text-yellow-700">
                    <b>Instantly</b> trade tokens.
                  </p>
                </div>

                <div className="w-full flex flex-col px-3 py-2">
                  <Swap />
                </div>
              </div>
            </div>
            <div className="w-3/4 flex flex-col mx-4">
              {/* navbar */}
              <div className="w-full bg-white shadow-md rounded-xl mx-auto flex flex-row justify-between">
                <div className="px-3 py-2">
                  <h2 className="text-blue-700 font-semibold text-4xl mb-2">
                    Invest
                  </h2>
                  <p className="text-yellow-700">
                    Stake into <b>Liquidity Pools (LP)</b> to ear $GEM over
                    time.
                  </p>
                </div>

                <div className="px-3 py-2 flex justify-between">
                  <button className="bg-blue-700 hover:bg-blue-500 text-white rounded-xl shadow-md px-5 py-6">
                    Boost Pool
                  </button>
                </div>
              </div>
              <div className="my-4 py-5">
                {pools.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
                    {pools &&
                      pools.map((pool, i) => (
                        <div key={i}>
                          <PoolItem
                            {...pool}
                            account={address}
                            updateAccount={updateAccount}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
                    There is nothing to see :-(
                  </div>
                )}
              </div>
            </div>
          </div>
        )}


        {/* chat character   */}
      </div>

      {!address && <Character name="tanja" />}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Bank);
