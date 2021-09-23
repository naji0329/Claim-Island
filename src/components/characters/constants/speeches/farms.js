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
    depositClamGemPrompt: {
      text: ({ gems }) => `We require a deposit of ${gems} $GEM to produce the Pearl. The deposit will be consumed when a Pearl is produced. Do you want to proceed?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    depositClamGemDisagree: {
      text: `OK. Let me know if you need anything.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    depositClamError: {
      text: ({ errorMsg }) => `There was an error depositing clams. Error -> ${errorMsg}`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    pearlCollectGemprompt: {
      text: ({ gems }) => `${gems} $GEM will be consumed to produce the pearl. Do you want to proceed?`,
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
    pearl_processing: {
      text: `One moment, just let me unbox this Pearl for you.`,
      next: false,
      dismiss: true,
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
