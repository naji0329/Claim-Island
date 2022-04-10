export const SAFEROOM_SPEECH = {
  saferoom: {
    connect: {
      text: "Hi there, traveller, welcome to the Saferoom! You will need to connect your wallet to see the Clams and Pearls in your Safe. Alternatively, if you want to inspect a particular Clam or Pearl in the Saferoom or the Clam Farm, we can help you do that too.",
      dismiss: false,
      skip: false,
    },

    connected: {
      text: `Excellent, please follow the prompts above to purchase a Clam.`,
      next: `processing`,
      dismiss: false,
      skip: false,
    },

    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
      hideable: true,
    },

    congrats: {
      text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
      next: "collection",
      dismiss: true,
      skip: false,
      hideable: true,
    },

    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    collectionProcessing: {
      text: `One moment, just let me just unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    congratsCollection: {
      text: `Congratulations, here's your Clam! You may go to the Saferoom to see your Clam.`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    error: {
      text: `I'm sorry, something went wrong. Please try again.`,
      next: false,
      dismiss: false,
      skip: false,
      hideable: true,
    },

    cancel: {
      text: `Ok, let me know if you change your mind and want to buy some $CLAM.`,
      next: "purchase",
      dismiss: false,
      skip: false,
      hideable: true,
    },
  },
};

export const SAFEROOM_BUTTONS = {
  saferoom: {},
};
