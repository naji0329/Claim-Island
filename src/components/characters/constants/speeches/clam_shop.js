export const CLAM_SHOP_SPEECH = {
  clam_shop: {
    welcome: {
      text: `Howdy friend. Welcome to my Clam Shop! Here you can buy Clams using $GEM and harvest them for $SHELL. Let's get to it!`,
      next: "connect",
      dismiss: false,
      skip: false,
    },
    connect: {
      text: `Oh I've noticed that you've not connected your blockchain wallet yet. Before you can buy or trade any Clams, you need to enable that...`,
      next: false,
      dismiss: false,
      skip: false,
    },
    collect: {
      text: `Looks like you still have a clam to collect from last time you visited. Please do so before you proceed.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    collection_processing: {
      text: `One moment, just let me unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    collect_congrats: {
      text: `Congrats on your Clam! You can take your time to savour your luck. We send your collected clams directly to the Saferoom, so you can see them there.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },

    congrats: {
      text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
      next: "collection",
      dismiss: true,
      skip: false,
    },

    choose_path: {
      text: `So, friend, how can I help you today?`,
      next: false,
      dismiss: false,
      skip: false,
    },
    harvest_warn: {
      text: `WARNING!!! This action will destroy your Clam for $SHELL tokens and it is not reversible. Click proceed to finish harvesting your chosen Clam.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    harvest_congrats: {
      text: `Big Decision. We have added $SHELL to your wallet`,
      next: false,
      dismiss: true,
      skip: false,
    },
  }
};


export const CLAM_SHOP_BUTTONS = {
  clam_shop: {
    welcome: {
      next: "Let's go!",
      alt: false,
    },
  }
};