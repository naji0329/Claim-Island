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
      text: `If you need more help, you can always check out the Infocenter, where Janet can give you more information and guidance. You can also take a tour with me any time using the tour icon on the bottom left.`,
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
      next: "No thanks, I'm good",
      alt: {
        action: "url_internal",
        destination: "/info",
        next: "fourth",
        text: "Go to Infocenter",
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
