import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { useEthers } from "@usedapp/core";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";
import Web3Navbar from "../../components/Web3Navbar";
import Shop from "../../assets/locations/shop_animated.mp4";

import { actions } from "../../store/redux";
// import { SPEECHES } from "../../components/characters/constants";
import ClamBuyModal from "./ClamBuyModal";
import ClamCollectModal from "./ClamCollectModal";
// import ClamShowModal from "./ClamShowModal";

const ClamPresale = ({
  account: { clamBalance, address },
  presale: { isStarted, isEnded, rng, usersPurchasedClam },
  updateCharacter,
}) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const { activateBrowserWallet } = useEthers();
  useEffect(() => {
    updateCharacter({
      name: "diego",
      action: "clam_shop.welcome.text",
      button: {
        text: "Let's go!",
        alt: {
          action: "cb",
          destination: () => {
            if (address) {
              updateCharacter({
                name: "diego",
                action: "clam_shop.choose_path.text",
                buttonAlt: {
                  text: "Harvest Clams",
                  // alt: {
                  //   action: "cb",
                  //   destination: () => {
                  //     setShowBuyModal(true);
                  //     updateCharacter({
                  //       name: "diego",
                  //       action: "clam_claimer.claim.text",
                  //       button: {
                  //         text: "Back to Island",
                  //         alt: {
                  //           action: "internal",
                  //           destination: "/",
                  //         },
                  //       },
                  //       buttonAlt: {
                  //         text: "Go to Saferoom",
                  //         alt: {
                  //           action: "internal",
                  //           destination: "/saferoom",
                  //         },
                  //       },
                  //     });
                  //   },
                  // },
                },
                button: {
                  text: "Buy Clams",
                  alt: {
                    action: "cb",
                    destination: () => {
                      setShowBuyModal(true);
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
            } else {
              updateCharacter({
                name: "diego",
                action: "clam_presale.connect.text",
                button: {
                  text: 'Connect',
                  alt: {
                    action: "cb",
                    destination: activateBrowserWallet
                  }
                },
              });
            }
            
          },
        },
      },
    });
    
  }, [address]);

  return (
    <>
      <Web3Navbar />
      {/* container */}
      <div className="shop-bg w-full h-screen flex items-center overflow-hidden fixed bg-gradient-to-t from-blue-400 to-green-500">
        <video
          autoPlay
          muted
          loop
          className="flex-1 h-full w-full md:flex relative z-10 object-cover object-center"
        >
          <source src={process.env.PUBLIC_URL + "/location_vids/shop_animated.mp4"} type="video/mp4" />
          <source src={process.env.PUBLIC_URL + "/location_vids/shop_animated_webm.webm"}  type='video/webm; codecs="vp8, vorbis"' />
        </video>

        {/* chat character   */}
        <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20">
          <CharacterWrapper name="diego" />
        </div>

        {/* modal   -top-0 md:-top-64 */}
        <div className="flex-1 justify-center min-h-full min-w-full flex items-center absolute z-30 pointer-events-none pb-60">
          {
            address && // wallet is connected
            showBuyModal && // user has agreed clicked Yes
            !rng && <ClamBuyModal setShowBuyModal={setShowBuyModal} />}
          {/* !rng = did not have clams to collect */}
          {rng && <ClamCollectModal setShowBuyModal={setShowBuyModal} />}
          {/* {clamBalance === "1" && address && <ClamShowModal />} */}

        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamPresale);
