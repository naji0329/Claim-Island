import React, { useEffect, useState } from "react";
import { useAction } from "redux-zero/react";

import Character from "components/characters/CharacterWrapper";
import { actions } from "store/redux";

import { ISLANDS_NAMES } from "../constants";
import { fitModel } from "../utils/fitModel";
import { guideGreeting } from "utils/mapGuide";

const updateCharacterAC = actions().updateCharacter;

function* generator(controls, models) {
  controls.minPolarAngle = 1;
  controls.minDistance = 100;

  yield fitModel(controls, models, ISLANDS_NAMES.lighthouse);
  yield fitModel(controls, models, ISLANDS_NAMES.farm);
  yield fitModel(controls, models, ISLANDS_NAMES.bank);
  yield fitModel(controls, models, ISLANDS_NAMES.market);
  yield fitModel(controls, models, ISLANDS_NAMES.vault);
  controls.reset();
  controls.minDistance = 800;
  controls.maxDistance = 1500;
  controls.maxPolarAngle = 1.5;
  controls.minPolarAngle = 0;
}

export const MapGuider = (props) => {
  const {
    controls,
    islandModels
  } = props;
  const [isGuideStarted, setIsGuideStarted] = useState(false);
  const updateCharacter = useAction(updateCharacterAC);

  useEffect(() => {
    if (controls && islandModels.length && !isGuideStarted) {
      const guide = generator(controls, islandModels);
      setIsGuideStarted(true);
      guideGreeting(updateCharacter, guide)
    }
  }, [controls, islandModels]);

  return (
    <Character name="nacre" />
  );
}
