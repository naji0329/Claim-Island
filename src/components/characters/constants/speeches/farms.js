export const FARM_SPEECH = {
  farms: {
    welcome: {
      text: `Hello There! Welcome to the place where you can farm pearls.`,
      dismiss: true,
      skip: true,
      hideable: true,
    },
    connect: {
      text: `Excellent! First, let's get your wallet connected. You will need to do this in order to see your Clams. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    withdraw: {
      text: `This will stop the Pearl production process! But you can continue later without starting from scratch. Do you want to continue?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    pearlCollectSuccess: {
      text: `Your Pearl has been successfully collected! Would you like to see it now?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
      hideable: true,
    },
    pearlSendSaferoom: {
      text: ({ gems }) =>
        `We will send your Pearl to the Saferoom. You can have your Clam back as well. Would you like to deposit it again to produce another Pearl?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
      hideable: true,
    },
    pearlGenerateNew: {
      text: ({ gems }) =>
        `Great! you will just need to pay ${gems} $GEM to produce another Pearl. Do you want to continue?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    pearlSendClamSaferoom1: {
      text: `Ok, your Clam will be returned to your Saferoom.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
      hideable: true,
    },
    pearlSendClamSaferoom2: {
      text: `No problem, we will send your Clam back to the Saferoom.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
      hideable: true,
    },
    clamRarityAlreadyStaked: {
      text: (gem) =>
        `You already have a Clam with the same rarity tier in the farm. Depositing this Clam will mean that you permanently lose the $GEM boost of ${gem} associated with it. Are you sure you want to continue?`,
      next: `deposit`,
      dismiss: false,
      skip: false,
      hideable: true,
    },
  },
};

export const FARM_BUTTONS = {
  farms: {
    withdraw: {
      next: "Withdraw Pearl",
      alt: {
        action: "url",
        destination: "/saferoom",
        text: "Go to Saferoom",
      },
    },
  },
};
