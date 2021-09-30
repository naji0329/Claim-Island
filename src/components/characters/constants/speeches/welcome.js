export const WELCOME_SPEECH = {
  welcome: {
    welcome: {
      text: `G'day, welcome to Clam Island!`,
      next: "first",
      dismiss: false,
      skip: false,
    },
    first: {
      text: `Ahoy there, traveller! Welcome to Clam Island. We are now open - you can buy some Clams in the Shop, or go to the Bank to get $GEM and $SHELL tokens and to invest. If you need some help, try visiting Janet in the Infocenter.`,
      next: "second",
      dismiss: false,
      skip: false,
    },
    second: {
      text: `Ok, just let me know if you change your mind. In the meantime, feel free to look around.`,
      next: "third",
      dismiss: true,
      skip: false,
    },
    third: {
      text: `Nice place, right? Did you want to go check out the Saferoom now, or do you want to keep looking around?`,
      next: "second",
      dismiss: false,
      skip: false,
    },
  }
};

export const WELCOME_BUTTONS = {
  welcome: {
    welcome: {
      next: "▶",
      alt: false,
    },
    first: {
      next: "Explore Island",
      alt: {
        action: "url_internal",
        destination: "/info",
        text: "Go to Infocenter",
      },
    },
    second: {
      next: "OK",
      alt: false,
    },
    third: {
      next: "Keep Exploring",
      alt: {
        action: "url_internal",
        destination: "/saferoom/clams",
        text: "Go to Saferoom",
      },
    },
  }
};