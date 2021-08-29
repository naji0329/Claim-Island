import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { truncate } from "lodash";
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
  getTokenSupplies,
} from "../../web3/bank";

import { aggregate } from "../../web3/multicall";
import { formatFromWei } from "../../web3/shared";
import PoolItem from "./PoolItem";
import "./bank.scss";
import { poolAssets } from "./poolsAssets";
import { web3 } from "../../web3";
import { ChainId, useEthers } from "@usedapp/core";

const Bank = ({
  account: { address, isBSChain, isWeb3Installed, isConnected },
  updateCharacter,
  updateAccount,
}) => {
  const [pools, setPools] = useState([]);
  const [totalAlloc, setTotalAlloc] = useState(0);
  const [assistantAcknowledged, setAssistantAcknowledged] = useState(
    window.localStorage.getItem("bankAssistantAcknowledged") === "true"
  );

  const { chainId } = useEthers();

  useEffect(() => {
    const getPoolInfo = async () => {
      const poolLength = await getPoolsLength();
      const poolInfocalls = prepGetPoolInfoForMulticall(poolLength);
      const userInfocalls = prepGetUserInfoForMulticall(poolLength, address);
      const poolLpTokenBalances = await getTokenSupplies();
      const _totalAlloc = await totalAllocPoint();
      setTotalAlloc(_totalAlloc);

      const [poolInfo, userInfo] = await Promise.all([
        aggregate(poolInfocalls, chainId),
        aggregate(userInfocalls, chainId),
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
            multiplier: ((Number(poolInfo.allocPoint) / Number(_totalAlloc)) * 100).toFixed(1),
            images: poolAsset.images,
            poolId: pool.poolId,
            lpToken: poolInfo.lpToken,
            allocPoint: poolInfo.allocPoint,
            depositFeeBP: poolInfo.depositFeeBP,
            lastRewardBlock: poolInfo.lastRewardBlock,
            userDepositAmountInPool: formatFromWei(userInfoValues[index].userValues.amount),
            userRewardAmountInPool: formatFromWei(pending),
            isSingleStake: poolAsset.isSingleStake,
            poolLpTokenBalance: poolLpTokenBalances[index],
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

  const welcomeUserBack = (suppressSpeechBubble = false) => {
    updateCharacter({
      name: "tanja",
      action: "bank.welcome_back.text",
      suppressSpeechBubble,
      button: {
        text: "Yes Please",
        alt: {
          action: "cb",
          destination: () => {
            updateCharacter({
              name: "tanja",
              action: "bank.help_needed.text",
              button: {
                text: "Read Visitor’s Guide",
                alt: {
                  action: "cb",
                  destination: () => {
                    window.open(
                      "https://clamisland.medium.com/clam-island-essential-visitors-guide-63f2a9984336",
                      "_blank"
                    );
                  },
                },
              },
              buttonAlt: {
                text: "Go to Info Centre",
                alt: {
                  action: "internal",
                  destination: "/infoCenter",
                },
              },
            });
          },
        },
      },
      buttonAlt: {
        text: "No Thanks",
        alt: {
          action: "cb",
          destination: () => {
            updateCharacter({
              name: "tanja",
              suppressSpeechBubble,
              action: "bank.acknowledge_no_help_needed.text",
              button: {
                text: "Ok",
                dismiss: truncate,
              },
            });
          },
        },
      },
    });
  };

  useEffect(async () => {
    if (!isWeb3Installed || !isBSChain) {
      updateCharacter({
        name: "tanja",
        action: !isWeb3Installed ? "bank.connect_no_wallet.text" : "bank.connect_wrong_chain.text",
        button: {
          text: "Tell me how",
          alt: {
            action: "cb",
            destination: () => {
              window.open(
                "https://medium.com/stakingbits/setting-up-metamask-for-binance-smart-chain-bsc-921d9a2625fd",
                "_blank"
              );
            },
          },
        },
        buttonAlt: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    } else if (!isConnected) {
      updateCharacter({
        name: "tanja",
        action: "bank.connect.text",
        button: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    } else if (!assistantAcknowledged) {
      updateCharacter({
        name: "tanja",
        action: "bank.welcome.text",
        button: {
          text: "Ok",
          dismiss: truncate,
          alt: {
            action: "cb",
            dismiss: true,
            destination: () => {
              window.localStorage.setItem("bankAssistantAcknowledged", true);
              setTimeout(() => {
                const surpressSpeechBubble = true;
                welcomeUserBack(surpressSpeechBubble);
              }, 1000);
            },
          },
        },
      });
    } else {
      welcomeUserBack();
    }
  }, [isWeb3Installed, isBSChain, isConnected]);

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
                    <PoolItem key={i} {...pool} account={address} totalAllocation={totalAlloc} />
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
