import { truncate } from "lodash";

export const clamRarityAlreadyStaked = (updateCharacter, gem, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.clamRarityAlreadyStaked.text",
    variables: gem,
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
