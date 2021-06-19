import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterDiego from "../../components/characters/CharacterDiego";
import Web3Navbar from "../../components/Web3Navbar";
import Shop from "../../assets/locations/shop_animated.mp4";

import { actions } from "../../store/redux";
import { SPEECHES } from "../../components/characters/constants";

import ClamMintModal from "./ClamMintModal";
import ClamCollectModal from "./ClamCollectModal";
import ClamShowModal from "./ClamShowModal";
import Web3ClamPresale from "./Web3ClamPresale";

const ClamPresale = ({
  account: { clamBalance, address },
  presale: { isStarted, rng, hasPurchasedClam },
  updateCharacter,
}) => {
  const [showMintModal, setShowMintModal] = useState(false);
  useEffect(() => {
    console.log("useEffect", { isStarted });

    if (isStarted) {
      if (address && !hasPurchasedClam) {
        updateCharacter({
          name: "diego",
          action: "clam_presale.connected.text",
          button: {
            text: "Yes",
            alt: {
              action: "cb",
              destination: () => {
                setShowMintModal(true);
                updateCharacter({
                  name: "diego",
                  action: "clam_presale.purchase.text",
                  button: {
                    text: null,
                  },
                });
              },
            },
          },
        });
      }

      if (!address && !hasPurchasedClam) {
        updateCharacter({
          name: "diego",
          action: "clam_presale.connect.text",
          button: {
            text: null,
          },
        });
      }
    } else {
      updateCharacter({
        name: "diego",
        action: "clam_presale_not_started.welcome.text",
        button: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    }
  }, [isStarted, address]);

  return (
    <>
      <Web3Navbar />
      <Web3ClamPresale />
      {/* container */}
      <div className="min-w-screen min-h-screen flex items-center overflow-hidden relative bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-10"
        >
          <source src={Shop} type="video/mp4" />
        </video>

        {/* chat character   */}
        <div className="flex-1 min-h-full min-w-full  md:flex items-center">
          <CharacterDiego />
        </div>

        {/* modal   -top-0 md:-top-64 */}
        <div className="flex-1 justify-center min-h-full min-w-full  md:flex items-center absolute z-30 -top-36 md:-top-42">
          {clamBalance === "0" && // has not purchase any clam
            isStarted && // pre sale has started
            address && // wallet is connected
            showMintModal && // user has agreed clicked Yes
            !rng && <ClamMintModal />}
          {/* !rng = did not have clams to collect */}
          {clamBalance === "0" && rng && hasPurchasedClam && (
            <ClamCollectModal />
          )}
          {clamBalance === "1" && address && <ClamShowModal />}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamPresale);
