import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterDiego from "../../components/characters/CharacterDiego";
import Web3Navbar from "../../components/Web3Navbar";
import Shop from "../../assets/locations/shop_animated.mp4";

import getWeb3 from "../../web3/getWeb3";
import { actions } from "../../store/redux";

import ClamMintModal from "./ClamMintModal";
import ClamCollectModal from "./ClamCollectModal";

import Web3ClamPresale from "./Web3ClamPresale";

const ClamPresale = ({
  presale: { isStarted, rng, hasPurchasedClam },
  updateCharacter,
}) => {
  const web3 = getWeb3();

  useEffect(() => {
    console.log("useEffect", { isStarted });

    if (isStarted) {
      updateCharacter({ name: "diego", action: "clam_presale.welcome.text" });
    } else {
      updateCharacter({
        name: "diego",
        action: "clam_presale_not_started.welcome.text",
        button: {
          text: "Dismiss",
        },
      });
    }
  }, [isStarted]);

  return (
    <>
      {console.log({ isStarted })}
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
        <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20">
          <CharacterDiego />

          {/* {rng && hasPurchasedClam && (
            <CharacterSpeak
              character={"diego"}
              speech={"clam_presale_collection"}
              web3={web3}
              setConnect={setConnect}
              saleStatus={saleStatus}
              saleErrorMsg={saleErrorMsg}
              triggerSpeech={speech}
            />
          )} */}
        </div>

        {/* modal   -top-0 md:-top-64 */}
        <div className="flex-1 justify-center min-h-full min-w-full  md:flex items-center absolute z-30 -top-36 md:-top-42">
          {isStarted && !rng && <ClamMintModal />}
          {rng && hasPurchasedClam && <ClamCollectModal />}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamPresale);
