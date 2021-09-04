export const FARM_SPEECH = {
  farms: {
    welcome: {
      text: `Hello There! Welcome to the place where you can farm pearls.`,
      dismiss: true,
    },
    connect: {
      text: `Excellent! First, let's get your wallet connected. You will need to do this in order to see your Clams. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: `purchase`,
    },
    withdraw: {
      text: `This will stop the Pearl production process! But you can continue later without starting from scratch. Do you want to continue?`,
      next: `purchase`,
      dismiss: false,
      skip: `purchase`,
    },
  }
};

export const FARM_BUTTONS = {
  farms: {
    withdraw: {
      next: "Withdraw Pearl",
      alt: {
        action: "url",
        destination: "/saferoom",
        text: "Go to Saferoom",
      },
    },
  }
};
