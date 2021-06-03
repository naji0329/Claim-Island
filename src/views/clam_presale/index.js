
import React, { useState } from "react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";

import ConnectPoolClam from "../../components/ConnectPoolClam.js";

import Shop from "../../assets/locations/shop_animated.mp4";
import { presaleCap } from "../../web3/buyClamPresale";
import { totalClamSupply } from "../../web3/clam";
import getWeb3 from '../../web3/getWeb3';

import { Progress } from "reactstrap";

// const hasNotStarted = Date.parse(String(new Date())) < Date.parse("Tue May 25 2021 09:00:00 GMT+0000");

const ClamPresale = () => {
  const [showConnect, setConnect] = useState(true);
  const [saleStatus, setSaleStatus] = useState("");
  const [saleErrorMsg, setSaleErrorMsg] = useState("");
  const [speech, triggerSpeech] = useState("");
  const [progress, setProgress] = useState(0);

  const web3 = getWeb3();

  if(web3) {
    setInterval(async () => {
      const cap = await presaleCap();
      const totalSupply = await totalClamSupply();
      const prog = (Number(totalSupply) / cap) * 100;
      setProgress(prog);
    }, 3000);
  }

  return (
    <>
      <Progress striped color="danger" value={progress}>
        Presale Filled {progress}%
      </Progress>
      <div id="env-wrapper">
        <video autoPlay muted loop id="env">
          <source src={Shop} type="video/mp4" />
        </video>
      </div>
      <div className="clam-presale">
        {web3 ?
          <ConnectPoolClam
            showConnect={showConnect}
            callback={setSaleStatus}
            errCallback={setSaleErrorMsg}
            triggerSpeech={triggerSpeech}
            progress={progress}
          />
          : ''}

        <CharacterSpeak
          character={"diego"}
          speech={"clam_presale_not_started"}
          web3={web3}
          setConnect={setConnect}
          saleStatus={saleStatus}
          saleErrorMsg={saleErrorMsg}
          triggerSpeech={speech}
        />

        {/* {hasNotStarted && (
          <CharacterSpeak
            character={"tanja"}
            speech={"shell_presale_not_started"}
            setConnect={setConnect}
            saleStatus={saleStatus}
            saleErrorMsg={saleErrorMsg}
            triggerSpeech={speech}
          />
        )}

        {!hasNotStarted && (
          <CharacterSpeak
            character={"tanja"}
            speech={"shell_presale"}
            setConnect={setConnect}
            saleStatus={saleStatus}
            saleErrorMsg={saleErrorMsg}
            triggerSpeech={speech}
          />
        )} */}
      </div>
    </>
  );
};

export default ClamPresale;
