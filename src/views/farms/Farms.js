import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import { actions } from "../../store/redux";
import "./index.scss";

import { useHistory } from "react-router-dom";
import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import { Modal, useModal } from "../../components/Modal";

import videoImage from "../../assets/locations/Farm.jpg";
import videoMp4 from "../../assets/locations/Farm.mp4";
import videoWebM from "../../assets/locations/Farm.webm";
import VideoBackground from "../../components/VideoBackground";

import clamIcon from "../../assets/clam-icon.png";

import clamContract from "../../web3/clam";
import {
  prepGetDnaDecodedMulticall,
  decodeGetDnaDecodedFromMulticall,
} from "../../web3/dnaDecoder";

import { getStakedClamIds, unstakeClam, collectPearl } from "../../web3/pearlFarm";

import FarmItem from "./FarmItem";
import PearlDetails from "./PearlDetails";
import ClamDeposit from "./ClamDeposit";
import { aggregate } from "../../web3/multicall";
import NFTUnknown from "../../assets/img/clam_unknown.png";

import { toast } from "react-toastify";

const MODAL_OPTS = {
  DEPOSIT_CLAM: "depositClam",
  PEARL_DETAILS: "pearlDetails",
};

import { useEthers } from "@usedapp/core";

const Farms = ({ account: { clamBalance, address }, updateCharacter, updateAccount }) => {
  let history = useHistory();
  const [clams, setClams] = useState([]);
  const [clamProcessing, setClamProcessing] = useState({}); // pearl process details
  const [clamsStaked, setClamsStaked] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isShowing, toggleModal } = useModal();

  const [modalSelected, setModal] = useState("");
  const [selectedClam, setSelectedClam] = useState({});

  const { chainId } = useEthers();

  const handleWithdraw = async (clamId) => {
    try {
      await unstakeClam(clamId);
    } catch (err) {
      updateAccount({ error: err.message });
    }
  };

  // When Deposit Clam Butto is clicked - open the modal to show list of clams
  const onDepositClam = () => {
    setModal(MODAL_OPTS.DEPOSIT_CLAM);
    toggleModal();
  };

  // when "View Pearl" is clicked - open the modal for the selected pearl
  const onViewDetails = (clam, clamProcessing, index) => {
    setClamProcessing(clamProcessing);
    setSelectedClam(clam);
    setModal(MODAL_OPTS.PEARL_DETAILS);
    toggleModal();
  };

  // when pearl is ready and is to be viewed
  const onViewPearl = async (clamId) => {
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
  };

  // when "Withdraw" is clicked - open the modal
  const onWithdrawClam = (clam) => {
    updateCharacter({
      name: "al",
      action: "farms.withdraw.text",
      show: true,
      button: {
        // text: undefined,
        text: "Withdraw",
        alt: {
          action: "cb",
          dismiss: true,
          destination: () => handleWithdraw(clam.clamId),
        },
      },
      buttonAlt: {
        text: "Cancel",
        alt: {
          action: "cb",
          dismiss: true,
          destination: () => {
            updateCharacter({
              name: "al",
              action: undefined,
            });
          },
        },
      },
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

    const dnaDecodedCalls = prepGetDnaDecodedMulticall(clamDnas);
    const dnaDecodedResult = await aggregate(dnaDecodedCalls, chainId);
    const dnaDecodedDecoded = decodeGetDnaDecodedFromMulticall(
      dnaDecodedResult.returnData,
      tokenIds
    );

    const clams = clamDataDecoded.map((clam) => {
      const sameClam = dnaDecodedDecoded.find(({ clamId }) => clamId === clam.clamId);
      if (sameClam) {
        const dnaDecoded = sameClam.dnaDecodedValues;
        return { ...clam, dnaDecoded };
      }
      console.error(`Clam ${clam.clamId} from ${address} not found`);
    });

    const clamsFiltered = clams.filter((c) => c);

    return clamsFiltered;
  };

  const addClamImg = async (clams) => {
    const cache = await caches.open("clam-island");
    const promises = await Promise.all(clams.map((clam) => {
      const dna = clam.clamDataValues.dna;
      return cache.match(`/${dna}`);
    }));
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
  }

  useEffect(() => {
    // wallet is connected
    if (address) {
      const initClams = async () => {
        try {
          setLoading(true);

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

          setClams(ownedClamsImg);
          setClamsStaked(stakedClamsImg);

          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log({ error });
        }
      };

      initClams();
    }
  }, [address, clamBalance]);

  useAsync(async () => {
    updateCharacter({
      name: "al",
      action: "farms.placeholder.text",
      button: {
        text: "Dismiss",
        alt: {
          action: "cb",
          destination: () => {
            updateCharacter({
              name: "al",
              action: undefined,
            });
          },
        },
      },
    });
  });

  return (
    <div className="overflow-x-hidden">
      {loading && (
        <div className="loading-screen">
          <div className="loading-elems">
            <img src={clamIcon} />
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Web3Navbar title="Clam Farms" />
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      <Modal
        isShowing={isShowing}
        onClose={toggleModal}
        width={modalSelected === MODAL_OPTS.PEARL_DETAILS ? "60rem" : "30rem"}
      >
        {modalSelected === MODAL_OPTS.PEARL_DETAILS ? (
          <PearlDetails clam={selectedClam} clamProcessing={clamProcessing} />
        ) : (
          <ClamDeposit clams={clams} />
        )}
      </Modal>

      {address && (
        <div className="w-full lg:w-4/5 mx-auto relative z-10">
          <div className="px-2 md:px-8 py-4 mt-24 flex flex-col items-center">
            <div className="w-full flex flex-col relative pt-24">
              {/* navbar */}
              <div className="bg-white rounded-xl shadow-xl w-full rounded-xl mx-auto flex flex-row justify-between items-center">
                <h2 className="px-3 text-3xl font-extrabold font-aristotelica-bold text-blue-500">
                  My Deposits
                </h2>
                <div className="p-3">
                  <button className="btn btn-info" onClick={onDepositClam}>
                    Deposit Clam
                  </button>
                </div>
              </div>
            </div>

            {/* clams and pears grid */}
            <div className="w-full my-4 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
                {clamsStaked &&
                  clamsStaked.map((clam, i) => (
                    <FarmItem
                      key={i}
                      {...clam}
                      onViewDetails={(e, clamProcessing) => onViewDetails(clam, clamProcessing, i)}
                      onWithdrawClam={() => onWithdrawClam(clam)}
                      onViewPearl={onViewPearl}
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
