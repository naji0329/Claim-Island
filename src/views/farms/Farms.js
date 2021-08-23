import React, { useState, useEffect } from "react";
import { connect } from "redux-zero/react";
import { useAsync } from "react-use";
import { actions } from "../../store/redux";
import "./index.scss";

import { useHistory } from "react-router-dom";
import Character from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import { Modal, useModal } from "../../components/Modal";

import videoImage from "../../assets/locations/bank_static.jpg";
import videoMp4 from "../../assets/locations/bank_animated.mp4";
import videoWebM from "../../assets/locations/bank_animated.webm";
import VideoBackground from "../../components/VideoBackground";

import clamIcon from "../../assets/clam-icon.png";

import clamContract from "../../web3/clam";
import {
  prepGetDnaDecodedMulticall,
  decodeGetDnaDecodedFromMulticall,
} from "../../web3/dnaDecoder";

import FarmItem from "./FarmItem";
import PearlDetails from "./PearlDetails";
import ClamDeposit from "./ClamDeposit";
import { aggregate } from "../../web3/multicall";

const MODAL_OPTS = {
  DEPOSIT_CLAM: "depositClam",
  PEARL_DETAILS: "pearlDetails",
};

const Farms = ({ account: { clamBalance, address }, updateCharacter }) => {
  let history = useHistory();
  const [clams, setClams] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isShowing, toggle: toggleModal } = useModal();

  const [modalSelected, setModal] = useState("");
  const [selectedPearl, setSelectedPearl] = useState({});
  const [selectedClam, setSelectedClam] = useState({});

  // When Deposit Clam Butto is clicked - open the modal to show list of clams
  const onDepositClam = () => {
    setModal(MODAL_OPTS.DEPOSIT_CLAM);
    toggleModal();
  };

  // when "View Pearl" is clicked - open the modal for the selected pearl
  const onViewPearlDetails = (pearl) => {
    setSelectedPearl(pearl);
    setModal(MODAL_OPTS.PEARL_DETAILS);
    toggleModal();
  };

  // when pearl is ready and is to be viewed
  const onViewPearl = (pearl) => {
    console.log(pearl);
    setTimeout(() => {
      history.push("/saferoom");
    }, 2000);
  };

  // when "View Pearl" is clicked - open the modal for the selected pearl
  const onWithdrawPearl = (pearl) => {
    updateCharacter({
      name: "al",
      action: "farms.withdraw.text",
      show: true,
      button: {
        // text: undefined,
        text: "WithDraw",
        alt: {
          action: "cb",
          dismiss: true,
          destination: () => {
            // toggleModal();
            // setShowClams(true);
          },
        },
      },
      buttonAlt: {
        text: "Cancel",
        alt: {
          action: "cb",
          dismiss: true,
          destination: () => {
            // toggleModal();
            // setShowClams(true);
          },
        },
      },
    });
  };

  useEffect(() => {
    // wallet is connected and has clams
    if (address && clamBalance !== "0") {
      const initClams = async () => {
        try {
          setLoading(true);

          const tokenIdsCalls = clamContract.prepTokenOfOwnerByIndexMulticall(
            address,
            +clamBalance
          );
          const tokenIdsResult = await aggregate(tokenIdsCalls);
          const tokenIdsDecoded = clamContract.decodeTokenOfOwnerByIndexFromMulticall(
            tokenIdsResult.returnData
          );

          const clamDataCalls = clamContract.prepClamDataMulticall(tokenIdsDecoded);
          const clamDataResult = await aggregate(clamDataCalls);
          const clamDataDecoded = clamContract.decodeClamDataFromMulticall(
            clamDataResult.returnData,
            tokenIdsDecoded
          );
          const clamDnas = clamDataDecoded.map((clamData) => clamData.clamDataValues.dna);

          const dnaDecodedCalls = prepGetDnaDecodedMulticall(clamDnas);
          const dnaDecodedResult = await aggregate(dnaDecodedCalls);
          const dnaDecoded = decodeGetDnaDecodedFromMulticall(
            dnaDecodedResult.returnData,
            tokenIdsDecoded
          );

          const clams = clamDataDecoded.map((clam) => {
            const sameClam = dnaDecoded.find(({ clamId }) => clamId === clam.clamId);
            if (sameClam) {
              const dnaDecoded = sameClam.dnaDecoded;
              return { ...clam, dnaDecoded };
            }
            return clam;
          });

          setClams(clams);
          setLoading(false);
          updateCharacter({ action: "dismissBubble" });
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
      action: "saferoom.connect.text",
      button: {
        // text: undefined,
        // text: "Ok",
        // alt: {
        //   action: "cb",
        //   dismiss: true,
        //   destination: () => {
        //     // toggleModal();
        //     // setShowClams(true);
        //   },
        // },
      },
    });
  });

  // On deposit clam
  useEffect(() => {
    if (selectedClam && selectedClam.dna) {
    }
  }, [selectedClam]);

  return (
    <div className="Farm">
      {loading && (
        <div className="loading-screen">
          <div className="loading-elems">
            <img src={clamIcon} />
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Web3Navbar title="Clam Farm" />
      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />
      <Character name="al" />

      <Modal isShowing={isShowing} onClose={toggleModal}>
        {modalSelected === MODAL_OPTS.PEARL_DETAILS ? (
          <PearlDetails pearl={selectedPearl} onWithdrawPearl={onWithdrawPearl}></PearlDetails>
        ) : (
          <ClamDeposit setSelectedClam={setSelectedClam} clams={clams}></ClamDeposit>
        )}
      </Modal>

      {address && (
        <div className="flex-1 min-h-full min-w-full flex relative z-20 justify-center items-center flex-col">
          <div className="w-4/5 flex flex-col relative pt-24">
            {/* navbar */}
            <div className="w-full rounded-xl mx-auto flex flex-row justify-end">
              <div className="px-3 py-2 flex justify-between">
                <button className="deposit-clam-btn" onClick={onDepositClam}>
                  Deposit Clam
                </button>
              </div>
            </div>
          </div>

          {/* clams and pears grid */}
          <div className="w-4/5 my-4 overflow-auto" style={{ height: "50rem" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
              {clams &&
                clams.map((clam, i) => (
                  <FarmItem
                    key={i}
                    {...clam}
                    onViewPearlDetails={onViewPearlDetails}
                    onWithdrawPearl={onWithdrawPearl}
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
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Farms);
