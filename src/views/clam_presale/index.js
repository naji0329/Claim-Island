import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";

import videoImage from "../../assets/locations/Shop.jpg";
import videoMp4 from "../../assets/locations/Shop.mp4";
import videoWebM from "../../assets/locations/Shop.webm";
import VideoBackground from "../../components/VideoBackground";

import { actions } from "../../store/redux";
// import { SPEECHES } from "../../components/characters/constants";
import ClamMintModal from "./ClamMintModal";
import ClamCollectModal from "./ClamCollectModal";
// import ClamShowModal from "./ClamShowModal";
import Web3ClamPresale from "./Web3ClamPresale";

const ClamPresale = ({
  account: { clamBalance, address },
  presale: { isStarted, isEnded, rng, usersPurchasedClam },
  updateCharacter,
}) => {
  const [showMintModal, setShowMintModal] = useState(false);
  useEffect(() => {
    console.log("useEffect", { isStarted });

    if (clamBalance > 0 && address) {
      updateCharacter({
        name: "diego",
        action: "clam_presale.congratsCollection.text",
        button: {
          text: "Go to Saferoom",
          alt: {
            action: "internal",
            destination: "/clam",
          },
        },
        buttonAlt: {
          text: "Buy more",
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
    } else if (isEnded) {
      updateCharacter({
        name: "diego",
        action: "clam_presale_finished.welcome.text",
        button: {
          text: "Back to Island",
          alt: {
            action: "internal",
            destination: "/",
          },
        },
      });
    } else if (isStarted) {
      if (address) {
        if (rng) {
          updateCharacter({
            name: "diego",
            action: "clam_presale.collection.text",
            button: false,
          });
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
          updateCharacter({
            name: "diego",
            action: "clam_presale.welcome_connected.text",
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
      } else {
        updateCharacter({
          name: "diego",
          action: "clam_presale.welcome_notConnected.text",
          button: {
            text: "Yes",
            next: "clam_presale.connect.text",
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
      <Web3ClamPresale />
      {/* container */}

      <VideoBackground videoImage={videoImage} videoMp4={videoMp4} videoWebM={videoWebM} />

      {/* chat character   */}
      {isStarted != undefined && (
        <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20">
          <CharacterWrapper name="diego" />
        </div>
      )}

      {/* modal   -top-0 md:-top-64 */}
      <div className="flex-1 justify-center min-h-full min-w-full flex items-center absolute z-30 pointer-events-none pb-60">
        {isStarted && // pre sale has started
          address && // wallet is connected
          showMintModal && // user has agreed clicked Yes
          !rng && <ClamMintModal setShowMintModal={setShowMintModal} />}
        {/* !rng = did not have clams to collect */}
        {rng && <ClamCollectModal setShowMintModal={setShowMintModal} />}
        {/* {clamBalance === "1" && address && <ClamShowModal />} */}
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamPresale);
