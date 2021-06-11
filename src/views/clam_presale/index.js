import React, { useState } from "react";
import { connect } from "redux-zero/react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";
import Web3Navbar from "../../components/Web3Navbar";
import Shop from "../../assets/locations/shop_animated.mp4";

import getWeb3 from "../../web3/getWeb3";

import ClamMintModal from "./ClamMintModal";
import Web3ClamPresale from "./Web3ClamPresale";

const ClamPresale = ({ presale: { isStarted } }) => {
  const web3 = getWeb3();

  // characters state
  const [speech, triggerSpeech] = useState("");
  const [saleStatus, setSaleStatus] = useState(""); // what is that?
  const [saleErrorMsg, setSaleErrorMsg] = useState(""); // what is that?
  const [connect, setConnect] = useState(""); // what is that?

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
        <div className="flex-1 min-h-full min-w-full  md:flex items-center absolute z-20 -top-12">
          {!isStarted && (
            <CharacterSpeak
              character={"diego"}
              speech={"clam_presale_not_started"}
              web3={web3}
              setConnect={setConnect}
              saleStatus={saleStatus}
              saleErrorMsg={saleErrorMsg}
              triggerSpeech={speech}
            />
          )}

          {isStarted && (
            <CharacterSpeak
              character={"diego"}
              speech={"clam_presale"}
              web3={web3}
              setConnect={setConnect}
              saleStatus={saleStatus}
              saleErrorMsg={saleErrorMsg}
              triggerSpeech={speech}
            />
          )}
        </div>

        {/* modal */}
        <div className="flex-1 justify-center min-h-full min-w-full  md:flex items-center absolute z-30 -top-0 md:-top-64">
          {isStarted && <ClamMintModal />}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps)(ClamPresale);
