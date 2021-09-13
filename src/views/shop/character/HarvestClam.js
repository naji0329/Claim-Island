const harvestClamInfo = () => ({
  text: "More Information",
  alt: {
    action: "cb",
    destination: () => {
      window.open(
        "https://clamisland.medium.com/clam-island-essential-visitors-guide-63f2a9984336",
        "_blank"
      );
    },
  },
});

export const harvestCongrats = ({ updateCharacter, setModalToShow }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_congrats.text",
    buttonAlt: {
      text: "Harvest Clams",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("harvest");
        },
      },
    },
    button: {
      text: "Buy Clams",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("buy");
        },
      },
    },
  });
};

export const harvestError = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_presale.error.text",
    button: {
      text: undefined,
    },
  });
};

export const harvestNoClamsAvailable = ({ updateCharacter, setModalToShow, hours }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_no_clams.text",
    variables: { incubationTime: hours },
    button: {
      text: "Buy Clams",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("buy");
        },
      },
    },
    buttonAlt: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
};

export const harvestChooseClams = ({ updateCharacter, setModalToShow }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_choose_clams.text",
    button: {
      text: "I want to buy Clams instead.",
      alt: {
        action: "cb",
        destination: () => {
          updateCharacter({
            name: "diego",
            action: null,
          });
          setModalToShow("buy");
        },
      },
    },
    buttonAlt: {
      text: "Back to Island",
      alt: {
        action: "internal",
        destination: "/",
      },
    },
  });
};

export const harvestClamSpeak = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_warn.text",
    button: harvestClamInfo(),
    buttonAlt: {
      text: "Yes",
      alt: {
        action: "cb",
        destination: () => {
          cb();
        },
      },
    },
  });
};
