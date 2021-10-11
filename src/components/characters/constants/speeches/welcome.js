export const WELCOME_SPEECH = {
  welcome: {
    welcome: {
      text: `G'day, welcome to Clam Island!`,
      next: "first",
      dismiss: false,
      skip: false,
    },
    first: {
      text: `If it's your first time here, I'd recommend you go to the Bank to get some $GEM, the local currency. You can then buy some Clams in the Shop with your $GEM, and produce Pearls using the Clams in the Farm.`,
      next: "second",
      dismiss: false,
      skip: false,
    },
    second: {
      text: `We also have a Pearl Hunt Event on right now - if you produce the right type of Pearl, you could win a Tiffany & Co Necklace worth up to $10,000! Would you like to find out more about this event?`,
      next: "third",
      dismiss: false,
      skip: false,
    },
    third: {
      text: `Ok, no worries, I'll let you explore the island at your own leisure.`,
      next: "fourth",
      dismiss: true,
      skip: false,
    },
    fourth: {
      text: `Pretty cool, right? Did you want to go check out the Bank now, or do you want to keep looking around?`,
      next: "third",
      dismiss: false,
      skip: false,
    },
  },
};

export const WELCOME_BUTTONS = {
  welcome: {
    welcome: {
      next: "▶",
      alt: false,
    },
    first: {
      next: "Good to know!",
      alt: false,
    },
    second: {
      next: "No thanks",
      alt: {
        action: "url",
        destination: "https://clamisland.medium.com/announcing-the-clam-island-pearl-hunt-event-e980c7b8f2eb",
        next: "fourth",
        text: "Yes please",
      },
    },
    third: {
      next: "Ok",
      alt: false,
    },
    fourth: {
      next: "Keep exploring",
      alt: {
        action: "url_internal",
        destination: "/bank",
        text: "Ok, let's go",
      },
    },
  },
};
