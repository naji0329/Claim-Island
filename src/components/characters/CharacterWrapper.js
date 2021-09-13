import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faTimes, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { SPEECHES, CHARACTERS, BUTTONS } from "./constants";
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
  skipDialogs,
}) => {
  const character = get(CHARACTERS, name);
  let speech = get(SPEECHES, action, action);
  if (speech && typeof speech !== 'string') {
    speech = variables ? speech(variables) : speech({});
  }
  const actionPath = action ? action.replace(/\.text$/, "") : "";
  const isNeedSkipDialog = get(SPEECHES, `${actionPath}.skip`, false);

  const [showBubble, setShowBubble] = useState(true);
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
    }
  };

  const handleClickCharacter = (e) => {
    setShowBubble(!showBubble);
  };

  const dismissCharacter = (e) => {
    setShowBubble(false);
  };

  const onClickMinimizedButton = () => {
    setShowBubble(false);
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
      setShowBubble(false);
    }
  }, [isNeedSkipDialog, actionPath]);

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
            ? "character-bubble fixed z-999 bottom-8 h-1/3 pointer-events-none w-screen"
            : "character-bubble h-1/3 hide-bubble fixed justify-end"
        }
        style={{ zIndex: speech ? undefined : 0 }}
      >
        {speech && (
          <div className="text-bubble flex-col justify-end pointer-events-none">
            <div className="text-wrapper">
              <div className="name px-10">{character.name}</div>
              <button className="close-btn" onClick={dismissCharacter}>
                <FontAwesomeIcon icon={faTimesCircle} className="ml-1" />
              </button>
              <div className="speech">
                <div
                  className="speech-text"
                  dangerouslySetInnerHTML={{
                    __html: stateSpeech ? stateSpeech : speech,
                  }}
                />
              </div>
              {/* todo */}
              <div className="buttons">
                {button.text && (
                  <button
                    className="btn character-btn"
                    id="btn-next"
                    onClick={() =>
                      button.alt ? handleButtonCallback(button) : handleClickButton(button)
                    }
                  >
                    {button.text}
                  </button>
                )}
                {buttonAlt && buttonAlt.text && (
                  <button
                    className="btn character-btn"
                    onClick={() =>
                      buttonAlt.alt ? handleButtonCallback(buttonAlt) : handleClickButton(buttonAlt)
                    }

                  >
                    {buttonAlt.text}
                  </button>
                )}
              </div>
              <div className="absolute top-4 right-8 text-white">
                <button className="mr-2 pointer-events-auto" onClick={onClickMinimizedButton}>
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button className="pointer-events-auto" onClick={onClickSkipDialogButton}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="character-container flex items-end">
          <img
            className="max-h-full cursor-pointer"
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

const mapToProps = ({ character: { name, action, variables, button, buttonAlt, suppressSpeechBubble, skipDialogs } }) => ({
  name,
  action,
  variables,
  button,
  buttonAlt,
  suppressSpeechBubble,
  skipDialogs,
});

const mapDispatchToProps = () => ({ updateCharacter: actions().updateCharacter });

export default connect(mapToProps, mapDispatchToProps)(withSkipDialog(CharacterWrapper));
