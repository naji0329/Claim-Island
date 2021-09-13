const showPresaleCountdown = () => {
  const total = Date.parse("Tue May 25 2021 09:00:00 GMT+0000") - Date.parse(String(new Date()));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((total / 1000 / 60) % 60);
  minutes > 9 ? minutes : "0" + minutes.toString();

  return `${hours} hours and ${minutes} minutes`;
};

export const SHELL_PRESALE_SPEECH = {
  shell_presale_not_started: {
    welcome: {
      text: `Welcome, traveller! You're early! $SHELL 2nd round of presale starts in ${showPresaleCountdown()}. Please check back in then.`,
      next: false,
      dismiss: true,
      skip: false,
    },
  },

  shell_presale_finished: {
    welcome: {
      text: `Welcome, traveller!`,
      next: "first",
      dismiss: false,
      skip: false,
    },

    first: {
      text: `Sorry, you're a bit late! the $SHELL presale has finished. But you can read more on Clam Island and what will happen here. Would you like that?`,
      next: "second",
      dismiss: false,
      skip: false,
    },

    second: {
      text: `Ok, let me know if you change your mind!`,
      next: "first",
      dismiss: true,
      skip: false,
    },
  },

  shell_presale: {
    welcome: {
      text: `Welcome, traveller! You're early! Clam Island Bank isn't open yet.
        But since you already made this trip here, I can offer you some $SHELL tokens ahead of our grand opening.
        How does that sound?`,
      next: `notice`,
      dismiss: false,
      skip: false,
    },

    notOpen: {
      text: `Welcome, traveller! You're early! Clam Island Bank isn't open yet.
        We are offering a limited presale of $SHELL tokens, but that presale opens at 9am UTC on 24 May 2021. Please come back then.`,
      next: false,
      dismiss: false,
      skip: false,
    },

    notice: {
      text: `Before you pull your wallet, I should let you know that we are currently having a 15 $SHELL (3 BNB) individual cap. Our presale hard cap is 2,000 $SHELL or 400 BNB. $SHELL is also not transferable until we open!`,
      next: `connect`,
      dismiss: false,
      skip: false,
    },

    connect: {
      text: `First, let's get your wallet connected. You will need to do this in order to purchase $SHELL. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: false,
    },

    purchase: {
      text: `Great! Now you can press "Buy Shell" in the top right of the screen to purchase $SHELL. Remember that you can buy a maximum of 15 $SHELL!`,
      next: `processing`,
      dismiss: false,
      skip: false,
    },

    processing: {
      text: `Please hold while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },

    congrats: {
      text: `Congratulations on being one of our first customers! You can see your $SHELL balance at the top right of the screen. Remember they are not transferable until Clam Island opens! We look forward to seeing you at the launch!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    error: {
      text: `I'm sorry, something seems to have gone wrong with your purchase. Please try again, or try contacting our support staff in <a href="https://t.me/clamisland">Telegram</a>.`,
      next: false,
      dismiss: false,
      skip: false,
    },

    cancel: {
      text: `Ok, let me know if you change your mind and want to buy some $SHELL.`,
      next: "purchase",
      dismiss: false,
      skip: false,
    },
  },
};

export const SHELL_PRESALE_BUTTONS = {
  shell_presale_not_started: {
    welcome: {
      next: "Ok",
      alt: {
        action: "url",
        destination: "/",
        text: "Exit bank",
      },
    },
  },

  shell_presale_finished: {
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

  shell_presale: {
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
        text: "Exit bank",
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
        text: "Exit bank",
      },
    },

    notOpen: {
      next: false,
      alt: {
        action: "url",
        destination: "/",
        text: "Exit bank",
      },
    },

    congrats: {
      next: "OK",
      alt: {
        action: "url",
        destination: "/",
        text: "Exit bank",
      },
    },
  },
};
