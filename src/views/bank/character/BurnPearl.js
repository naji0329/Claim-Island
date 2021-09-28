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

export const onBurnPearlSuccess = (updateCharacter) => {
  updateCharacter({
    name: "tanja",
    action: "bank.burn_pearl_success.text",
    button: {
      text: "OK",
      dismiss: true,
    },
  });
};
