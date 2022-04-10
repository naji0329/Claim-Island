import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";
import ClamUnknown from "../../assets/img/clam_unknown.png";
import Card from "../../components/Card";
// import Shop from "../../assets/locations/shop_animated.mp4";

import { actions } from "../../store/redux";
// import { SPEECHES } from "../../components/characters/constants";
import ClamMintModal from "./ClamMintModal";
import ClamCollectModal from "./ClamCollectModal";
// import ClamShowModal from "./ClamShowModal";
import Web3ClamClaimers from "./Web3ClamClaimers";

const ClamWaitingOracle = () => (
  <Card>
    <div className="flex flex-col mb-1">
      <h2 className="text-blue-700 font-semibold text-2xl mb-2">Get Clams on BSC</h2>

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
          <label>If takes too long please refresh this page</label>
        </div>
      </div>
    </div>

    <div className="bg-white flex-1 justify-center  md:flex items-center">
      <img src={ClamUnknown} />
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

const ClamPresale = ({
  account: { clamBalance, address },
  clamClaimerData: { hashRequest, rng, usersClaimedClam, isClamClaimer, individualCap },
  updateCharacter,
}) => {
  const isStarted = true;
  const cap = 264; // 66 * 4 clams needs to be claimed from earlier purchasers
  const isEnded = usersClaimedClam >= cap;
  const [showMintModal, setShowMintModal] = useState(false);

  useEffect(() => {
    console.log({
      isEnded,
      isStarted,
      isClamClaimer,
      address,
      clamBalance,
      individualCap,
      usersClaimedClam,
    });

    // not connected
    if (!address) {
      updateCharacter({
        name: "diego",
        action: "clam_claimer.welcome.text",
        button: {
          text: null,
        },
      });
    }

    if (!isClamClaimer) {
      updateCharacter({
        name: "diego",
        action: "clam_claimer_not_allowed.first.text",
        button: {
          text: null,
        },
      });
    }

    if (isEnded) {
      updateCharacter({
        name: "diego",
        action: "clam_claimer_not_allowed.claimed.text",
        button: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    }

    // is connected and not claimed
    if (parseInt(clamBalance) > 0 && address) {
      // not claimed yet

      if (rng) {
        if (rng === "0") {
          //pending oracle
          updateCharacter({
            name: "diego",
            action: "clam_claimer.claimProcessing.text",
            button: false,
          });
        } else {
          // user can collect
          updateCharacter({
            name: "diego",
            action: "clam_claimer.collection.text",
            button: false,
          });
        }

        // } else if (Number(usersPurchasedClam) > 0) {
        //   updateCharacter({
        //     name: "diego",
        //     action: "clam_presale.congratsCollection.text",
        //     button: {
        //       text: "See my Clams",
        //       alt: {
        //         action: "internal",
        //         destination: "/saferoom",
        //       },
        //     },
        //   });
      } else {
        if (parseInt(usersClaimedClam) < parseInt(individualCap)) {
          // can claim
          updateCharacter({
            name: "diego",
            action: "clam_claimer.welcome_connected.text",
            button: {
              text: "Yes",
              alt: {
                action: "cb",
                destination: () => {
                  setShowMintModal(true);
                  updateCharacter({
                    name: "diego",
                    action: "clam_claimer.claim.text",
                    button: {
                      text: undefined,
                    },
                  });
                },
              },
            },
          });
        }
        // already claimed all
        else {
          updateCharacter({
            name: "diego",
            action: "clam_claimer_not_allowed.claimed.text",
            button: {
              text: "Back to Island",
              alt: {
                action: "internal",
                destination: "/",
              },
            },
          });
        }
      }
    }
  }, [address, isClamClaimer, rng]);

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
        <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20">
          <CharacterWrapper name="diego" />
        </div>

        {/* modal   -top-0 md:-top-64 */}
        <div className="flex-1 justify-center min-h-full min-w-full flex items-center absolute z-30 pointer-events-none pb-60">
          {address && // wallet is connected
            showMintModal && // user has agreed clicked Yes
            !hashRequest &&
            !rng && <ClamMintModal setShowMintModal={setShowMintModal} />}
          {/* !rng = did not have clams to collect */}

          {hashRequest && rng && rng === "0" && <ClamWaitingOracle />}
          {hashRequest && rng && Number(rng) > 0 && (
            <ClamCollectModal setShowMintModal={setShowMintModal} />
          )}
          {/* {clamBalance === "1" && address && <ClamShowModal />} */}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamPresale);
