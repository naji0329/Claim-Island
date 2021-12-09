import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";
import RewardUnknown from "../../assets/img/pearl_unknown.png";
import Card from "../../components/Card";

import { actions } from "../../store/redux";
import ClamSwapModal from "./ClamSwapModal";
import ClamSwapCollectModal from "./ClamSwapCollectModal";
import Web3ClamClaimers from "./Web3ClamSwap";
import { Modal, useModal } from "components/Modal";
import ClamDisplayModal from "../shop/ClamDisplayModal";

const WaitingOracle = () => (
  <Card>
    <div className="flex flex-col mb-1">
      <h2 className="text-blue-700 font-semibold text-2xl mb-2">Collect Clam</h2>

      <div className="alert alert-warning">
        <div className="flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 mx-2 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <label>If you see this message for more than 30 seconds, please refresh this page.</label>
        </div>
      </div>
    </div>

    <div className="bg-white flex-1 justify-center  md:flex items-center">
      <img src={RewardUnknown} />
    </div>

    <div className="py-2 flex flex-col">
      <button
        type="button"
        className="flex justify-content-center items-center block uppercase text-center shadow bg-yellow-200 text-yellow-600 text-xl py-3 px-10 rounded-xl cursor-not-allowed"
      >
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>{" "}
        Waiting data from oracle...
      </button>
    </div>
  </Card>
);

const ClamSwap = ({
  account: { address, clams },
  clamSwapData: { hashRequest, rng },
  updateCharacter,
}) => {
  const legacyClams = clams.filter(({ isLegacyClam }) => isLegacyClam);
  const [modalToShow, setModalToShow] = useState(null);
  const { isShowing, toggleModal } = useModal();

  useEffect(() => {
    // not connected
    if (!address) {
      updateCharacter({
        name: "diego",
        action: "clam_swap.welcome.text",
        button: {
          text: null,
        },
      });
    }

    // is connected and not claimed
    if (address) {
      // not claimed yet
      if (rng) {
        if (rng === "0") {
          //pending oracle
          updateCharacter({
            name: "diego",
            action: "clam_swap.claimProcessing.text",
            button: false,
          });
        } else {
          // user can collect
          updateCharacter({
            name: "diego",
            action: "clam_swap.collection.text",
            button: {
              text: "Show",
              alt: {
                action: "cb",
                destination: () => {
                  setModalToShow("collect");
                },
              },
            },
          });
        }
      } else {
        if (!legacyClams.length) {
          // none of the clams are eligible for swapping
          updateCharacter({
            name: "diego",
            action: "clam_swap.no_legacy_clams.text",
            button: {
              text: "Back to Island",
              alt: {
                action: "internal",
                destination: "/",
              },
            },
          });
        } else {
          updateCharacter({
            name: "diego",
            action: "clam_swap.welcome_connected.text",
            button: {
              text: "Yes",
              alt: {
                action: "cb",
                destination: () => {
                  toggleModal();
                  setModalToShow("swap");
                  updateCharacter({
                    name: "diego",
                    action: "clam_swap.claim.text",
                    button: {
                      text: undefined,
                    },
                  });
                },
              },
            },
          });
        }
      }
    }
  }, [address, clams, rng]);

  return (
    <>
      <Web3ClamClaimers />
      {/* container */}
      <div className="shop-bg w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-full w-full md:flex relative z-10 object-cover object-center"
        >
          <source
            src={process.env.PUBLIC_URL + "/location_vids/shop_animated.mp4"}
            type="video/mp4"
          />
          <source
            src={process.env.PUBLIC_URL + "/location_vids/shop_animated_webm.webm"}
            type='video/webm; codecs="vp8, vorbis"'
          />
        </video>

        {/* chat character   */}
        <div className="flex-1 min-h-full min-w-full md:flex items-center absolute z-20">
          <CharacterWrapper name="diego" />
        </div>

        <Modal
          isShowing={isShowing}
          onClose={() => toggleModal()}
          title={"Choose a clam to swap"}
          modalClassName="w-full md:w-4/5"
        >
          {address && // wallet is connected
            modalToShow === "swap" && // user has agreed clicked Yes
            !hashRequest &&
            !rng && <ClamSwapModal legacyClams={legacyClams} toggleModal={toggleModal} />}
          {/* !rng = did not have clams to collect */}
        </Modal>
        <div className="flex absolute z-20 justify-center items-start top-40 w-full">
          {hashRequest && rng && rng === "0" && <WaitingOracle />}
          {hashRequest && rng && Number(rng) > 0 && modalToShow === "collect" && (
            <ClamSwapCollectModal setModalToShow={setModalToShow} />
          )}
          {modalToShow === "display" && (
            <ClamDisplayModal clam={legacyClams[0]} onClose={() => setModalToShow("")} />
          )}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamSwap);
