import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { connect } from "redux-zero/react";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import { SPEECHES, CHARACTERS, BUTTONS } from "./constants";

import "./index.scss";

// button => obj {text, alt}
const CharacterWrapper = ({ name, action, button, onClickButton }) => {
  const character = get(CHARACTERS, name);
  const speech = get(SPEECHES, action, action);

  // console.log({ action, character, speech, button });

  const [showBubble, setShowBubble] = useState(true);
  const [stateSpeech, setStateSpeech] = useState();

  let history = useHistory();

  const handleClickButton = () => {
    const speech = get(SPEECHES, button.next, button.next);
    setStateSpeech(speech);
    if (speech.dismiss) {
      setShowBubble(false);
    }
    if (onClickButton) {
      onClickButton();
    }
  };

  const handleClickButtonAlt = (e) => {
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

  return (
    <div
      className={
        showBubble ? "character-bubble" : "character-bubble hide-bubble"
      }
    >
      <div className="character-container flex items-end cursor-pointer">
        <img
          className="max-h-full"
          src={character.charImg}
          onClick={handleClickCharacter}
        />
      </div>
      <Button
        className="btn character-container-round"
        onClick={handleClickCharacter}
      >
        <img src={character.charImg} className="character" />
      </Button>
      <div className="text-bubble">
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
            <Button
              className="btn"
              id="btn-next"
              onClick={button.alt ? handleClickButtonAlt : handleClickButton}
            >
              {button.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const mapToProps = ({ character: { name, action, button } }) => ({
  name,
  action,
  button,
});
export default connect(mapToProps)(CharacterWrapper);
