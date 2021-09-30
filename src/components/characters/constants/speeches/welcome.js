export const WELCOME_SPEECH = {
  home: {
    welcome: {
      text: `Ahoy there, traveller! Welcome to Clam Island!`,
      dismiss: false,
      skip: false,
    },

    launch: {
      text: ({ date }) =>
        `You've come at a good time - the island will be open in ${date}! You will then be able to access the buildings.`,
    },

    launch_two: {
      text: `If you have won some Clams or Pearls that you haven't claimed yet, you will be able to get them from the Shop when the island opens. In the meantime, please feel free to look around!`,
    },

    dismiss: {
      text: ({ date }) => `Nice place, right? Only ${date} left till open time!`,
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
  },
};

export const WELCOME_BUTTONS = {
  home: {
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
  },
};
