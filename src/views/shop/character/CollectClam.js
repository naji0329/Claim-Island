import { truncate } from "lodash";

export const collectClamReady = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.collection.text",
    button: {
      text: "Ok",
      dismiss: truncate,
    },
  });
};

export const collectClamProcessing = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.collection_processing.text",
    button: {
      text: undefined,
    },
  });
};

export const collectClamError = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_presale.error.text",
    button: {
      text: undefined,
    },
  });
};

export const btnHarvestClams = ({ updateCharacter, setModalToShow }) => {
  return {
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
  };
};

export const btnBuyClams = ({ updateCharacter, setModalToShow }) => {
  return {
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
  };
};

export const collectClamSuccess = ({ updateCharacter, setModalToShow }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.collect_congrats.text",
    buttonAlt: btnHarvestClams({ updateCharacter, setModalToShow }),
    button: btnBuyClams({ updateCharacter, setModalToShow }),
  });
};
