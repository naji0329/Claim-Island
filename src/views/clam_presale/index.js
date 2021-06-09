import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { Progress } from "reactstrap";
import { formatUnits } from "@ethersproject/units";

import "./index.scss";
import CharacterSpeak from "../../components/characters";
import ConnectPoolClam from "../../components/ConnectPoolClam.js";
import Web3Navbar from "../../components/Web3Navbar";
import Shop from "../../assets/locations/shop_animated.mp4";

import {
  presaleCap,
  hasSaleStarted as getHasSaleStarted,
  getClamPrice,
} from "../../web3/buyClamPresale";
import { totalClamSupply } from "../../web3/clam";
import getWeb3 from "../../web3/getWeb3";
import { PresaleStore } from "../../store/presale";
import { AccountStore } from "../../store/account";

import ClamMintModal from "./ClamMintModal";
import Web3ClamPresale from "./Web3ClamPresale";

const ClamPresale = () => {
  const web3 = getWeb3();
  const isConnected = AccountStore.useState((obj) => obj.isConnected);
  const presale = PresaleStore.useState((obj) => obj);

  // characters state
  const [speech, triggerSpeech] = useState("");
  const [saleStatus, setSaleStatus] = useState(""); // what is that?
  const [saleErrorMsg, setSaleErrorMsg] = useState(""); // what is that?
  const [connect, setConnect] = useState(""); // what is that?

  return (
    <>
      {console.log({ presale, isConnected })}
      <Web3Navbar />

      <Web3ClamPresale />

      <div
        id="env-wrapper-clam-presale"
        className="bg-gradient-to-t from-yellow-400 via-red-500 to-green-300"
      >
        <video autoPlay muted loop className="env">
          <source src={Shop} type="video/mp4" />
        </video>
      </div>

      <div className="w-full h-full relative z-50">
        {presale.isStarted && (
          <>
            <ClamMintModal />
          </>
        )}
      </div>

      <div className="clam-presale">
        {isConnected ? (
          <ConnectPoolClam
            showConnect={isConnected}
            callback={setSaleStatus}
            errCallback={setSaleErrorMsg}
            triggerSpeech={triggerSpeech}
            progress={presale.progress}
          />
        ) : (
          <></>
        )}

        {!presale.isStarted && (
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

        {presale.isStarted && (
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
    </>
  );
};

export default ClamPresale;
