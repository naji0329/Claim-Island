import React, { useState } from "react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";

import Moment from "react-moment";
import moment from "moment";
import Countdown from "react-countdown";

import ConnectPool from "../../components/ConnectPool.js";
import Voting from "../../components/Voting";

import Bank from "../../assets/locations/bank_animated.mp4";
import { web3 } from "../../web3";

import { hasAccountedVoted } from "../../web3/communityVoting";


const COUNTDOWN_END_TIME = "2021-06-10";

// const hasNotStarted = Date.parse(String(new Date())) < Date.parse("Tue May 25 2021 09:00:00 GMT+0000");

const ShellVoting = () => {
  const [voting, setVoting] = useState(false);
  const [showConnect, setConnect] = useState(true);
  const [saleStatus, setSaleStatus] = useState("");
  const [saleErrorMsg, setSaleErrorMsg] = useState("");
  const [speech, triggerSpeech] = useState("");
  const [progress, setProgress] = useState(100);
  const [hasAccountVoted, setAlreadyVoted] = useState(false);
  const [votingComplete, setVotingComplete] = useState(false);

  const [connectedAccount, setConAccount] = useState("");
  if (web3 && web3.eth) {
    // detect if account is connected
    web3.eth.getAccounts().then(async (acc) => {
      setConAccount(acc[0] || "");
      if (acc[0]) {
        const hasVoted = await hasAccountedVoted(acc[0]);
        setAlreadyVoted(hasVoted);
        // if (hasVoted) {
        //   setVoting(true);
        // }
      }
    });
  }

  const countdownComplete = () => {
    setVotingComplete(true);
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "";
    } else {
      // Render a countdown
      return (
        <p
          style={{
            textAlign: "center",
            margin: 0,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "12px",
            backgroundColor: "#dc3545",
            backgroundImage:
              "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
            backgroundSize: "1rem 1rem",
          }}
        >
          Voting Ends In {days}:{hours}:{minutes}:{seconds}
        </p>
      );
    }
  };

  return (
    <>
      <Countdown
        date={moment(COUNTDOWN_END_TIME)}
        onComplete={countdownComplete}
        renderer={renderer}
      />
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

        {voting && !votingComplete ? <Voting setVoting={setVoting} /> : ""}

        {!hasAccountVoted && !votingComplete ? (
          <CharacterSpeak
            character={"tanja"}
            speech={"shell_voting"}
            setVote={setVoting}
            saleStatus={saleStatus}
            saleErrorMsg={saleErrorMsg}
            connectedAccount={connectedAccount}
            triggerSpeech={speech}
          />
        ) : !votingComplete ? (
          <CharacterSpeak
            character={"tanja"}
            speech={"shell_voted_already"}
            setVote={setVoting}
            saleStatus={saleStatus}
            saleErrorMsg={saleErrorMsg}
            connectedAccount={connectedAccount}
            triggerSpeech={speech}
          />
        ) : (
          <CharacterSpeak
            character={"tanja"}
            speech={"shell_voting_complete"}
            setVote={setVoting}
            saleStatus={saleStatus}
            saleErrorMsg={saleErrorMsg}
            connectedAccount={connectedAccount}
            triggerSpeech={speech}
          />
        )}

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
