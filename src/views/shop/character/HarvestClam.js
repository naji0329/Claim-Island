import { truncate } from "lodash";

const harvestWarning = () => ({
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

export const harvestCongrats = ({ updateCharacter }) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_congrats.text",
    button: {
      text: "Ok",
      dismiss: truncate,
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

export const harvestClamSpeak = (updateCharacter, cb) => {
  updateCharacter({
    name: "diego",
    action: "clam_shop.harvest_warn.text",
    button: harvestWarning(),
    buttonAlt: {
      text: "Proceed",
      alt: {
        action: "cb",
        destination: () => { cb(); }
      },
    },
  })
};