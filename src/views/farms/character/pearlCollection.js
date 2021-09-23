import { truncate } from "lodash";

export const pearlCollectSuccess = ({ updateCharacter, viewPearl }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlCollectSuccess.text",
    button: {
      text: "Show me!",
      alt: {
        action: "cb",
        destination: () => {
          // dismiss bubble and show modal
          updateCharacter({
            name: "al",
            action: null,
          });
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

export const pearlGenerateNew = ({ updateCharacter, gems }, depositClamCb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlGenerateNew.text",
    variables: { gems },
    button: {
      text: "Yes please",
      alt: {
        action: "cb",
        destination: () => {
          depositClamCb();
        },
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          sendClamToSaferoom({ updateCharacter, variant: 2 });
        },
      },
    },
  });
};

export const pearlGemPrompt = ({ updateCharacter, gems }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearlCollectGemprompt.text",
    variables: { gems },
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
      dismiss: true
    },
  });
};

export const pearlCollectProcessing = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.pearl_processing.text",
    button: {
      text: undefined,
    }
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
        destination: "/saferoom/clams",
      },
    },
  });
};
