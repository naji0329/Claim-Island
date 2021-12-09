export const CLAM_SWAP_SPEECH = {
  clam_swap: {
    welcome: {
      text: `Welcome, traveller! You'll need to connect your wallet before you can swap any clams.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    no_legacy_clams: {
      text: `It seems that you don't have any old clams in your wallet.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    welcome_connected: {
      text: `Welcome back, traveller! As promised, you are able to swap an old clam for a new one. Would you like to proceed?`,
      next: `claim`,
      dismiss: false,
      skip: false,
    },
    claim: {
      text: `Excellent. Please select a clam using the menu above. You can only swap one clam at a time. Swapped clams will need to be collected in the shop after swapping.`,
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
      text: `Your clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    claimProcessing: {
      text: "Let me just go fetch your clam. I'll just be a minute.",
    },

    collectionProcessing: {
      text: `One moment, just let me unbox this clam for you. Did you know that no one knows what clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations on your claim! We send your collected clam directly to the Saferoom, so you can see them there.`,
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
