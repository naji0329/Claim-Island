import React, { useState } from "react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";

import ConnectPool from "../../components/ConnectPool.js";
import Voting from "../../components/Voting";

import Bank from "../../assets/locations/bank_animated.mp4";
import { web3 } from "../../web3";

import {
  hasAccountedVoted
} from '../../web3/communityVoting'

// const hasNotStarted = Date.parse(String(new Date())) < Date.parse("Tue May 25 2021 09:00:00 GMT+0000");

const ShellVoting = () => {
  const [voting, setVoting] = useState(false);
  const [showConnect, setConnect] = useState(true);
  const [saleStatus, setSaleStatus] = useState("");
  const [saleErrorMsg, setSaleErrorMsg] = useState("");
  const [speech, triggerSpeech] = useState("");
  const [progress, setProgress] = useState(100);
  const [hasAccountVoted, setAlreadyVoted] = useState(false);

  const [connectedAccount, setConAccount] = useState('');
  if(web3 && web3.eth) {
    // detect if account is connected
    web3.eth.getAccounts().then(async (acc) => {
      setConAccount(acc[0] || '');
      if(acc[0]) {
        const hasVoted = await hasAccountedVoted(acc[0]);
        setAlreadyVoted(hasVoted);
        if(hasVoted) {
          setVoting(true);
        }
      }
    });
  }

  return (
    <>
      <div id="env-wrapper">
        <video autoPlay muted loop id="env">
          <source src={Bank} type="video/mp4" />
        </video>
      </div>
      <div className="shell-presale">
        <ConnectPool
          showConnect={showConnect}
          callback={setSaleStatus}
          errCallback={setSaleErrorMsg}
          triggerSpeech={triggerSpeech}
          showModal={false}
          progress={progress}
        />

        {voting ? <Voting setVoting={setVoting} /> : ''}

        {!hasAccountVoted ? 
          <CharacterSpeak
            character={"tanja"}
            speech={"shell_voting"}
            setVote={setVoting}
            saleStatus={saleStatus}
            saleErrorMsg={saleErrorMsg}
            connectedAccount={connectedAccount}
            triggerSpeech={speech}
          /> 
        : <CharacterSpeak
          character={"tanja"}
          speech={"shell_voted_already"}
          setVote={setVoting}
          saleStatus={saleStatus}
          saleErrorMsg={saleErrorMsg}
          connectedAccount={connectedAccount}
          triggerSpeech={speech}
        /> }

        {/* <CharacterSpeak
          character={"tanja"}
          speech={"shell_presale_finished"}
          web3={web3}
          setConnect={setConnect}
          saleStatus={saleStatus}
          saleErrorMsg={saleErrorMsg}
          triggerSpeech={speech}
        /> */}

      </div>
    </>
  );
};

export default ShellVoting;
