import { BUTTONS } from "../components/characters/constants";

export function guideGreeting(updateCharacter, guide) {
  updateCharacter({
    name: "nacre",
    action: "mapGuide.greeting.text",
    button: {
      text: BUTTONS.mapGuide.greeting.next,
      alt: {
        action: "cb",
        destination: () => {
          guide.next();
          guideInfoIsland(updateCharacter, guide);
        },
      },
    },
  });
}

function guideInfoIsland(updateCharacter, guide) {
  updateCharacter({
    name: "nacre",
    action: "mapGuide.infoIsland.text",
    button: {
      text: BUTTONS.mapGuide.nextIsland.next,
      alt: {
        action: "cb",
        destination: () => {
          guide.next();
          guideFarmIsland(updateCharacter, guide);
        },
      },
    },
  });
}

function guideFarmIsland(updateCharacter, guide) {
  updateCharacter({
    name: "nacre",
    action: "mapGuide.farmIsland.text",
    button: {
      text: BUTTONS.mapGuide.nextIsland.next,
      alt: {
        action: "cb",
        destination: () => {
          guide.next();
          guideBankIsland(updateCharacter, guide);
        },
      },
    },
  });
}

function guideBankIsland(updateCharacter, guide) {
  updateCharacter({
    name: "nacre",
    action: "mapGuide.bankIsland.text",
    button: {
      text: BUTTONS.mapGuide.nextIsland.next,
      alt: {
        action: "cb",
        destination: () => {
          guide.next();
          guideShopIsland(updateCharacter, guide);
        },
      },
    },
  });
}

function guideShopIsland(updateCharacter, guide) {
  updateCharacter({
    name: "nacre",
    action: "mapGuide.shopIsland.text",
    button: {
      text: BUTTONS.mapGuide.nextIsland.next,
      alt: {
        action: "cb",
        destination: () => {
          guide.next();
          guideSaferoomIsland(updateCharacter, guide);
        },
      },
    },
  });
}

function guideSaferoomIsland(updateCharacter, guide) {
  updateCharacter({
    name: "nacre",
    action: "mapGuide.saferoomIsland.text",
    button: {
      text: BUTTONS.mapGuide.nextIsland.next,
      alt: {
        action: "cb",
        destination: () => {
          guide.next();
          updateCharacter({
            suppressSpeechBubble: true,
          });
        },
      },
    },
  });
}
