import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useEthers } from "@usedapp/core";

import { actions } from "store/redux";
import Character from "components/characters/CharacterWrapper";
import Web3Navbar from "components/Web3Navbar";
import { Modal, useModal } from "components/Modal";
import VideoBackground from "components/VideoBackground";

import videoImage from "assets/locations/Farm.jpg";
import videoMp4 from "assets/locations/Farm.mp4";
import videoWebM from "assets/locations/Farm.webm";
import clamIcon from "assets/clam-icon.png";
import NFTUnknown from "assets/img/clam_unknown.png";

import clamContract from "web3/clam";
import { prepGetDnaDecodedMulticall, decodeGetDnaDecodedFromMulticall } from "web3/dnaDecoder";
import { getStakedClamIds, unstakeClam, collectPearl } from "web3/pearlFarm";
import { aggregate } from "web3/multicall";

import "./index.scss";
import FarmItem from "./FarmItem";
import ClamDetails from "./ClamDetails";
import ClamDeposit from "./ClamDeposit";
import { DepositClamCard } from "./depositClamCard";

import PearlView from "./PearlView";
import { MODAL_OPTS } from "./constants";
import { WelcomeUser, withdrawClamSpeak } from "./character/WithdrawClam";
import LoadingScreen from "components/LoadingScreen";
import { pearlSendToSaferoom } from "./character/pearlCollection";
import {
  decodeCalculateBonusRewardsFromMulticall,
  prepCalculateBonusRewardsMulticall,
} from "web3/clamBonus";
import { ifPearlSendSaferoom } from './utils';

