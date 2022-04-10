export const CLAM_SHOP_SPEECH = {
  clam_shop: {
    welcome: {
      text: `Howdy friend. Welcome to my Clam Shop! Here you can buy Clams using $GEM and harvest them for $SHELL. Let's get into it then!`,
      next: "connect",
      dismiss: false,
      skip: true,
      hideable: true,
    },

    intro: {
      step1: {
        text: `Alright, so first of all, $GEM is the native currency here at Clam Island, so you need to buy or earn some $GEM before you can buy Clams. You can do this at the Bank, if you haven't checked it out already.`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step2: {
        text: `Once you have enough $GEM, you can come and buy a Clam from me. My Clams are always available at market prices depending on demand.`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step3: {
        text: `My Clams are very unique! There are billions of possible trait combinations and 6 different rarity tiers. What you will get when you buy a Clam is completely random - not even I know what it will be!`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step4: {
        text: `The Clams that you buy can be deposited over at the Farm in order to produce Pearls. Pearls also have billions of possible trait combinations and are grouped into the same 6 rarity tiers.`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step5: {
        text: `Each Clam can only produce a limited number of Pearls in its lifespan, and producing the very last Pearl will kill the Clam. Don't worry, dead Clams are still yours and still can be traded! But they can't produce any more Pearls, and they can't be harvested for $SHELL.`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step6: {
        text: `$SHELL is the Clam Island governance token. $SHELL supply can only be increased by harvesting live Clams that are older than 48 hours. The harvesting process will destroy your Clam, so choose wisely!`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step7: {
        text: `The amount of $SHELL for which a Clam can be harvested starts at 1, and increases by 0.1 for every new Pearl produced by the Clam that does not kill it.`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step8: {
        text: `However, Pearls produced by a Clam towards the end of its lifespan have a higher chance of being a rare one. So that last Pearl that will kill your Clam, also has the highest chance of being rare!`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step9: {
        text: `Now, to the really good part. I have a special arrangement with the Bank and the Farm, and that's what makes Clam Island so special. Pearls produced by a Clam can earn you $GEM, and every Clam you buy comes with a boost multiplier that gets applied to the $GEM yield for the Pearls that it produces!`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
      step10: {
        text: `The exact $GEM yield for each Pearl depend on its traits and the traits of the Clam that produced it, but on average a Pearl earns you about 4x of its production price in $GEM! This means that by buying my Clams and farming Pearls, not only will you own unique Clams and Pearls on Clam Island, you could also actually earn yield!`,
        next: "second",
        dismiss: false,
        skip: true,
        hideable: true,
      },
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
      skip: true,
      hideable: true,
    },

    collection_processing: {
      text: `One moment, just let me unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    collect_congrats: {
      text: `Congrats on your Clam! You can take your time to savour your luck. We send your collected clams directly to the Saferoom, so you can see them there. Can I help you with anything else?`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
      hideable: false,
    },

    congrats: {
      text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
      next: "collection",
      dismiss: true,
      skip: true,
      hideable: true,
    },

    choose_path: {
      text: `So, friend, how can I help you today?`,
      next: false,
      dismiss: false,
      skip: false,
      hideable: true,
    },

    harvest_warn: {
      text: `WARNING!! Harvesting a Clam will allow you to receive $SHELL tokens, but it will destroy your Clam permanently. Are you sure you want to continue?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    harvest_final_warn: {
      text: (shell) =>
        `WARNING!! You are about to harvest this Clam for ${shell} $SHELL. This process will destroy your Clam and is not reversible. Do you want to continue?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    harvest_no_clams: {
      text: (d) =>
        `I'm sorry, you don't have any Clams that can be harvested right now. New Clams need to be incubated for ${d.incubationTime} in the Saferoom before they can be harvested for $SHELL.`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    harvest_choose_clams: {
      text: `Please choose a Clam for harvesting.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    harvest_processing: {
      text: `One moment, let me just harvest your Clam for you. You might not want to watch, this ain't a pretty sight...`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    harvest_congrats: {
      text: (shell) =>
        `All done! Your Clam is no more. ${shell} $SHELL has been transferred to your wallet. Is there anything else that I can help you with?`,
      next: false,
      dismiss: true,
      skip: false,
      hideable: true,
    },

    can_use_vested: {
      text: (gem) =>
        `You have ${gem} locked $GEM rewards, would you like to use these for buying your clam?`,
      next: false,
      dismiss: false,
      skip: false,
    },
  },
};

export const CLAM_SHOP_BUTTONS = {
  clam_shop: {
    welcome: {
      next: "Let's go!",
      alt: false,
    },
  },
};
