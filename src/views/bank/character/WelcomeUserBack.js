import { truncate } from "lodash";

const onHelpNeeded = (updateCharacter) => {
  const visitorGuideBtn = {
    text: "Read Visitor’s Guide",
    alt: {
      action: "cb",
      destination: () =>
        window.open(
          "https://clamisland.medium.com/clam-island-essential-visitors-guide-63f2a9984336",
          "_blank"
        ),
    },
  };

  // const infoCenterBtn = {
  //   text: "Go to Info Centre",
  //   alt: {
  //     action: "internal",
  //     destination: "/infoCenter",
  //   },
  // };

  // alternative while info center is not open
  const infoCenterBtn = {
    text: "OK",
    dismiss: true,
  };

  return () => {
    updateCharacter({
      name: "tanja",
      action: "bank.help_needed.text",
      button: visitorGuideBtn,
      buttonAlt: infoCenterBtn,
    });
  };
};

const infoCenter = (updateCharacter, suppressSpeechBubble) => {
  return () => {
    updateCharacter({
      name: "tanja",
      suppressSpeechBubble,
      action: "bank.acknowledge_no_help_needed.text",
      button: {
        text: "Ok",
        dismiss: truncate,
      },
    });
  };
};

export const WelcomeUserBack = ({ suppressSpeechBubble = false, updateCharacter }) => {
  updateCharacter({
    name: "tanja",
    action: "bank.welcome_back.text",
    suppressSpeechBubble,
    button: {
      text: "Yes Please",
      alt: {
        action: "cb",
        destination: onHelpNeeded(updateCharacter),
      },
    },
    buttonAlt: {
      text: "No Thanks",
      alt: {
        action: "cb",
        destination: infoCenter(updateCharacter, suppressSpeechBubble),
      },
    },
  });
};
