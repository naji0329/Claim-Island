import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterWrapper from "../../components/characters/CharacterWrapper";

import { actions } from "../../store/redux";
import PearlHuntModal from "./PearlHuntModal";
import Web3PearlHunt from "./Web3PearlHunt";

const PearlHunt = ({ account: { address }, pearlHuntData: { lastWinner }, updateCharacter }) => {
  const [showMintModal, setShowMintModal] = useState(false);

  useEffect(() => {
    // not connected
    if (!address) {
      updateCharacter({
        name: "diego",
        action: "pearl_hunt.welcome.text",
        button: {
          text: null,
        },
      });
    } else {
      if (address && lastWinner && address.toLowerCase() === lastWinner.toLowerCase()) {
        updateCharacter({
          name: "diego",
          action: "pearl_hunt.winner.text",
          button: {
            text: null,
          },
        });
      } else {
        updateCharacter({
          name: "diego",
          action: "pearl_hunt.welcome_connected.text",
          button: {
            text: "Submit Pearl",
            alt: {
              action: "cb",
              destination: () => {
                setShowMintModal(true);
                updateCharacter({
                  name: "diego",
                  action: "pearl_hunt.enter.text",
                  button: {
                    text: undefined,
                  },
                });
              },
            },
          },
          buttonAlt: {
            text: "Info & Rules",
            alt: {
              action: "url",
              destination:
                "https://clamisland.medium.com/pearl-hunt-event-claim-portal-5446328a9a5",
            },
          },
        });
      }
    }
  }, [address]);

  return (
    <>
      <Web3PearlHunt />
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

        <div className="flex-1 justify-center min-h-full min-w-full flex items-center absolute z-30 pointer-events-none pb-60">
          {address && // wallet is connected
            showMintModal && ( // user has agreed to participate
              <PearlHuntModal />
            )}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PearlHunt);
