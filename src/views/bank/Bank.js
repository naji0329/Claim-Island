import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { ChainId } from "@usedapp/core";

import { actions } from "store/redux";
import videoImage from "assets/locations/Bank.jpg";
import videoMp4 from "assets/locations/Bank.mp4";
import videoWebM from "assets/locations/Bank.webm";

import { WalletConnectAndAssist } from "./character/WalletConnectAndAssist";
import Character from "components/characters/CharacterWrapper";
import Web3Navbar from "components/Web3Navbar";
import VideoBackground from "components/VideoBackground";
import { Modal, useModal } from "components/Modal";

import { web3 } from "../../web3";
import { updatePool, getStartBlock, getAllPools } from "web3/bank";

import "./bank.scss";
import PoolItem from "./PoolItem";
import BurnPearlModal from "./utils/BurnPearlModal";

const Bank = ({
  account: { address, chainId, isBSChain, isWeb3Installed, isConnected },
  bank: { pools },
  updateCharacter,
  updateBank,
}) => {
  const [assistantAcknowledged, setAssistantAcknowledged] = useState(
    window.localStorage.getItem("bankAssistantAcknowledged") === "true"
  );
  const { isShowing, toggleModal } = useModal();
  const isNativeStaker =
    pools.length && pools.some((p) => p.isNative && +p.userDepositAmountInPool > 0);

  useEffect(async () => {
    if (pools.length === 0 && address) {
      const setUpPools = await getAllPools({ address, chainId });
      updateBank({ pools: setUpPools });
    }
  }, [pools, address, isBSChain]);

  // CHARACTER SPEAK. functions in ./character folder
  useEffect(async () => {
    WalletConnectAndAssist({
      isWeb3Installed,
      isBSChain,
      isConnected,
      assistantAcknowledged,
      updateCharacter,
    });
  }, [isWeb3Installed, isBSChain, isConnected]);

  return (
    <>
      <div className="bg-bank overflow-x-hidden">
        <Modal isShowing={isShowing} onClose={toggleModal} width={"60rem"}>
          <BurnPearlModal isNativeStaker={isNativeStaker} chainId={chainId} />
        </Modal>
        <Web3Navbar title="Clam Bank" />
        {/* container */}
        {/* video */}
        <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />
        {address && (
          <>
            <div className="w-full lg:w-7/10 mx-auto relative z-10">
              <div className="px-2 md:px-4% py-4 mt-24 flex flex-col">
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
                    <PoolItem key={i} pool={pool} toggleModal={toggleModal} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* chat character   */}
      <Character name="tanja" />
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Bank);
