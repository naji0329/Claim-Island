import React, { useState } from "react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";

import ConnectPool from "../../components/ConnectPool.js";
import Voting from "../../components/Voting";

import Bank from "../../assets/locations/bank_animated.mp4";
import { weiRaised, presaleCap } from "../../web3/buyShellPresale";
import getWeb3 from '../../web3/getWeb3';

import { Progress } from "reactstrap";

// const hasNotStarted = Date.parse(String(new Date())) < Date.parse("Tue May 25 2021 09:00:00 GMT+0000");

const ShellVoting = () => {
  const [voting, setVoting] = useState(false);
  const [showConnect, setConnect] = useState(false);
  const [saleStatus, setSaleStatus] = useState("");
  const [saleErrorMsg, setSaleErrorMsg] = useState("");
  const [speech, triggerSpeech] = useState("");
  const [progress, setProgress] = useState(100);

  const web3 = getWeb3();

  if(web3) {
    setInterval(async () => {
      const cap = await presaleCap();
      const wei = await weiRaised();
      const prog = (Number(wei) / cap) * 100;
      setProgress(prog);
    }, 3000);
  }

  return (
    <>
      <div id="env-wrapper">
        <video autoPlay muted loop id="env">
          <source src={Bank} type="video/mp4" />
        </video>
      </div>
      <div className="shell-presale">
        {web3 ?
          <ConnectPool
            showConnect={showConnect}
            callback={setSaleStatus}
            errCallback={setSaleErrorMsg}
            triggerSpeech={triggerSpeech}
            progress={progress}
          />
          : ''}

        {voting ? <Voting /> : ''}
        <CharacterSpeak
          character={"tanja"}
          speech={"shell_voting"}
          web3={web3}
          setVote={setVoting}
          saleStatus={saleStatus}
          saleErrorMsg={saleErrorMsg}
          triggerSpeech={speech}
        /> 

        {/* <CharacterSpeak
          character={"tanja"}
          speech={"shell_presale_finished"}
          web3={web3}
          setConnect={setConnect}
          saleStatus={saleStatus}
          saleErrorMsg={saleErrorMsg}
          triggerSpeech={speech}
        /> */}

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

export default ShellVoting;
