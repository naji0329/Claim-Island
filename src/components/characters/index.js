import React, { useEffect, useRef, useState } from 'react';

import {
    Button
} from 'reactstrap'

import Nacre from '../../assets/characters/captain_nacre.png';
import Al from '../../assets/characters/al.png';
import Tanja from '../../assets/characters/tanja.png';
import Diego from '../../assets/characters/diego.png';

import './index.scss';


const SPEECHES = [
    `G'day, welcome to Clam Island!
    The island isn't open yet so you can't go into any of the buildings,
    but feel free to have a look around while we're here.`,
    `Nice place, isn't it? Not long before it opens now. I'll be sure to give you the inside scoop if I hear something.`

];

const CharacterSpeak = (props) => {
    const [charImg, setCharImg] = useState(Nacre);
    const [charName, setCharName] = useState('Captain Nacre');
    const [showBubble, setShowBubble] = useState(true);
    const [speech, setSpeech] = useState(SPEECHES[0]);

    const onClick = (e) => {
        setShowBubble(false);
        document.querySelector('.character').style.marginTop = document.querySelector('.character').offsetHeight - 76 + "px";
        document.querySelector('.character-wrap .character').style.pointerEvents = "auto";
        document.querySelector('.character-wrap .character').style.cursor = "pointer"
    };

    const onClickCharacter = (e) => {
      setShowBubble(true);
      setSpeech(SPEECHES[1]);
      document.querySelector('.character-wrap .character').style.marginTop = "0px";
    }

    const onClickBubble = (e) => {
        setShowBubble(true);
        setSpeech(SPEECHES[1]);
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
                <Button className="btn" onClick={onClick}>OK</Button>
            </div>
        </div>
    );
};


export default CharacterSpeak;
