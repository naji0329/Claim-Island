import React, { useEffect, useRef, useState } from 'react';

import {
    Button
} from 'reactstrap'

import Nacre from '../../assets/characters/captain_nacre.png';
import Al from '../../assets/characters/al.png';
import Tanja from '../../assets/characters/tanja.png';
import Diego from '../../assets/characters/diego.png';

import './index.css';

const CharacterSpeak = (props) => {
    const [charImg, setCharImg] = useState(Nacre);
    const [charName, setCharName] = useState('Captain Nacre');
    const [showBubble, setShowBubble] = useState(true);

    const onClick = (e) => {
        setShowBubble(false);
    };

    return (
        <div className={showBubble ? 'character-bubble' : 'character-bubble hide-bubble'}>
            <img src={charImg} className="character"/>
            <div className="text-bubble">
                <div className="name">{charName}</div>
                <div className="speech">
                    <p className="speech-text">
                        G'day, welcome to Clam Island!
                        The island isn't open yet so you can't go into any of the buildings,
                        but feel free to have a look around while we're here.
                    </p>
                </div>
                <Button className="btn" onClick={onClick}>OK</Button>
            </div>
        </div>
    );
};

export default CharacterSpeak;