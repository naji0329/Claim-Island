import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Reveal } from "react-text-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";

import { SPEECHES, CHARACTERS, BUTTONS } from "./constants";
import { VotingStore } from "../../store/voting";
import "./index.scss";

const CharacterSpeak = (props) => {
  const votingInProgress = VotingStore.useState((s) => s.inProgress);
  const votingComplete = VotingStore.useState((s) => s.complete);
  const votingCancelled = VotingStore.useState((s) => s.cancelled);
  const votingError = VotingStore.useState((s) => s.error);
  const votingAlreadyVoted = VotingStore.useState((s) => s.alreadyVoted);
  const votingWalletConnected = VotingStore.useState((s) => s.walletConnected);
  const { isNeedSkipFirstWelcome } = props;

  const character = CHARACTERS[props.character];
  const speechTrack = SPEECHES[props.speech];
  const btnTrack = BUTTONS[props.speech];

  const [charImg] = useState(character.charImg);
  const [charName] = useState(character.name);
  const [showBubble, setShowBubble] = useState(true);
  let [trackCount, setTrackCount] = useState(
    Object.keys(speechTrack)[isNeedSkipFirstWelcome ? 2 : 0]
  );
  const [speech, setSpeech] = useState(speechTrack[trackCount].text);
  const [buttonNextText, setButtonNextText] = useState(btnTrack[trackCount].next);
  const [buttonAltText, setButtonAltText] = useState(btnTrack[trackCount].alt.text);
  const [skipDialog, setSkipDialog] = useState(null);
  const [skipDialogs, setSkipDialogs] = useState(Boolean(localStorage.getItem("skipDialogs")));
  const [canPlay, setCanPlay] = useState(false);

  const btnAlt = useRef();
  const btnNext = useRef();
  const characterImg = useRef();
  const characterWrap = useRef();
  const onClickNextSkip = () => {
    if (skipDialog === "propose") {
      setSpeech(SPEECHES.skip.agree.text);
      setButtonNextText(BUTTONS.skip.agree.next);
      btnAlt.current.style.display = "none";
      setSkipDialog("agree");
    }
    if (skipDialog === "restore") {
      setSpeech(SPEECHES.skip.agree.text);
      setButtonNextText(BUTTONS.skip.agree.next);
      btnAlt.current.style.display = "none";
      setSkipDialog("agree");
    }

    if (skipDialog === "agree") {
      setShowBubble(false);
      localStorage.setItem("skipDialogs", "true");
      setSkipDialogs(true);
    }

    if (skipDialog === "disagree") {
      setSkipDialog(null);
      setSpeech(speechTrack[trackCount].text);
      setButtonNextText(btnTrack[trackCount].next);
      setButtonAltText(btnTrack[trackCount].alt.text);
      setSkipDialogs(false);
    }
  };

  const onClickAltSkip = () => {
    setSpeech(SPEECHES.skip.disagree.text);
    setButtonNextText(BUTTONS.skip.disagree.next);
    btnAlt.current.style.display = "none";
    setSkipDialog("disagree");
    localStorage.removeItem("skipDialogs");
  };

  const onClickNext = (direct = false) => {
    if (skipDialog) {
      onClickNextSkip();
      return;
    }

    let timeOut = 0;
    if (speechTrack[trackCount].dismiss && !direct) {
      setShowBubble(false);
      characterImg.current.style.marginTop = characterImg.current.offsetHeight + "px";
      switch (charName) {
        case "Tanja":
          characterImg.current.style.paddingRight = "15px";
          break;
        case "Diego":
          characterImg.current.style.paddingLeft = "5px";
          break;
      }
      characterWrap.current.style.pointerEvents = "auto";
      characterWrap.current.style.cursor = "pointer";
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
              btnNext.current.style.display = "block";
              setButtonNextText(btnTrack[speechTrack[trackCount].next].next);
            } else {
              btnNext.current.style.display = "none";
            }
            if (btnTrack[speechTrack[trackCount].next].alt) {
              btnAlt.current.style.display = "block";
              setButtonAltText(btnTrack[speechTrack[trackCount].next].alt.text);
            } else {
              btnAlt.current.style.display = "none";
            }
          } else {
            setSpeech(speechTrack[trackCount].text);

            if (btnTrack[trackCount].next) {
              btnNext.current.style.display = "block";
              setButtonNextText(btnTrack[trackCount].next);
            } else {
              btnNext.current.style.display = "none";
            }
            if (btnTrack[trackCount].alt) {
              btnAlt.current.style.display = "block";
              setButtonAltText(btnTrack[trackCount].alt.text);
            } else {
              btnAlt.current.style.display = "none";
            }
          }
        }
      }, timeOut);
    }

    if (speechTrack[trackCount].next === "connect") {
      props.setConnect(true);
    }

    if (speechTrack[trackCount].next === "vote" || speechTrack[trackCount].showVote) {
      props.setVote(true);
    }
  };

  // TODO: continue flow after sale success or failure
  useEffect(() => {
    console.log("#### sale confirmed or failure", props.saleStatus);
    console.log(props.saleErrorMsg);
    if (props.saleStatus === "sale_failure") {
      toast.error("There was an error during your purchase");
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

  const onClickAlt = () => {
    if (skipDialog) {
      onClickAltSkip();
      return;
    }

    let destination = btnTrack[trackCount].alt.destination;
    switch (btnTrack[trackCount].alt.action) {
      case "url_internal":
        window.location.href = destination;
        if (btnTrack[trackCount].alt.next) {
          setSpeech(speechTrack[btnTrack[trackCount].alt.next].text);
          setTrackCount(btnTrack[trackCount].alt.next);
        }
        break;

      case "url":
        window.open(destination, "_blank");
        if (btnTrack[trackCount].alt.next) {
          setSpeech(speechTrack[btnTrack[trackCount].alt.next].text);
          setTrackCount(btnTrack[trackCount].alt.next);
        }
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

  const onClickCharacter = () => {
    setShowBubble(!showBubble);
  };

  const onClickMinimizedButton = () => {
    setShowBubble(false);
  };

  const onClickSkipDialogButton = () => {
    setSpeech(SPEECHES.skip.propose.text);
    setButtonNextText(BUTTONS.skip.propose.next);
    setButtonAltText(BUTTONS.skip.propose.alt);
    btnAlt.current.style.display = "block";
    setSkipDialog("propose");
  };

  const onClickSkipRestoreButton = () => {
    setSpeech(SPEECHES.skip.restore.text);
    setButtonNextText(BUTTONS.skip.restore.alt);
    setButtonAltText(BUTTONS.skip.restore.next);
    btnAlt.current.style.display = "block";
    setSkipDialog("propose");
  };

  useEffect(() => {
    setShowBubble(!skipDialogs);
  }, []);

  useEffect(() => {
    if (showBubble) {
      setTimeout(() => {
        setCanPlay(true);
      }, 300);
    }

    return () => {
      setCanPlay(false);
    };
  }, [speech, showBubble]);

  return (
    <div className={showBubble ? "character-bubble" : "character-bubble hide-bubble"}>
      <div className="text-bubble">
        <div className="flex justify-end">
          <img src={charImg} className="charactor_1_img" onClick={onClickCharacter} style={{height: "200px", marginBottom: "-100px", marginRight: "30px", pointerEvents: "auto"}}/>
        </div>
        <div className="text-wrapper">
          <div className="name">{charName}</div>
          <div className="absolute mt-3 right-8 mb-1 text-white">
            <button
              data-tip="Hide"
              className="mr-2 pointer-events-auto tooltip"
              onClick={onClickMinimizedButton}
            >
              <FontAwesomeIcon icon={faMinusCircle} />
            </button>
            {!skipDialogs && (
              <button
                data-tip="Don't show again" 
                className="pointer-events-auto tooltip"
                onClick={onClickSkipDialogButton}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
            )}
            {skipDialogs && (
              <button
                data-tip="Show Speech"
                className="pointer-events-auto tooltip"
                onClick={onClickSkipRestoreButton}
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
            )}
          </div>
          <div className="speech">
            <Reveal canPlay={canPlay} ease={"cubic-bezier(0,0.4,0.4,1)"} duration={500}>
              <p className="speech-text">{speech}</p>
            </Reveal>
          </div>
          {(votingWalletConnected &&
            ["shell_voting", "shell_voted_already", "shell_voting_complete"].indexOf(
              props.speech
            ) !== -1) ||
          ["shell_voting", "shell_voted_already", "shell_voting_complete"].indexOf(props.speech) ===
            -1 ? (
            <Reveal canPlay={canPlay} ease={"cubic-bezier(0,0.4,0.4,1)"} duration={500}>
              <div className="buttons">
                <button
                  style={{ ...(trackCount === "second" ? { display: "block" } : {}) }}
                  className="btn character-btn"
                  id="btn-alt"
                  ref={btnAlt}
                  onClick={onClickAlt}
                >
                  {buttonAltText}
                </button>
                <button
                  className="btn character-btn"
                  id="btn-next"
                  ref={btnNext}
                  onClick={() => onClickNext()}
                >
                  {buttonNextText}
                </button>
              </div>
            </Reveal>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="character-container">
        <div className="character-wrap" ref={characterWrap}>
          <img
            src={charImg}
            className="character cursor-pointer pointer-events-auto"
            onClick={onClickCharacter}
          />
        </div>
      </div>
      <button className="btn character-container-round" onClick={onClickCharacter} style={{display: showBubble ? "none": "block"}}>
        <img src={charImg} className="character cursor-pointer" ref={characterImg} />
      </button>
    </div>
  );
};

export default CharacterSpeak;
