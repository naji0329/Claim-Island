import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";

import { actions } from "store/redux";
import videoImage from "assets/locations/Bank.jpg";
import videoMp4 from "assets/locations/Bank.mp4";
import videoWebM from "assets/locations/Bank.webm";

import { WalletConnectAndAssist } from "./character/WalletConnectAndAssist";
import Character from "components/characters/CharacterWrapper";
import VideoBackground from "components/VideoBackground";
import { Modal, useModal } from "components/Modal";
import { PageTitle } from "components/PageTitle";

import { getAllPools, harvestAllPools } from "web3/bank";
import { fetchRewards } from "web3/gemLocker";

import "./bank.scss";
import PoolItem from "./PoolItem";
import BurnPearlModal from "./utils/BurnPearlModal";
import { ExternalLinksBlock } from "./ExternalLinksBlock";
import BigNumber from "bignumber.js";
import { renderUsd } from "utils/number";

const Bank = ({
  account: { address, chainId, isBSChain, isWeb3Installed, isConnected },
  bank: { pools },
  updateCharacter,
  updateBank,
}) => {
  const [assistantAcknowledged] = useState(
    window.localStorage.getItem("bankAssistantAcknowledged") === "true"
  );
  const [totalTVL, setTotalTVL] = useState(0);
  const { isShowing, toggleModal } = useModal();
  const isNativeStaker =
    pools.length && pools.some((p) => p.isNative && +p.userDepositAmountInPool > 0);

  useEffect(async () => {
    if (pools.length === 0 && chainId) {
      const setUpPools = await getAllPools({ address, chainId });
      const calcTotalTVL = setUpPools.reduce((prev, curr) => {
        if (curr.tvl) {
          return prev.plus(curr.tvl);
        }
      }, new BigNumber(0));

      setTotalTVL(renderUsd(+calcTotalTVL));

      const rewards = address ? await fetchRewards(chainId) : {};
      updateBank({ pools: setUpPools, rewards });
    }
  }, [pools, address, isBSChain]);

  // update pools data every 5 seconds
  useEffect(async () => {
    const zero = new BigNumber(0);
    setInterval(async () => {
      if (chainId) {
        const setUpPools = await getAllPools({ address, chainId });

        const calcTotalTVL = setUpPools.reduce((prev, curr) => {
          if (curr.tvl) {
            return prev.plus(curr.tvl);
          }
        }, zero);

        setTotalTVL(renderUsd(+calcTotalTVL));
        console.log("updated pools after 5s");
        const rewards = address ? await fetchRewards(chainId) : {};
        updateBank({ pools: setUpPools, rewards });
      }
    }, 5000);
  }, []);

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
        {/* container */}
        {/* video */}
        <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

        <div className="w-full lg:w-7/10 mx-auto relative z-10 mt-24 px-2 md:px-4%">
          <div className="flex justify-between items-center">
            <PageTitle title="Clam Bank" />
            <ExternalLinksBlock
              totalTVL={totalTVL}
              harvestAllPools={address ? harvestAllPools : null}
            />
          </div>
          <div className="py-4 flex flex-col">
            {pools &&
              pools.map((pool, i) => <PoolItem key={i} pool={pool} toggleModal={toggleModal} />)}
          </div>
        </div>
      </div>

      {/* chat character   */}
      <Character name="tanja" />
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Bank);
