export const depositClamGemPrompt = ({ updateCharacter, gems, dismissModal }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.depositClamGemPrompt.text",
    variables: { gems },
    forceTop: true,
    button: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "al",
            action: undefined,
          });
          cb();
        },
      },
    },
    buttonAlt: {
      text: "No thanks",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "al",
            action: undefined,
          });
          dismissModal();
        },
      },
    },
  });
};

export const depositClamError = ({ updateCharacter, err }) => {
  updateCharacter({
    name: "al",
    action: "farms.depositClamError.text",
    variables: { errorMsg: err.message },
    button: {
      text: "Dismiss",
      dismiss: true,
    },
  });
};

export const depositClamGemDeny = ({ updateCharacter, err }) => {
  updateCharacter({
    name: "al",
    action: "farms.depositClamGemDisagree.text",
    button: {
      text: "OK",
      dismiss: true,
    },
  });
};

export const depositClamSuccess = ({ updateCharacter }) => {
  updateCharacter({
    name: "al",
    action: "farms.depositClamSuccess.text",
    button: {
      text: "OK",
      dismiss: true,
    },
  });
};
