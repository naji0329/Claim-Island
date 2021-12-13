import { truncate } from "lodash";
import { speechWelcomeNext } from "./WithdrawClam";

const dismissCharacter = (updateCharacter) => {
  // dismiss bubble and show modal
  updateCharacter({
    name: "al",
    action: null,
  });
};

export const pearlCollectSuccess = ({ updateCharacter, viewPearl }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlCollectSuccess.text",
    button: {
      text: "Show me!",
      alt: {
        action: "cb",
        destination: () => {
          dismissCharacter(updateCharacter);
          if (viewPearl) viewPearl();
        },
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
  });
};

export const pearlSendToSaferoom = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlSendSaferoom.text",
    button: {
      text: "Sure",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          sendClamToSaferoom({ updateCharacter, variant: 1 });
        },
      },
    },
  });
};

export const pearlGenerateNew = ({ updateCharacter }) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlGenerateNew.text",
    button: {
      text: undefined,
    },
  });
};

export const pearlNotEnoughGems = ({ updateCharacter, gems }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlNotEnoughGems.text",
    variables: { gems },
    button: {
      text: "Go to Bank",
      alt: {
        action: "internal",
        destination: "/bank",
      },
    },
  });
};

export const pearlGemPrompt = ({ updateCharacter, pearlPrice, gems }, cb) => {
  updateCharacter({
    name: "al",
    action: gems ? "farms.legacyPearlCollectGemprompt.text" : "farms.pearlCollectGemprompt.text",
    suppressSpeechBubble: false,
    variables: { pearlPrice, gems },
    button: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          speechWelcomeNext({ updateCharacter, gem: pearlPrice, suppressSpeechBubble: true });
        },
      },
    },
  });
};

export const pearlCollectReadyPrompt = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearl_collect_ready_prompt.text",
    button: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "Not yet",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "al",
            action: "farms.pearl_collect_ready_prompt_cancel.text",
            button: {
              text: "Ok",
              dismiss: true,
            },
          });
        },
      },
    },
  });
};

export const pearlCollectProcessing = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearl_processing.text",
    button: {
      text: undefined,
    },
  });
};

export const pearlOpenClam = ({ updateCharacter }) => {
  updateCharacter({
    name: "al",
    action: "farms.open_clam.text",
    button: {
      text: undefined,
    },
  });
};

export const pearlError = ({ updateCharacter }) => {
  updateCharacter({
    name: "al",
    action: "farms.error.text",
    button: {
      text: undefined,
    },
  });
};

export const sendClamToSaferoom = ({ updateCharacter, variant }) => {
  updateCharacter({
    name: "al",
    action: `farms.pearlSendClamSaferoom${variant}.text`,
    button: {
      text: "OK",
      dismiss: truncate,
    },
    buttonAlt: {
      text: "Go to Saferoom",
      alt: {
        action: "internal",
        destination: "/saferoom/clam",
      },
    },
  });
};
