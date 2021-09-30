export const WELCOME_SPEECH = {
  welcome: {
    welcome: {
      text: `G'day, welcome to Clam Island!`,
      next: "first",
      dismiss: false,
      skip: false,
    },
    first: {
      text: `The island is open. Note that if you have clams or pearls, you can go see them in the Saferoom.`,
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
        destination: "/saferoom/clams",
        text: "Go to Saferoom",
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