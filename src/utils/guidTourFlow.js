import { get } from "lodash";

import { BUTTONS } from "components/characters/constants";
import { fitModel } from "components/three/utils/fitModel";
import { ISLANDS_NAMES } from "components/three/constants";
import { CAMERA_SETTINGS } from "constants/ui/mapCameraSettings";

export function* GuidTourCameraFlow(controls, models) {
  controls.minPolarAngle = 1;
  controls.minDistance = 200;

  yield fitModel(controls, models, ISLANDS_NAMES.lighthouse);
  yield fitModel(controls, models, ISLANDS_NAMES.bank);
  yield fitModel(controls, models, ISLANDS_NAMES.market);
  yield fitModel(controls, models, ISLANDS_NAMES.vault);
  yield fitModel(controls, models, ISLANDS_NAMES.farm);
  controls.reset(true);
  controls.minDistance = CAMERA_SETTINGS.minDistance;
  controls.maxDistance = CAMERA_SETTINGS.maxDistance;
  controls.minPolarAngle = CAMERA_SETTINGS.minPolarAngle;
  controls.maxPolarAngle = CAMERA_SETTINGS.maxPolarAngle;
}

export class GuidTourSpeechFlow {
  constructor(mapController, updateCharacter, completeGuideTour, hideSpeechBubble) {
    this.mapController = mapController;
    this.updateCharacter = updateCharacter;
    this.completeGuideTour = completeGuideTour;
    this.hideSpeechBubble = hideSpeechBubble;
  }

  startTour() {
    localStorage.getItem("notFirstTime")
      ? this.updateCharacter({
          name: "nacre",
          action: "mapGuide.greeting_alt.text",
          button: {
            text: BUTTONS.mapGuide.greeting_alt.alt,
            alt: {
              action: "cb",
              destination: () => {
                this.step3();
              },
            },
          },
          buttonAlt: {
            text: BUTTONS.mapGuide.greeting_alt.next,
            alt: {
              action: "cb",
              destination: () => {
                this.step4();
              },
            },
          },
        })
      : this.updateCharacterDraft(this.step2, "greeting", false, "greeting");
  }

  step2 = () => {
    this.updateCharacter({
      name: "nacre",
      action: "mapGuide.step2.text",
      button: {
        text: BUTTONS.mapGuide.step2.alt,
        alt: {
          action: "cb",
          destination: () => {
            this.step3();
          },
        },
      },
      buttonAlt: {
        text: BUTTONS.mapGuide.step2.next,
        alt: {
          action: "cb",
          destination: () => {
            this.step4();
          },
        },
      },
    });
  };

  step3 = () => {
    this.updateCharacter({
      name: "nacre",
      action: "mapGuide.step3.text",
      button: {
        text: BUTTONS.mapGuide.step3.alt,
        alt: {
          action: "cb",
          destination: () => {
            this.completeGuideTour();
            this.hideSpeechBubble(true);
          },
        },
      },
      buttonAlt: {
        text: BUTTONS.mapGuide.step3.next,
        alt: {
          action: "internalWithCallback",
          destination: "/info",
          cb: () => {
            this.completeGuideTour();
          },
        },
      },
    });
    localStorage.setItem("notFirstTime", true);
  };

  step4 = () => {
    this.updateCharacterDraft(this.step5, "step4", true);
  };

  step5 = () => {
    this.updateCharacterDraft(this.step6, "step5");
  };

  step6 = () => {
    this.updateCharacterDraft(this.step7, "step6", true);
  };

  step7 = () => {
    this.updateCharacterDraft(this.step8, "step7");
  };

  step8 = () => {
    this.updateCharacterDraft(this.step9, "step8");
  };

  step9 = () => {
    this.updateCharacterDraft(this.step10, "step9", true);
  };

  step10 = () => {
    this.updateCharacterDraft(this.step11, "step10");
  };

  step11 = () => {
    this.updateCharacterDraft(this.step12, "step11");
  };

  step12 = () => {
    this.updateCharacterDraft(this.step13, "step12");
  };

  step13 = () => {
    this.updateCharacterDraft(this.step14, "step13", true);
  };

  step14 = () => {
    this.updateCharacterDraft(this.step15, "step14");
  };

  step15 = () => {
    this.updateCharacterDraft(this.step16, "step15", true);
  };

  step16 = () => {
    this.updateCharacterDraft(this.step17, "step16");
  };

  step17 = () => {
    this.updateCharacterDraft(this.step18, "step17");
  };

  step18 = () => {
    this.updateCharacterDraft(this.step19, "step18");
  };

  step19 = () => {
    this.updateCharacterDraft(this.step20, "step19", true);
  };

  step19 = () => {
    this.updateCharacter({
      name: "nacre",
      action: "mapGuide.step19.text",
      button: {
        text: BUTTONS.mapGuide.step19.alt,
        alt: {
          action: "url",
          destination:
            "https://clamisland.medium.com/clarification-on-the-clam-island-arcidae-update-7cdc44ea8991",
        },
      },
      buttonAlt: {
        text: BUTTONS.mapGuide.step19.next,
        alt: {
          action: "cb",
          destination: () => {
            this.step20();
            this.mapController.next();
          },
        },
      },
    });
  };

  step20 = () => {
    this.updateCharacterDraft(this.step21, "step20");
  };

  step21 = () => {
    this.updateCharacterDraft(this.lastStep, "step21", false, "step21");
  };

  lastStep = () => {
    this.hideSpeechBubble(true);
    this.completeGuideTour();
    localStorage.setItem("notFirstTime", true);
  };

  updateCharacterDraft(nextSpeech, action, isNeedControlMap, button = "nextStep") {
    this.updateCharacter({
      name: "nacre",
      action: `mapGuide.${action}.text`,
      button: {
        text: get(BUTTONS, ["mapGuide", button, "next"], ""),
        alt: {
          action: "cb",
          destination: () => {
            if (isNeedControlMap) {
              this.mapController.next();
            }
            nextSpeech();
          },
        },
      },
    });
  }
}
