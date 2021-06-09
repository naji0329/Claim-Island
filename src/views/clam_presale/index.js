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

const ClamPresale = () => {
  const web3 = getWeb3();
  const isConnected = AccountStore.useState((obj) => obj.isConnected);

  // presale props
  const [statePresale, setStatePresale] = useState({
    cap: "0",
    totalSupply: "0",
    progress: 0,
    salePrice: "0",
    isStarted: false,
  });

  // characters state
  const [speech, triggerSpeech] = useState("");
  const [saleStatus, setSaleStatus] = useState(""); // what is that?
  const [saleErrorMsg, setSaleErrorMsg] = useState(""); // what is that?
  const [connect, setConnect] = useState(""); // what is that?

  const fetchPresaleData = async () => {
    console.log("fetch presale stats");

    const [hasSaleStarted, cap, totalSupply, salePrice] = await Promise.all([
      getHasSaleStarted(),
      presaleCap(),
      totalClamSupply(),
      getClamPrice(),
    ]);

    setStatePresale({
      cap, // max will be minted tokens
      totalSupply, // current minted tokens
      salePrice: formatUnits(salePrice, 18),
      progress: (Number(totalSupply) / cap) * 100,
      isStarted: hasSaleStarted,
    });
  };

  useAsync(async () => {
    console.log({ isConnected });
    // init call
    await fetchPresaleData();

    setInterval(async () => {
      // update every 10s
      await fetchPresaleData();
    }, 10000); //10s
  });

  useEffect(() => {
    PresaleStore.update((obj) => ({ ...obj, ...statePresale }));
  }, [statePresale]);

  return (
    <>
      {console.log({ statePresale })}
      <Web3Navbar />

      <Progress striped color="success" value={statePresale.progress}>
        {statePresale.progress}% of Clams Purchased
      </Progress>
      <div
        id="env-wrapper-clam-presale"
        className="bg-gradient-to-t from-yellow-400 via-red-500 to-green-300"
      >
        <video autoPlay muted loop className="env">
          <source src={Shop} type="video/mp4" />
        </video>
      </div>

      <div className="w-full h-full relative z-50">
        {statePresale.isStarted && (
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
            progress={statePresale.progress}
          />
        ) : (
          <></>
        )}

        {!statePresale.isStarted && (
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

        {statePresale.isStarted && (
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
