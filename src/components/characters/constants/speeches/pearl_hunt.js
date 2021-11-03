export const PEARL_HUNT_SPEECH = {
  pearl_hunt: {
    welcome: {
      text: `Welcome, traveller! You'll need to connect your wallet before being able to participate in the pearl hunt.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    welcome_connected: {
      text: `Welcome to the Clam Island Pearl Hunt Event! With the right Pearl, you could win a Tiffany & Co pearl necklace worth up to $10,000!`,
      next: `claim`,
      dismiss: false,
      skip: false,
    },
    enter: {
      text: `You need to have a pearl with specific traits and colors to participate in the hunt.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    not_eligible: {
      text: `You don't appear to have any pearls with the eligible shape and body colour. You won't be able to submit an entry to the Pearl Hunt Event.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    add_tg_handle: {
      text: `We will also need your Telegram handle. A cryptographic hash of it will be stored on chain as part of your submission. This will allow us to verify you when claiming a winning entry without compromising your privacy. Please TRIPLE CHECK that you enter this information correctly - if you make a typographical error when submitting, we will NOT be able to make exceptions.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    winner: {
      text: `Congrats you won the pearl hunt competition! Please enter in contact with the team on Telegram or Discord.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },
    congrats: {
      text: `Your transaction was successfully processed! We will announce once the pearl hunt winner when the time comes.`,
      next: "collection",
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

export const PEARL_HUNT_BUTTONS = {};
