import { ISLANDS_NAMES } from "../constants";

const defaultSetting = {
  [ISLANDS_NAMES.bank]: {
    azimuthAngle:  Math.PI / 4,
    polarAngle: 1.5,
    padding : undefined,
  },
  [ISLANDS_NAMES.lighthouse]: {
    azimuthAngle: Math.PI / 4,
    polarAngle: 1.5,
    padding : { paddingTop: -100, paddingLeft: -100, paddingBottom: -100, paddingRight: -100 }
  },
  [ISLANDS_NAMES.farm]: {
    azimuthAngle: 0,
    polarAngle: 1.4,
    padding : { paddingTop: -40, paddingLeft: -40, paddingBottom: -40, paddingRight: -40 },
  },
  [ISLANDS_NAMES.market]: {
    azimuthAngle: Math.PI / 2,
    polarAngle: 1.5,
    padding : { paddingTop: 0, paddingLeft: 0, paddingBottom: 0, paddingRight: 0 },
  },
  [ISLANDS_NAMES.vault]: {
    azimuthAngle: Math.PI / 5,
    polarAngle: 1.4,
    padding : { paddingTop: 0, paddingLeft: 0, paddingBottom: 0, paddingRight: 0 },
  },
}

export const fitModel = async (controls, models, islandName) => {
  const settings = defaultSetting[islandName];
  const model = models.find(({model}) => model.name === islandName);

  controls.rotatePolarTo(settings.polarAngle, true)
  controls.fitToBox(model.boundingBox, true, settings.padding);
  controls.rotateTo(settings.azimuthAngle, settings.polarAngle, true);
};
