import { BUTTONS } from "components/characters/constants";

export const guideUser = (updateCharacter) => {
  updateCharacter({
    name: "janet",
    action: "infocenter.guide.text",
    button: {
      text: BUTTONS.infocenter.guide.next,
      alt: {
        action: "url",
        destination:
          "https://clamisland.medium.com/clam-island-essential-visitors-guide-63f2a9984336",
      },
    },
    buttonAlt: {
      text: BUTTONS.infocenter.guide.alt,
      alt: {
        action: "url",
        destination: "https://www.youtube.com/watch?v=HJYNCk_GAHo",
      },
    },
  });
};

export const welcomeUser = (updateCharacter) => {
  updateCharacter({
    name: "janet",
    action: "infocenter.welcome.text",
    button: {
      text: BUTTONS.infocenter.welcome.next,
      alt: {
        action: "cb",
        destination: () => guideUser(updateCharacter),
      },
    },
  });
};
