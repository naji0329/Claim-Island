import { truncate } from "lodash";

export const pearlCollectSuccess = ({ updateCharacter, gems, setModalToShow }, depositClamCb) => {
  updateCharacter({
    name: "al",
    action: "clam_shop.pearlCollectSuccess.text",
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
          setModalToShow("pearl");
        }
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          pearlSendToSaferoom({ updateCharacter, gems }, depositClamCb);
        }
      },
    },
  });
};

export const pearlSendToSaferoom = ({ updateCharacter, gems }, depositClamCb) => {
  updateCharacter({
    name: "al",
    action: "clam_shop.pearlSendSaferoom.text",
    button: {
      text: "Sure",
      alt: {
        action: "cb",
        destination: () => {
          pearlGenerateNew({ updateCharacter, gems }, depositClamCb)
        }
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          sendClamToSaferoom({ updateCharacter, variant: 1 });
        }
      },
    },
  });
};

export const pearlGenerateNew = ({ updateCharacter, gems }, depositClamCb) => {
  updateCharacter({
    name: "al",
    action: "clam_shop.pearlGenerateNew.text",
    variables: { gems },
    button: {
      text: "Yes please",
      alt: {
        action: "cb",
        destination: () => { depositClamCb(); }
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          sendClamToSaferoom({ updateCharacter, variant: 2 });
        }
      },
    },
  });
};

export const sendClamToSaferoom = ({ updateCharacter, variant }) => {
  updateCharacter({
    name: "al",
    action: `clam_shop.pearlSendClamSaferoom${variant}.text`,
    button: {
      text: "OK",
      dismiss: truncate,
    },
    buttonAlt: {
      text: "Go to Saferoom",
      alt: {
        action: "internal",
        destination: "/saferoom/clams",
      }
    },
  });
};