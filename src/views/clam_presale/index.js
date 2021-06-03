import React, { useState, useEffect } from "react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";

import ConnectPoolClam from "../../components/ConnectPoolClam.js";

import Shop from "../../assets/locations/shop_animated.mp4";
import { presaleCap, hasSaleStarted as getHasSaleStarted } from "../../web3/buyClamPresale";
import { totalClamSupply } from "../../web3/clam";
import getWeb3 from "../../web3/getWeb3";

import { Progress } from "reactstrap";

const ClamPresale = () => {
  const [showConnect, setConnect] = useState(true);
  const [saleStatus, setSaleStatus] = useState("");
  const [hasSaleStarted, setHasSaleStarted] = useState(false);
  const [saleErrorMsg, setSaleErrorMsg] = useState("");
  const [speech, triggerSpeech] = useState("");
  const [progress, setProgress] = useState(0);

  const web3 = getWeb3();

  if (web3) {
    setInterval(async () => {
      const cap = await presaleCap();
      const totalSupply = await totalClamSupply();
      const prog = (Number(totalSupply) / cap) * 100;
      setProgress(prog);
    }, 3000);
  }

  useEffect(() => {
    const hasSaleBegun = async function () {
      const hasIt = await getHasSaleStarted();
      setHasSaleStarted(hasIt);
    };
    hasSaleBegun();
  }, []);

  return (
    <>
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
          ""
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
