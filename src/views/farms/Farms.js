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

import { getStakedClamIds } from "../../web3/pearlFarm";

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
  const [clamsStaked, setClamsStaked] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isShowing, toggle: toggleModal } = useModal();

  const [modalSelected, setModal] = useState("");
  const [selectedPearl, setSelectedPearl] = useState({});

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
        text: "Withdraw",
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

  const getClamsDataByIds = async (tokenIdsCalls) => {
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
    const clamDnas = clamDataDecoded.map((data) => data.clamDataValues.dna);

    const dnaDecodedCalls = prepGetDnaDecodedMulticall(clamDnas);
    const dnaDecodedResult = await aggregate(dnaDecodedCalls);
    const dnaDecodedDecoded = decodeGetDnaDecodedFromMulticall(
      dnaDecodedResult.returnData,
      tokenIdsDecoded
    );

    const clams = clamDataDecoded.map((clam) => {
      const sameClam = dnaDecodedDecoded.find(
        ({ clamId }) => clamId === clam.clamId
      );
      if (sameClam) {
        const dnaDecoded = sameClam.dnaDecodedValues;
        return { ...clam, dnaDecoded };
      }
      console.error(`Clam ${clam.clamId} from ${address} not found`);
    });

    const clamsFiltered = clams.filter((c) => c);

    return clamsFiltered;
  };

  useEffect(() => {
    // wallet is connected and has clams
    if (address && clamBalance !== "0") {
      const initClams = async () => {
        try {
          setLoading(true);

          // get staked clams
          const clamsStakedIds = await getStakedClamIds(address);

          const skatedTokenIdsCalls =
            clamContract.prepTokenOfOwnerByIdsArrayMulticall(
              address,
              clamsStakedIds
            );

          // get owned clams
          const tokenIdsCalls = clamContract.prepTokenOfOwnerByIndexMulticall(
            address,
            +clamBalance
          );

          const [ownedClams, stakedClams] = await Promise.all([
            getClamsDataByIds(tokenIdsCalls),
            getClamsDataByIds(skatedTokenIdsCalls),
          ]);

          setClams(ownedClams);
          setClamsStaked(stakedClams);

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
      action: "saferoom.connect.text",
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
      <VideoBackground
        videoImage={videoImage}
        videoMp4={videoMp4}
        videoWebM={videoWebM}
      />

      <Modal isShowing={isShowing} onClose={toggleModal} width="30rem">
        {modalSelected === MODAL_OPTS.PEARL_DETAILS ? (
          <PearlDetails
            pearl={selectedPearl}
            onWithdrawPearl={onWithdrawPearl}
          />
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

              {!clamsStaked.length && (
                <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
                  You&#39;ve got no clams or pearls deposited on farms &#128542;
                </div>
              )}
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
