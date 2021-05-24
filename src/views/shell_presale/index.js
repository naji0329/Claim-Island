import React, { useState, useEffect } from "react";
import "./index.scss";
import CharacterSpeak from "../../components/characters";

import ConnectPool from "../../components/ConnectPool.js";

import Bank from "../../assets/locations/bank_animated.mp4";

const hasNotStarted = Date.parse(String(new Date())) < Date.parse("Mon May 24 2021 21:00:00 GMT+0000");

const ShellPresale = () => {
  const [showConnect, setConnect] = useState(false);
  const [saleStatus, setSaleStatus] = useState('');
  const [saleErrorMsg, setSaleErrorMsg] = useState('');
  const [speech, triggerSpeech] = useState('');

  return (
    <>
      <div id="env-wrapper">
        <video autoPlay muted loop id="env">
          <source src={Bank} type="video/mp4" />
        </video>
      </div>
      <div className="shell-presale">
        <ConnectPool showConnect={showConnect} callback={setSaleStatus} errCallback={setSaleErrorMsg} triggerSpeech={triggerSpeech} />

        {hasNotStarted && (
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
        )}
      </div>
    </>
  );
};

export default ShellPresale;
