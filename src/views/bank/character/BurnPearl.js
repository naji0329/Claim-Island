import { formatMsToDuration } from "utils/time";
import { WelcomeUserBack } from "./WelcomeUserBack";

export const burnPearlConfirmation = (updateCharacter, gems, maxBoostIn, cb) => {
  updateCharacter({
    name: "tanja",
    action: maxBoostIn
      ? "bank.burn_pearl_without_max_gem_yield_confirmation.text"
      : "bank.burn_pearl_confirmation.text",
    variables: { gems, timer: formatMsToDuration(maxBoostIn) },
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
      alt: {
        action: "cb",
        destination: () => WelcomeUserBack({ updateCharacter, suppressSpeechBubble: true }),
      },
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
    variables: { fullReward },
    forceTop: true,
    button: {
      text: `Receive ${fullReward} GEM stream`,
      alt: {
        action: "cb",
        destination: () => {
          burnAndStream();
        },
      },
    },
    buttonAlt: {
      text: `Receive ${halfReward} GEM now`,
      alt: {
        action: "cb",
        destination: () => {
          burnAndForfeit();
        },
      },
    },
  });
};

export const onBurnPearlSuccess = (updateCharacter, forfeit, fullReward, halfReward) => {
  updateCharacter({
    name: "tanja",
    action: forfeit
      ? "bank.instant_burn_pearl_success.text"
      : "bank.stream_burn_pearl_success.text",
    variables: { fullReward, halfReward },
    button: {
      text: "OK",
      dismiss: true,
    },
  });
};
