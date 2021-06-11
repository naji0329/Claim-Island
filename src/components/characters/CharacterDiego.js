import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { connect } from "redux-zero/react";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import { SPEECHES, CHARACTERS, BUTTONS } from "./constants";

import "./index.scss";

// button => obj {text, alt}
const CharacterDiego = ({ action, button, onClickButton }) => {
  const character = get(CHARACTERS, "diego");
  const speech = get(SPEECHES, action, "");

  console.log({ action, character, speech, button });

  const [showBubble, setShowBubble] = useState(true);
  let history = useHistory();

  const handleClickButton = () => {
    setShowBubble(false);
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
        setSpeech(button.alt.destination);
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
      <div className="character-container">
        <div className="character-wrap flex items-end">
          <img
            src={character.charImg}
            className="character"
            onClick={handleClickCharacter}
          />
        </div>
      </div>
      <Button
        className="btn character-container-round"
        onClick={handleClickCharacter}
      >
        <img src={character.charImg} className="character" />
      </Button>
      <div className="text-bubble">
        <div className="name">{character.name}</div>
        <div className="speech">
          <p className="speech-text">{speech}</p>
        </div>
        {/* todo */}
        <div className="buttons">
          {button.alt ? (
            <Button className="btn" id="btn-alt" onClick={handleClickButtonAlt}>
              {button.text}
            </Button>
          ) : (
            <Button className="btn" id="btn-next" onClick={handleClickButton}>
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
export default connect(mapToProps)(CharacterDiego);
