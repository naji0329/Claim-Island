import { truncate } from "lodash";

export const withdrawClamSpeak = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.withdraw.text",
    show: true,
    button: {
      // text: undefined,
      text: "Withdraw",
      alt: {
        action: "cb",
        dismiss: true,
        destination: () => {
          cb();
        },
      },
    },
    buttonAlt: {
      text: "Cancel",
      alt: {
        action: "cb",
        dismiss: true,
        destination: () => {
          updateCharacter({
            name: "al",
            action: undefined,
          });
        },
      },
    },
  });
};

export const WelcomeUser = ({ updateCharacter, suppressSpeechBubble = false }) => {
  updateCharacter({
    name: "al",
    action: "farms.welcome.text",
    suppressSpeechBubble,
    button: {
      text: "Dismiss",
      dismiss: truncate,
    },
  });
};

export const speechWelcome = ({ updateCharacter }, cb) => {
  updateCharacter({
    name: "al",
    action: "farms.welcome.text",
    button: {
      text: "Cool!",
      alt: {
        action: "cb",
        dismiss: true,
        destination: () => {
          cb();
        },
      },
    },
  });
};

export const speechWelcomeNext = ({ updateCharacter, gem }) => {
  updateCharacter({
    name: "al",
    action: "farms.welcome_next.text",
    variables: { gem },
    button: {
      text: "Dismiss",
      dismiss: true,
    },
  });
};
