import React, { useState } from "react";
import { useAsync } from "react-use";
import { useEthers, shortenAddress } from "@usedapp/core";

import "./index.scss";
import CharacterSpeak from "../../components/characters";

import ConnectPoolClam from "../../components/ConnectPoolClam.js";

import Shop from "../../assets/locations/shop_animated.mp4";
import {
  presaleCap,
  hasSaleStarted as getHasSaleStarted,
} from "../../web3/buyClamPresale";
import { totalClamSupply } from "../../web3/clam";
import getWeb3 from "../../web3/getWeb3";

import { Progress } from "reactstrap";

const BSC_CHAIN_ID = 56;

const ClamPresale = () => {
  const [showConnect, setConnect] = useState(true);
  const [saleStatus, setSaleStatus] = useState("");
  const [hasSaleStarted, setHasSaleStarted] = useState(false);
  const [saleErrorMsg, setSaleErrorMsg] = useState("");
  const [speech, triggerSpeech] = useState("");
  const [progress, setProgress] = useState(0);

  const web3 = getWeb3();

  useAsync(async () => {
    if (web3) {
      setInterval(async () => {
        const cap = await presaleCap();
        const totalSupply = await totalClamSupply();
        const prog = (Number(totalSupply) / cap) * 100;
        setProgress(prog);
      }, 3000);

      const hasIt = await getHasSaleStarted();
      setHasSaleStarted(hasIt);

      const networkVersion = await web3.eth.net.getId();
      console.log({ networkVersion });
      if (networkVersion !== BSC_CHAIN_ID) {
        alert("Wrong Network, please change to Binance Smart Chain");
      }
    }
  });

  return (
    <>
      {!web3 && (
        <div
          className="bg-red-200 border-t-4 border-red-600 rounded-md text-red-800 px-4 py-3 shadow-xl m-2 absolute w-1/2 z-50"
          role="alert"
        >
          <div className="flex">
            <svg
              className="h-6 w-6 fill-current text-red-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
            <div>
              <p className="font-bold">
                You do not have installed any web3 wallet.
              </p>
              <p className="text-sm ">
                Make sure you have one. We recommend{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://metamask.io/"
                  className="underline"
                >
                  metamask
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      <Progress striped color="danger" value={progress}>
        {progress}% of Clams Purchased
      </Progress>
      <div id="env-wrapper">
        <video autoPlay muted loop id="env">
          <source src={Shop} type="video/mp4" />
        </video>
      </div>
      <div className="clam-presale">
        {web3 ? (
          <ConnectPoolClam
            showConnect={showConnect}
            callback={setSaleStatus}
            errCallback={setSaleErrorMsg}
            triggerSpeech={triggerSpeech}
            progress={progress}
          />
        ) : (
          <></>
        )}

        {!hasSaleStarted && (
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

        {hasSaleStarted && (
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
