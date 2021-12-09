import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import { Reveal } from "react-text-reveal";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faTimesCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import { SPEECHES, CHARACTERS } from "./constants";
import { withSkipDialog } from "../../hoc/withSkipDialog";
import { actions } from "../../store/redux";

import "./index.scss";

// button => obj {text, alt}

const CharacterWrapper = ({
  name,
  action,
  variables,
  button,
  buttonAlt,
  onClickButton,
  suppressSpeechBubble,
  onClickSkipDialogButton,
  onClickSkipRestoreButton,
  skipDialogs,
  forceTop,
  suppressSpeechBubbleAction,
  loading,
}) => {
  const character = get(CHARACTERS, name);
  let speech = get(SPEECHES, action, action);
  if (speech && typeof speech !== "string") {
    speech = variables ? speech(variables) : speech({});
  }
  const actionPath = action ? action.replace(/\.text$/, "") : "";
  const isNeedSkipDialog = get(SPEECHES, `${actionPath}.skip`, false);
  const isDialogHideable = get(SPEECHES, `${actionPath}.hideable`, false);

  const [showBubble, setShowBubble] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const [stateSpeech, setStateSpeech] = useState();

  let history = useHistory();

  const handleClickButton = (button) => {
    if (button) {
      handleButtonCallback(button);
      if (button.dismiss || (button.alt && button.alt.dismiss === true)) {
        setShowBubble(false);
      }
      if (button.next) {
        const speech = get(SPEECHES, button.next, button.next);
        setStateSpeech(speech);
      }
      if (onClickButton) {
        onClickButton();
      }
    }
  };

  const handleButtonCallback = (button) => {
    if (button.alt && button.alt.dismiss === true) {
      setShowBubble(false);
    }

    switch (get(button, "alt.action", "")) {
      case "url":
        window.open(button.alt.destination, "_blank");
        break;

      case "internal":
        history.push(button.alt.destination);
        break;

      case "speech":
        setStateSpeech(button.alt.destination);
        break;

      case "cb":
        const callback = button.alt.destination;
        callback();
        break;
      case "internalWithCallback":
        button.alt.cb();
        history.push(button.alt.destination);
        break;
    }
  };

  const handleClickCharacter = () => {
    suppressSpeechBubbleAction(showBubble);
  };

  const onClickMinimizedButton = () => {
    suppressSpeechBubbleAction(true);
  };

  useEffect(() => {
    if (suppressSpeechBubble) {
      setShowBubble(false);
    } else {
      setShowBubble(!!action);
    }
  }, [action, suppressSpeechBubble]);

  useEffect(() => {
    if (isNeedSkipDialog && skipDialogs) {
      suppressSpeechBubbleAction(true);
    }
  }, [isNeedSkipDialog, actionPath]);

  useEffect(() => {
    if (!loading && showBubble) {
      setTimeout(() => {
        setCanPlay(true);
      }, 300);
    }
  }, [action, loading, showBubble]);

  useEffect(() => {
    if (loading || !showBubble) {
      setCanPlay(false);
    }
  }, [loading, showBubble]);

  return (
    <div
      className={classNames(
        "flex-1 min-h-full min-w-full md:flex items-center ",
        { "z-30": showBubble },
        { "z-0": !showBubble }
      )}
    >
      <div
        className={
          showBubble
            ? "character-bubble fixed z-999 bottom-8 pointer-events-none w-screen"
            : "character-bubble hide-bubble fixed justify-end"
        }
        style={{ zIndex: forceTop ? 9999 : speech ? undefined : 0 }}
      >
        {speech && (
          <div className="text-bubble flex-col justify-end pointer-events-none">
            <div className="text-wrapper">
              <div className="name px-10">{character.name}</div>
              <div className="speech">
                <div className="speech-text">
                  <Reveal canPlay={canPlay} ease={"cubic-bezier(0,0.4,0.4,1)"} duration={500}>
                    {stateSpeech ? stateSpeech : speech}
                  </Reveal>
                </div>
              </div>
              <Reveal canPlay={canPlay} ease={"cubic-bezier(0,0.4,0.4,1)"} duration={500}>
                <div className="buttons">
                  {button.text && (
                    <button
                      className="btn character-btn"
                      id="btn-next"
                      onClick={() => {
                        setCanPlay(false);
                        button.alt ? handleButtonCallback(button) : handleClickButton(button);
                      }}
                    >
                      {button.text}
                    </button>
                  )}
                  {buttonAlt && buttonAlt.text && (
                    <button
                      className="btn character-btn"
                      onClick={() => {
                        setCanPlay(false);
                        buttonAlt.alt
                          ? handleButtonCallback(buttonAlt)
                          : handleClickButton(buttonAlt);
                      }}
                    >
                      {buttonAlt.text}
                    </button>
                  )}
                </div>
              </Reveal>
              <div className="absolute mt-4 right-8 text-white">
                {isDialogHideable && (
                  <button
                    data-tip="Hide"
                    className="mr-2 pointer-events-auto tooltip"
                    onClick={onClickMinimizedButton}
                  >
                    <FontAwesomeIcon icon={faMinusCircle} />
                  </button>
                )}
                {isNeedSkipDialog && !skipDialogs && (
                  <button
                    data-tip="Don't show again"
                    className="pointer-events-auto tooltip"
                    onClick={onClickSkipDialogButton}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>
                )}
                {isNeedSkipDialog && skipDialogs && (
                  <button
                    data-tip="Show Speech"
                    className="pointer-events-auto tooltip"
                    onClick={onClickSkipRestoreButton}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="character-container flex items-end">
          <img
            className="max-h-full cursor-pointer pointer-events-auto"
            src={character.charImg}
            onClick={handleClickCharacter}
          />
        </div>
        <button className="btn character-container-round" onClick={handleClickCharacter}>
          <img src={character.charImg} className="character" />
        </button>
      </div>
    </div>
  );
};

const mapToProps = ({
  character: {
    name,
    action,
    variables,
    button,
    buttonAlt,
    suppressSpeechBubble,
    skipDialogs,
    forceTop,
  },
}) => ({
  name,
  action,
  variables,
  button,
  buttonAlt,
  suppressSpeechBubble,
  skipDialogs,
  forceTop,
});

const mapDispatchToProps = () => ({
  updateCharacter: actions().updateCharacter,
  suppressSpeechBubbleAction: actions().suppressSpeechBubbleAction,
});

export default connect(mapToProps, mapDispatchToProps)(withSkipDialog(CharacterWrapper));
