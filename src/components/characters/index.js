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

    console.log(speechTrack);
    console.log(btnTrack);

    const [charImg, setCharImg] = useState(character.charImg);
    const [charName, setCharName] = useState(character.name);
    const [showBubble, setShowBubble] = useState(true);
    const [trackCount, setTrackCount] = useState(Object.keys(speechTrack)[0]);
    console.log(trackCount);

    const [speech, setSpeech] = useState(speechTrack[trackCount].text);
    const [buttonNextText, setButtonNextText] = useState(btnTrack[trackCount].next);
    const [buttonAltText, setButtonAltText] = useState(btnTrack[trackCount].alt.text);



    const onClickNext = (e) => {
        let timeOut = 0;
        if(speechTrack[trackCount].dismiss) {
          setShowBubble(false);
          document.querySelector('.character').style.marginTop = document.querySelector('.character').offsetHeight - 76 + "px";
          document.querySelector('.character-wrap .character').style.pointerEvents = "auto";
          document.querySelector('.character-wrap .character').style.cursor = "pointer";
          timeOut = 1000;
        }
        if(speechTrack[trackCount].next) {
          setTimeout(function(){
            setSpeech(speechTrack[speechTrack[trackCount].next].text);
            setTrackCount(speechTrack[trackCount].next);
            console.log(trackCount);
            if(btnTrack[speechTrack[trackCount].next].next) {
              document.querySelector('#btn-next').style.display = 'block';
              setButtonNextText(btnTrack[speechTrack[trackCount].next].next);
            } else {
              document.querySelector('#btn-next').style.display = 'none';
            }
            if(btnTrack[speechTrack[trackCount].next].alt) {
              document.querySelector('#btn-alt').style.display = 'block';
              setButtonAltText(btnTrack[speechTrack[trackCount].next].alt.text);
            } else {
              document.querySelector('#btn-alt').style.display = 'none';
            }
          }, timeOut)

        }

    };

    const onClickAlt = (e) => {
        let destination = btnTrack[trackCount].alt.destination;
        switch (btnTrack[trackCount].alt.action) {
          case "url":
            window.open(destination, '_blank');
            break;

          case "speech":
            setSpeech(speechTrack[destination].text);
            setTrackCount(destination);
            break;

          case "connectWallet_next":
            break;

        }

    };

    const onClickCharacter = (e) => {
      if(!showBubble) {
        setShowBubble(true);
      //setSpeech(speechTrack[trackCount+1]);
      //setButtonText(btnTrack[trackCount+1]);
      //const newCount = trackCount + 1;
      //setTrackCount(newCount);
        document.querySelector('.character-wrap .character').style.marginTop = "0px";
      } else {

      }
    }

    const onClickBubble = (e) => {
        setShowBubble(true);
        //setSpeech(speechTrack[trackCount+1]);
        //setButtonText(btnTrack[trackCount+1]);
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
                <div className="buttons">
                <Button className="btn" id="btn-alt" onClick={onClickAlt}>{buttonAltText}</Button>
                <Button className="btn" id="btn-next" onClick={onClickNext}>{buttonNextText}</Button>
                </div>
            </div>
        </div>
    );
};


export default CharacterSpeak;
