export const CLAM_CLAIMERS_SPEECH = {
  clam_claimer_not_allowed: {
    first: {
      text: `Hi there, traveller! According to your wallet address, you didn't participate in our first presale and can't claim any Clams. If this is a mistake, try switching to a different wallet address.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    claimed: {
      text: `Welcome back, traveller! It looks like you have already claimed all of your Clams. If you want more Clams, please come back and buy more when the island is open!`,
      next: false,
      dismiss: false,
      skip: false,
    },
    congrats: {
      text: `Your claim was successfully processed! Let me just go fetch your Clam.`,
      next: "collection",
      dismiss: true,
      skip: false,
    },
  },

  clam_claimer: {
    welcome: {
      text: `Welcome, traveller! You'll need to connect your wallet before you can claim any Clams.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    welcome_connected: {
      text: `Welcome back, traveller! As promised, since you participated in my first presale, you are able to claim up to 4 additional Clams. Would you like to proceed?`,
      next: `claim`,
      dismiss: false,
      skip: false,
    },
    claim: {
      text: `Excellent. Please claim your Clams using the menu above. You can only claim one at a time.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },
    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    claimProcessing: {
      text: "Let me just go fetch your Clam. I'll just be a minute.",
    },

    collectionProcessing: {
      text: `One moment, just let me unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations on your claim! We send your collected clams directly to the Saferoom, so you can see them there.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    error: {
      text: `I'm sorry, something went wrong. Please try again.`,
      next: false,
      dismiss: false,
      skip: false,
    },
  },
};

export const CLAM_CLAIMERS_BUTTONS = {};