const Farms = ({ account: { clamBalance, address }, updateCharacter, updateAccount }) => {
  let history = useHistory();
  const [clams, setClams] = useState([]);
  const [clamProcessing, setClamProcessing] = useState({}); // pearl process details
  const [clamsStaked, setClamsStaked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [selPearl, setSelPearl] = useState({});
  const [stakedRarities, setStakedRarities] = useState([]);
  const [refreshClams, setRefreshClams] = useState(false);
  const { isShowing, toggleModal } = useModal();

  const [modalSelected, setModal] = useState("");
  const [selectedClam, setSelectedClam] = useState({});
  const [selectedClamId, setSelectedClamId] = useState({});
  const [withdrawingClamId, setWithdrawingClamId] = useState(null);

  const { chainId } = useEthers();

  const handleWithdraw = async (clamId) => {
    try {
      setWithdrawingClamId(clamId);
      await unstakeClam(clamId);
    } catch (err) {
      updateAccount({ error: err.message });
      setWithdrawingClamId(null);
    }
  };

  const onModalClose = async () => {
    toggleModal();
    if (modalSelected === MODAL_OPTS.VIEW_PEARL) {
      ifPearlSendSaferoom({ updateCharacter, address, clamId: selectedClamId });
    }
    const ownedClamsImg = await addClamImg(clams);
    const stakedClamsImg = await addClamImg(clamsStaked);

    setClams(ownedClamsImg);
    setClamsStaked(stakedClamsImg);
  };

  // When Deposit Clam Butto is clicked - open the modal to show list of clams
  const onDepositClam = () => {
    setModal(MODAL_OPTS.DEPOSIT_CLAM);
    toggleModal();
  };

  // when "View Pearl" is clicked - open the modal for the selected pearl
  const onViewDetails = (clam, clamProcessing) => {
    setClamProcessing(clamProcessing);
    setSelectedClam(clam);
    setModal(MODAL_OPTS.CLAM_DETAILS);
    toggleModal();
  };

  // when pearl is ready and is to be viewed
  const onViewPearl = async ({ clamId, dna, dnaDecoded, showPearlModal }) => {
    setSelectedClamId(clamId);
    if (showPearlModal) {
      setSelPearl({ dna, dnaDecoded });
      setModal(MODAL_OPTS.VIEW_PEARL);
      toggleModal();
    } else {
      try {
        await collectPearl(clamId);
        history.push("/saferoom/pearl");
        return true;
      } catch (error) {
        const errorMsg = JSON.parse(error.message.split("\n").slice(1).join(""));
        toast.error(
          <>
            <p>There was an error collecting your pearl.</p>
            <p>{errorMsg.message}</p>
          </>
        );
        return Promise.resolve(false);
      }
    }
  };

  // when "Withdraw" is clicked - open the modal
  const onWithdrawClam = (clam) => {
    withdrawClamSpeak({ updateCharacter }, () => {
      handleWithdraw(clam.clamId);
      WelcomeUser({ updateCharacter, suppressSpeechBubble: true });
    });
  };

  const getClamsDataByIds = async (tokenIds) => {
    const clamDataCalls = clamContract.prepClamDataMulticall(tokenIds);
    const clamDataResult = await aggregate(clamDataCalls, chainId);
    const clamDataDecoded = clamContract.decodeClamDataFromMulticall(
      clamDataResult.returnData,
      tokenIds
    );
    const clamDnas = clamDataDecoded.map((data) => data.clamDataValues.dna);

    const producedPearlIdsCalls = clamContract.prepClamProducedPearlIds(tokenIds);
    const producedPearlIdsResult = await aggregate(producedPearlIdsCalls, chainId);
    const producedPearlIdsDecoded = clamContract.decodeProducedPearlIdsFromMulticall(
      producedPearlIdsResult.returnData,
      tokenIds
    );

    const dnaDecodedCalls = prepGetDnaDecodedMulticall(clamDnas);
    const dnaDecodedResult = await aggregate(dnaDecodedCalls, chainId);
    const dnaDecodedDecoded = decodeGetDnaDecodedFromMulticall(
      dnaDecodedResult.returnData,
      tokenIds
    );

    const clamBonusCalls = prepCalculateBonusRewardsMulticall(dnaDecodedDecoded);
    const clamBonusResult = await aggregate(clamBonusCalls, chainId);
    const clamBonusDecoded = decodeCalculateBonusRewardsFromMulticall(
      clamBonusResult.returnData,
      tokenIds
    );

    const clams = clamDataDecoded.map((clam) => {
      const sameClamDna = dnaDecodedDecoded.find(({ clamId }) => clamId === clam.clamId);
      const sameClamPearlsProduced = producedPearlIdsDecoded.find(
        ({ clamId }) => clamId === clam.clamId
      );
      const sameClamBonus = clamBonusDecoded.find(({ clamId }) => clamId === clam.clamId);
      if (sameClamDna && sameClamPearlsProduced && sameClamBonus) {
        const dnaDecoded = sameClamDna.dnaDecodedValues;
        const producedPearlIds = sameClamPearlsProduced.producedPearlIds;
        const dna = clam.clamDataValues.dna;
        const { clamBonus } = sameClamBonus;

        return { ...clam, dnaDecoded, producedPearlIds, dna, clamBonus };
      }
      console.error(`Clam ${clam.clamId} from ${address} not found`);
    });

    const clamsFiltered = clams.filter((c) => c);

    return clamsFiltered;
  };

  const addClamImg = async (clams) => {
    const cache = await caches.open("clam-island");
    const promises = await Promise.all(
      clams.map((clam) => {
        const dna = clam.clamDataValues.dna;
        return cache.match(`/clams/${dna}`);
      })
    );
    const images = await Promise.all(
      promises.map((resp) => {
        return resp ? resp.json() : "";
      })
    );
    const clamsUptd = clams.map((clam, index) => {
      let clamImg = images[index];
      clamImg = clamImg ? clamImg.img : clamImg;
      clam.img = clamImg || NFTUnknown;
      return clam;
    });
    return clamsUptd;
  };

  useEffect(async () => {
    // wallet is connected
    if (address || refreshClams) {
      const initClams = async () => {
        try {
          if (isFirstLoading) {
            setLoading(true);
            setIsFirstLoading(false);
          }
          // get staked clams
          const clamsStakedIds = await getStakedClamIds(address);

          // get owned clams
          const tokenIdsCalls = clamContract.prepTokenOfOwnerByIndexMulticall(
            address,
            +clamBalance
          );
          const tokenIdsResult = await aggregate(tokenIdsCalls, chainId);
          const tokenIdsDecoded = clamContract.decodeTokenOfOwnerByIndexFromMulticall(
            tokenIdsResult.returnData
          );
          const [ownedClams, stakedClams] = await Promise.all([
            getClamsDataByIds(tokenIdsDecoded),
            getClamsDataByIds(clamsStakedIds),
          ]);

          const ownedClamsImg = await addClamImg(ownedClams);
          const stakedClamsImg = await addClamImg(stakedClams);
          const rarities = stakedClams.map((clam) => clam.dnaDecoded.rarity);

          setClams(ownedClamsImg);
          setClamsStaked(stakedClamsImg);
          setStakedRarities(rarities);
        } catch (error) {
          console.log({ error });
        } finally {
          setLoading(false);
        }
      };

      await initClams();
      setRefreshClams(false);
    }
  }, [address, clamBalance, refreshClams]);

  useEffect(() => {
    if (!clamsStaked.find(({ clamId }) => clamId === withdrawingClamId)) {
      setWithdrawingClamId(null);
    }
  }, [clamsStaked]);

  useAsync(async () => {
    WelcomeUser({ updateCharacter });
  });

  return (
    <div className="overflow-x-hidden">
      {loading && <LoadingScreen />}
      <Web3Navbar title="Clam Farms" />
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      <Modal
        isShowing={isShowing}
        onClose={onModalClose}
        title={modalSelected === MODAL_OPTS.CLAM_DETAILS ? "" : "Choose a Clam"}
        maxWidth={modalSelected === MODAL_OPTS.CLAM_DETAILS ? "1000px" : "33%"}
      >
        {modalSelected === MODAL_OPTS.CLAM_DETAILS ? (
          <ClamDetails
            clam={selectedClam}
            clamProcessing={clamProcessing}
            updateAccount={updateAccount}
          />
        ) : modalSelected === MODAL_OPTS.DEPOSIT_CLAM ? (
          <ClamDeposit clams={clams} updateCharacter={updateCharacter} toggleModal={toggleModal} stakedRarities={stakedRarities} setRefreshClams={setRefreshClams} />
        ) : (
          <PearlView dna={selPearl.dna} dnaDecoded={selPearl.dnaDecoded} />
        )}
      </Modal>

      {address && (
        <div className="w-full lg:w-4/5 mx-auto relative z-10">
          <div className="px-2 md:px-8 py-4 mt-24 flex flex-col items-center">
            {/* clams and pears grid */}
            <div className="w-full my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
                <DepositClamCard onClick={onDepositClam} />
                {clamsStaked &&
                  clamsStaked.map((clam, i) => (
                    <FarmItem
                      key={i}
                      {...clam}
                      onViewDetails={(e, clamProcessing) => onViewDetails(clam, clamProcessing, i)}
                      onWithdrawClam={() => onWithdrawClam(clam)}
                      onViewPearl={onViewPearl}
                      updateCharacter={updateCharacter}
                      withdrawingClamId={withdrawingClamId}
                    />
                  ))}

                {/* {PEARLS &&
                  PEARLS.map((pearl, i) => (
                    <PearlItem key={i} pearl={pearl} />
                  ))} */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Character name="al" />
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Farms);
