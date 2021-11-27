import { truncate } from "lodash";

export const burnPearlConfirmation = (updateCharacter, gems, cb) => {
  updateCharacter({
    name: "tanja",
    action: "bank.burn_pearl_confirmation.text",
    variables: { gems },
    forceTop: true,
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
      text: "No",
      dismiss: truncate,
    },
  });
};

export const forfeitPearlConfirmation = (
  updateCharacter,
  fullReward,
  halfReward,
  burnAndStream,
  burnAndForfeit
) => {
  updateCharacter({
    name: "tanja",
    action: "bank.forfeit_pearl.text",
    variables: { fullReward, halfReward },
    forceTop: true,
    button: {
      text: "Full, 30 days",
      alt: {
        action: "cb",
        destination: () => {
          burnAndStream();
        },
      },
    },
    buttonAlt: {
      text: "Half, now",
      alt: {
        action: "cb",
        destination: () => {
          burnAndForfeit();
        },
      },
    },
  });
};

export const onBurnPearlSuccess = (updateCharacter, forfeit) => {
  updateCharacter({
    name: "tanja",
    action: "bank.burn_pearl_success.text",
    variables: { forfeit },
    button: {
      text: "OK",
      dismiss: true,
    },
  });
};
