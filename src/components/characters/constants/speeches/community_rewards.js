export const COMMUNITY_REWARDS_SPEECH = {
  community_rewards_not_allowed: {
    first: {
      text: `Hi there, traveller! According to your wallet address, you claim any rewards. If this is a mistake, try switching to a different wallet address.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    claimed: {
      text: `Welcome, traveller! It looks like you cannot claim any rewards. If you want to buy Clams, please buy it by going to the shop on from the island`,
      next: false,
      dismiss: false,
      skip: false,
    },
    congrats: {
      text: `Your claim was successfully processed! Let me just go fetch your rewards.`,
      next: "collection",
      dismiss: true,
      skip: false,
    },
  },

  community_rewards: {
    welcome: {
      text: `Welcome, traveller! You'll need to connect your wallet before you can claim any rewards.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    welcome_connected: {
      text: `Welcome back, traveller! As promised, you are able to claim a rewards. Would you like to proceed?`,
      next: `claim`,
      dismiss: false,
      skip: false,
    },
    claim: {
      text: `Excellent. Please claim your reward using the menu above. Each awarded address can only claim one reward. If you have already claimed, you can see your reward in the Safe Room.`,
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
      text: `Your Reward is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    claimProcessing: {
      text: "Let me just go fetch your reward. I'll just be a minute.",
    },

    collectionProcessing: {
      text: `One moment, just let me unbox this rewards for you. Did you know that no one knows what reward is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations on your claim! We send your collected reward directly to the Saferoom, so you can see them there.`,
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

export const COMMUNITY_REWARDS_BUTTONS = {};
