import React, { useEffect, useState } from "react";
import { useAction } from "redux-zero/react";
import { useLocalStorage } from "react-use";

import Character from "components/characters/CharacterWrapper";
import { actions } from "store/redux";

import { GuidTourSpeechFlow, GuidTourCameraFlow } from "utils/guidTourFlow";
import { IS_GUIDED_TOUR_PASSED } from "constants/ui";

const updateCharacterAC = actions().updateCharacter;
const suppressSpeechBubbleAC = actions().suppressSpeechBubbleAction;

export const MapGuider = (props) => {
  const {
    controls,
    islandModels
  } = props;
  const [isGuideStarted, setIsGuideStarted] = useState(false);
  const updateCharacter = useAction(updateCharacterAC);
  const hideSpeechBubble = useAction(suppressSpeechBubbleAC);
  const [_, setIsGuidedTourPassed] = useLocalStorage(IS_GUIDED_TOUR_PASSED);
  const completeGuideTour = () => setIsGuidedTourPassed(true);

  useEffect(() => {
    if (controls && islandModels.length && !isGuideStarted) {
      const guide = GuidTourCameraFlow(controls, islandModels);
      setIsGuideStarted(true);
      const guidTourSpeechFlow = new GuidTourSpeechFlow(guide, updateCharacter, completeGuideTour, hideSpeechBubble);
      guidTourSpeechFlow.startTour();
    }
  }, [controls, islandModels]);

  return (
    <Character name="nacre" />
  );
}
