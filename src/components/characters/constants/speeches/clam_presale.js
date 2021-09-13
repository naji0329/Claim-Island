const clamPresaleDate = () => "June 21 2021 13:00:00 GMT+0000";

const clamPresaleCountdown = () => {
  const total = Date.parse(clamPresaleDate()) - Date.parse(String(new Date()));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  let minutes = Math.floor((total / 1000 / 60) % 60);
  minutes > 9 ? minutes : "0" + minutes.toString();

  return `${days} days, ${hours} hours and ${minutes} minutes`;
};

export const CLAM_PRESALE_SPEECH = {
  clam_presale_not_started: {
    welcome: {
      text: `Welcome, traveller! My shop is not open yet, but I do have a batch of Clams that I can sell to you early. However, they won't arrive until ${clamPresaleDate()}, which is ${clamPresaleCountdown()} from now.`,
      next: false,
      dismiss: true,
      skip: false,
    },
  },

  clam_presale_finished: {
    welcome: {
      text: `Welcome, traveller!`,
      next: "first",
      dismiss: false,
      skip: false,
    },

    first: {
      text: `Sorry, you're a bit late! I did have some Clams available for presale, but they're all gone now.`,
      next: false,
      dismiss: false,
      skip: false,
    },
  },

  clam_presale: {
    welcome_notConnected: {
      text: `Welcome, traveller! My shop is not open yet, but I do have a batch of Clams that I can sell to you early. Due to limited stock, there's a limit of five Clams per customer. Would you like to buy one?`,
      next: `connect`,
      dismiss: false,
      skip: false,
    },

    notOpen: {
      text: `Welcome, traveller! You're early! Clam Island Shop isn't open yet.
        We are offering a limited presale of $CLAM tokens, but that presale opens at 9am UTC on 15 June 2021. Please come back then.`,
      next: false,
      dismiss: false,
      skip: false,
    },

    notice: {
      text: `Before you pull your wallet, I should let you know that we are currently having a 15 $CLAM (3 BNB) individual cap. Our presale hard cap is 2,000 $CLAM or 400 BNB. $SHELL is also not transferable until we open!`,
      next: `connect`,
      dismiss: false,
      skip: false,
    },

    connect: {
      text: `Excellent! First, let's get your wallet connected. You will need to do this in order to purchase a Clam. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },

    welcome_connected: {
      text: `Welcome, traveller! My shop is not open yet, but I do have a batch of Clams that I can sell to you early. Due to limited stock, there's a limit of five Clams per customer. Would you like to buy one?`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },

    purchase: {
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
    },

    congrats: {
      text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
      next: "collection",
      dismiss: true,
      skip: false,
    },

    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    collectionProcessing: {
      text: `One moment, just let me unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations on your purchase! We send your collected clams directly to the Saferoom, so you can see them there.`,
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

    cancel: {
      text: `Ok, let me know if you change your mind and want to buy some $CLAM.`,
      next: "purchase",
      dismiss: false,
      skip: false,
    },
  }
};

export const CLAM_PRESALE_BUTTONS = {
  clam_presale_not_started: {
    welcome: {
      next: "Ok",
      alt: {
        action: "url",
        destination: "/",
        text: "Exit shop",
      },
    },
  },

  clam_presale_finished: {
    welcome: {
      next: "▶",
      alt: false,
    },

    first: {
      next: "No thanks",
      alt: {
        action: "url",
        destination: "https://clamisland.medium.com/introducing-clam-island-ad424aba1733",
        text: "Sure!",
      },
    },

    second: {
      next: "OK",
      alt: false,
    },
  },

  clam_presale: {
    welcome: {
      next: "Sounds good!",
      alt: false,
    },

    notice: {
      next: "I understand",
      alt: {
        action: "url",
        destination: "https://clamisland.medium.com/clam-island-presale-30090591d4f",
        text: "More information",
      },
    },

    connect: {
      next: false,
      alt: false,
    },

    processing: {
      next: false,
      alt: false,
    },

    error: {
      next: false,
      alt: {
        action: "url",
        destination: "/",
        text: "Exit shop",
      },
    },

    purchase: {
      next: false,
      alt: {
        action: "speech",
        destination: "cancel",
        text: "Cancel",
      },
    },

    cancel: {
      next: `I'm ready to buy`,
      alt: {
        action: "url",
        destination: "/",
        text: "Exit shop",
      },
    },

    notOpen: {
      next: false,
      alt: {
        action: "url",
        destination: "/",
        text: "Exit shop",
      },
    },

    congrats: {
      next: "OK",
      alt: {
        action: "url",
        destination: "/",
        text: "Exit shop",
      },
    },

    congratsCollection: {
      next: "Buy more",
      alt: {
        action: "url",
        destination: "/saferoom",
        text: "Go to Saferoom",
      },
    },
  },
};
