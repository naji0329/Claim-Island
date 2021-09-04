export const buyClamProcessing = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.processing.text",
    button: {
      text: undefined,
    },
  });
};

export const buyClamError = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_presale.error.text",
    button: {
      text: undefined,
    },
  });
};

export const buyClamSuccess = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.congrats.text",
    button: {
      text: undefined,
    },
  });
};