import React, { useEffect, useRef, useState } from 'react';

import {
    Button
} from 'reactstrap';

import { SPEECHES, CHARACTERS, BUTTONS } from './constants';

import './index.scss';

const CharacterSpeak = (props) => {
    const character = CHARACTERS[props.character];
    const speechTrack = SPEECHES[props.speech];
    const btnTrack = BUTTONS[props.speech];

    const [charImg, setCharImg] = useState(character.charImg);
    const [charName, setCharName] = useState(character.name);
    const [showBubble, setShowBubble] = useState(true);
    const [trackCount, setTrackCount] = useState(0);

    const [speech, setSpeech] = useState(speechTrack[trackCount]);
    const [buttonText, setButtonText] = useState(btnTrack[trackCount]);

    const onClick = (e) => {
        setShowBubble(false);
        document.querySelector('.character').style.marginTop = document.querySelector('.character').offsetHeight - 76 + "px";
        document.querySelector('.character-wrap .character').style.pointerEvents = "auto";
        document.querySelector('.character-wrap .character').style.cursor = "pointer"
    };

    const onClickCharacter = (e) => {
      setShowBubble(true);
      setSpeech(speechTrack[trackCount+1]);
      setButtonText(btnTrack[trackCount+1]);
      const newCount = trackCount + 1;
      setTrackCount(newCount);
      document.querySelector('.character-wrap .character').style.marginTop = "0px";
    }

    const onClickBubble = (e) => {
        setShowBubble(true);
        setSpeech(speechTrack[trackCount+1]);
        setButtonText(btnTrack[trackCount+1]);
        const newCount = trackCount + 1;
        setTrackCount(newCount);
    };

    return (
        <div className={showBubble ? 'character-bubble' : 'character-bubble hide-bubble'}>
            <div className="character-container">
              <div className="character-wrap">
                <img src={charImg} className="character" onClick={onClickCharacter}/>
              </div>
            </div>
            <Button className="btn character-container-round" onClick={(e) => onClickBubble(e)}>
              <img src={charImg} className="character"/>
            </Button>
            <div className="text-bubble">
                <div className="name">{charName}</div>
                <div className="speech">
                    <p className="speech-text">{speech}</p>
                </div>
                <Button className="btn" onClick={onClick}>{buttonText}</Button>
            </div>
        </div>
    );
};


export default CharacterSpeak;
