import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { SPEECHES, CHARACTERS, BUTTONS } from "./constants";

import "./index.scss";

// button => obj {text, alt}
const CharacterWrapper = ({ name, action, button, buttonAlt, onClickButton }) => {
  const character = get(CHARACTERS, name);
  const speech = get(SPEECHES, action, action);

  // console.log({ action, character, speech, button });

  const [showBubble, setShowBubble] = useState(true);
  const [stateSpeech, setStateSpeech] = useState();

  let history = useHistory();

  const handleClickButton = (button) => {
    if (button.dismiss) {
      setShowBubble(false);
      return;
    }
    const speech = get(SPEECHES, button.next, button.next);
    setStateSpeech(speech);
    if (onClickButton) {
      onClickButton();
    }
  };

  const handleClickButtonAlt = (button) => {
    if (button.alt && button.alt.dismiss === true) {
      setShowBubble(false);
    }

    switch (button.alt.action) {
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
    console.log("handleClickCharacter", { showBubble });
    if (!showBubble) {
      setShowBubble(true);
      // document.querySelector(".character-wrap .character").style.marginTop =
      //   "22rem";
    } else {
      setShowBubble(false);
    }
  };

  useEffect(() => {
    setShowBubble(!!action);
  }, [action]);

  return (
    <div
      className={classNames(
        "flex-1 min-h-full min-w-full  md:flex items-center ",
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
                      button.alt ? handleClickButtonAlt(button) : handleClickButton(button)
                    }
                  >
                    {button.text}
                  </button>
                )}
                {buttonAlt && buttonAlt.text && (
                  <button
                    className="btn character-btn"
                    onClick={() =>
                      buttonAlt.alt ? handleClickButtonAlt(buttonAlt) : handleClickButton(buttonAlt)
                    }
                  >
                    {buttonAlt.text}
                  </button>
                )}
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

const mapToProps = ({ character: { name, action, button, buttonAlt } }) => ({
  name,
  action,
  button,
  buttonAlt,
});
export default connect(mapToProps)(CharacterWrapper);
