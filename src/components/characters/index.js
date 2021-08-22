import React, { useEffect, useState } from "react";

import { SPEECHES, CHARACTERS, BUTTONS } from "./constants";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.scss";

import { VotingStore } from "../../store/voting";

const CharacterSpeak = (props) => {
  const votingInProgress = VotingStore.useState((s) => s.inProgress);
  const votingComplete = VotingStore.useState((s) => s.complete);
  const votingCancelled = VotingStore.useState((s) => s.cancelled);
  const votingError = VotingStore.useState((s) => s.error);
  const votingAlreadyVoted = VotingStore.useState((s) => s.alreadyVoted);
  const votingWalletConnected = VotingStore.useState((s) => s.walletConnected);

  const character = CHARACTERS[props.character];
  const speechTrack = SPEECHES[props.speech];
  const btnTrack = BUTTONS[props.speech];

  // console.log(speechTrack);
  // console.log(btnTrack);

  const [charImg, setCharImg] = useState(character.charImg);
  const [charName, setCharName] = useState(character.name);
  const [showBubble, setShowBubble] = useState(true);
  let [trackCount, setTrackCount] = useState(Object.keys(speechTrack)[0]);
  // console.log(trackCount);

  const [speech, setSpeech] = useState(speechTrack[trackCount].text);
  const [buttonNextText, setButtonNextText] = useState(
    btnTrack[trackCount].next
  );
  const [buttonAltText, setButtonAltText] = useState(
    btnTrack[trackCount].alt.text
  );
  /*
    useEffect(()=>{
      if(!props.web3) {
        setSpeech('Please install a ethereum wallet and reload the page.');
      }
    }, [])

    */

  const onClickNext = (direct = false) => {
    let timeOut = 0;
    if (speechTrack[trackCount].dismiss && !direct) {
      setShowBubble(false);
      const characterImg = document.querySelector(".character");
      characterImg.style.marginTop = characterImg.offsetHeight - 76 + "px";
      switch (charName) {
        case "Tanja":
          characterImg.style.paddingRight = "15px";
          break;
        case "Diego":
          characterImg.style.paddingLeft = "5px";
          break;
      }
      document.querySelector(".character-wrap .character").style.pointerEvents =
        "auto";
      document.querySelector(".character-wrap .character").style.cursor =
        "pointer";
      timeOut = 1000;
    }
    if (speechTrack[trackCount].next) {
      setTimeout(() => {
        if (
          (props.speech.indexOf("voting") !== -1 && props.connectedAccount) ||
          props.speech.indexOf("voting") === -1
        ) {
          if (!direct) {
            setSpeech(speechTrack[speechTrack[trackCount].next].text);
            setTrackCount(speechTrack[trackCount].next);
            if (btnTrack[speechTrack[trackCount].next].next) {
              document.querySelector("#btn-next").style.display = "block";
              setButtonNextText(btnTrack[speechTrack[trackCount].next].next);
            } else {
              document.querySelector("#btn-next").style.display = "none";
            }
            if (btnTrack[speechTrack[trackCount].next].alt) {
              document.querySelector("#btn-alt").style.display = "block";
              setButtonAltText(btnTrack[speechTrack[trackCount].next].alt.text);
            } else {
              document.querySelector("#btn-alt").style.display = "none";
            }
          } else {
            setSpeech(speechTrack[trackCount].text);

            if (btnTrack[trackCount].next) {
              document.querySelector("#btn-next").style.display = "block";
              setButtonNextText(btnTrack[trackCount].next);
            } else {
              document.querySelector("#btn-next").style.display = "none";
            }
            if (btnTrack[trackCount].alt) {
              document.querySelector("#btn-alt").style.display = "block";
              setButtonAltText(btnTrack[trackCount].alt.text);
            } else {
              document.querySelector("#btn-alt").style.display = "none";
            }
          }
        }
      }, timeOut);
    }

    if (speechTrack[trackCount].next == "connect") {
      props.setConnect(true);
    }

    if (
      speechTrack[trackCount].next == "vote" ||
      speechTrack[trackCount].showVote
    ) {
      props.setVote(true);
    }
  };

  // TODO: continue flow after sale success or failure
  useEffect(() => {
    console.log("#### sale confirmed or failure", props.saleStatus);
    console.log(props.saleErrorMsg);
    if (props.saleStatus === "sale_failure") {
      toast("There was an error during your purchase");
    }
    if (props.saleStatus === "sale_success") {
      onClickNext();
    }
  }, [props.saleStatus, props.saleErrorMsg]);

  // for Buy and Connect
  useEffect(() => {
    if (
      ["buy", "connect"].indexOf(props.triggerSpeech) !== -1 &&
      props.speech.indexOf("voting") === -1
    ) {
      onClickNext();
    }
  }, [props.triggerSpeech]);

  useEffect(() => {
    // console.log("######## voting progress", votingInProgress);
    // console.log("######## voting error", votingError);
    // console.log("######## voting cancelled", votingCancelled);

    if (votingInProgress) {
      setTrackCount("progress");
      trackCount = "progress";
      onClickNext(true);
    }

    if (votingComplete) {
      setTrackCount("last");
      trackCount = "last";
      onClickNext(true);
      VotingStore.update((k) => {
        k.complete = false;
      });
    }

    if (votingCancelled) {
      setTrackCount("cancel");
      trackCount = "cancel";
      onClickNext(true);
      VotingStore.update((k) => {
        k.cancelled = false;
      });
    }

    if (votingAlreadyVoted) {
      setTrackCount("last");
      trackCount = "last";
      onClickNext(true);
    }

    if (votingError) {
      setTrackCount("error");
      trackCount = "error";
      onClickNext(true);
      VotingStore.update((k) => {
        k.error = false;
      });
    }
  }, [
    votingInProgress,
    votingError,
    votingCancelled,
    votingAlreadyVoted,
    votingComplete,
    votingWalletConnected,
  ]);

  const onClickAlt = (e) => {
    let destination = btnTrack[trackCount].alt.destination;
    switch (btnTrack[trackCount].alt.action) {
      case "url_internal":
        window.location.href = destination;
        break;

      case "url":
        window.open(destination, "_blank");
        break;

      case "speech":
        setSpeech(speechTrack[destination].text);
        setTrackCount(destination);
        break;

      case "connectWallet_next":
        //console.log('@@@@@@@@@ connecting')
        //props.setConnect(true);
        break;
    }
  };

  const onClickCharacter = (e) => {
    if (!showBubble) {
      setShowBubble(true);
      //setSpeech(speechTrack[trackCount+1]);
      //setButtonText(btnTrack[trackCount+1]);
      //const newCount = trackCount + 1;
      //setTrackCount(newCount);
      document.querySelector(".character-wrap .character").style.marginTop =
        "0px";
    } else {
    }
  };

  return (
    <div
      className={
        showBubble ? "character-bubble" : "character-bubble hide-bubble"
      }
    >
      <div className="text-bubble">
      <div className="text-wrapper">
        <div className="name">{charName}</div>
        <div className="speech">
          <p className="speech-text">{speech}</p>
        </div>
        {(votingWalletConnected &&
          [
            "shell_voting",
            "shell_voted_already",
            "shell_voting_complete",
          ].indexOf(props.speech) !== -1) ||
        [
          "shell_voting",
          "shell_voted_already",
          "shell_voting_complete",
        ].indexOf(props.speech) === -1 ? (
          <div className="buttons">
            <button className="btn character-btn" id="btn-alt" onClick={onClickAlt}>
              {buttonAltText}
            </button>
            <button
              className="btn character-btn"
              id="btn-next"
              onClick={(e) => onClickNext()}
            >
              {buttonNextText}
            </button>
          </div>
        ) : (
          ""
        )}
        </div>
      </div>

      <div className="character-container">
        <div className="character-wrap">
          <img src={charImg} className="character" onClick={onClickCharacter} />
        </div>
      </div>
      <button
        className="btn character-container-round"
        onClick={onClickCharacter}
      >
        <img src={charImg} className="character" />
      </button>

      <ToastContainer />

    </div>
  );
};

export default CharacterSpeak;
