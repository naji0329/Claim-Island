export const FARM_SPEECH = {
  farms: {
    welcome: {
      text: `Welcome to the Clam Farm! You can deposit your Clams here to produce Pearls, or check on the progress of Clams you have already deposited.`,
      dismiss: false,
      skip: true,
      hideable: true,
    },

    welcome_next: {
      text: ({ gem }) =>
        `It will just cost ${gem} $GEM to produce a Pearl, which is payable when you collect the produced Pearl. Remember that each Clam can only produce a specific number of Pearls before it dies!`,
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
      text: ({ gems }) =>
        `We require a deposit of ${gems} $GEM to produce the Pearl. The deposit will be consumed when a Pearl is produced. If you withdrew your Clam without producing a Pearl and without a refund of your deposit, then you won't need to pay the deposit again. Do you want to proceed?`,
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
    depositClamSuccess: {
      text: `Your clam has been deposited! You can choose to deposit another clam.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },
    pearlCollectGemprompt: {
      text: ({ pearlPrice }) =>
        `It costs ${pearlPrice} $GEM to collect the pearl. Do you want to proceed?`,
      next: `purchase`,
      dismiss: false,
      suppressSpeechBubble: false,
      skip: false,
    },
    legacyPearlCollectGemprompt: {
      text: ({ gems }) =>
        `Remember When you deposited your clam here you added ${gems} $GEM with it? So this $GEM will be spent now to collect the pearl. Do you want to proceed?`,
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
    pearlGenerateNewWarning: {
      text: `WARNING! This is the last Pearl that your Clam is able to produce. Producing the last Pearl will kill the Clam. This means you will no longer be able to harvest it for $SHELL, although dead Clams can still be traded as a regular NFT. Are you sure you want to continue?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
      hideable: false,
    },
    pearlGenerateNew: {
      text: `Great! Please wait while we process the deposit...`,
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
    },
    pearlNotEnoughGems: {
      text: `Hold on, it looks like you don’t have enough $GEM. You can purchase some from the Bank, then you can come back and deposit your Clam.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
      hideable: true,
    },
    pearl_processing: {
      text: `Alrighty, give me a moment, this is a delicate operation...`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    pearl_collect_ready_prompt: {
      text: `Aha, I can see a Pearl. Would you like to collect it?`,
      dismiss: false,
      skip: false,
      hideable: false,
    },

    pearl_collect_ready_prompt_cancel: {
      text: ` No worries, we will leave the Clam here for now, you can come back and collect it at any time. Please note that your Clam will not produce any more Pearls until you collect this one.`,
      dismiss: true,
      skip: false,
      hideable: false,
    },

    open_clam: {
      text: `Alrighty, let me open this Clam up for you. One moment please.`,
      next: false,
      dismiss: false,
      skip: false,
      hideable: false,
    },
    error: {
      text: `I'm sorry, something went wrong. Please try again.`,
      next: false,
      dismiss: false,
      skip: false,
      hideable: false,
    },
    refundDepositedGem: {
      text: "Do you want to refund your deposited $GEM? Choosing to refund your $GEM deposit will reset the Pearl production process, and you will lose 10% of the deposit.",
      dismiss: false,
      skip: false,
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
