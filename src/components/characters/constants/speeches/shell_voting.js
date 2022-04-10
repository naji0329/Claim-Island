export const SHELL_VOTING_SPEECH = {
  shell_voting_complete: {
    welcome: {
      text: `Welcome, traveller! Unfortunately you're rather late. $SHELL voting is over.`,
      next: "welcome",
      dismiss: true,
      skip: false,
    },
  },

  shell_voted_already: {
    welcome: {
      text: `Welcome, traveller! If you haven't done so already, Please connect your wallet to proceed.`,
      next: "first",
      dismiss: false,
      skip: false,
    },

    first: {
      text: `
        Looks like you already voted! Would you like to see the results?
      `,
      next: "last",
      showVote: true,
      dismiss: false,
      skip: false,
    },

    last: {
      text: `Thank you for your Vote. Here are the results.`,
      next: "first",
      dismiss: true,
      skip: false,
    },

    cancel: {
      text: `Thank you for your Vote. Here are the results.`,
      next: "first",
      dismiss: true,
      skip: false,
    },
  },

  shell_voting: {
    welcome: {
      text: `Welcome, traveller! If you haven't done so already, Please connect your wallet to proceed.`,
      next: "first",
      dismiss: false,
      skip: false,
    },

    first: {
      text: `
        Since some $SHELL presale buyers were wondering about the transfer lock,
        we thought that the fairest thing we could do is to let all the $SHELL presale
        token holders vote on the unlock time. We're all about democracy here at Clam Island!
      `,
      next: "second",
      dismiss: false,
      skip: false,
    },

    second: {
      text: `
      Please note, you can vote only once, and you must use the wallet address that holds the $SHELL from our presale. Each $SHELL you own will cast one vote.
      `,
      next: "vote",
      dismiss: false,
      skip: false,
    },

    vote: {
      text: `
        Please cast your vote above.
      `,
      next: "last",
      dismiss: false,
      skip: false,
    },

    error: {
      text: `
        Looks like something went wrong. Please try again.
      `,
      next: "vote",
      dismiss: false,
      skip: false,
    },

    progress: {
      text: `
        Vote in progress, please wait...
      `,
      next: "last",
      dismiss: false,
      skip: false,
    },

    cancel: {
      text: `
        OK, just let me know when you want to vote!
      `,
      next: "first",
      dismiss: true,
      skip: false,
    },

    last: {
      text: ` Thank you for you Vote. Here are the results.`,
      next: "first",
      dismiss: true,
      skip: false,
    },
  },
};

export const SHELL_VOTING_BUTTONS = {
  shell_voting_complete: {
    welcome: {
      next: "OK",
      alt: false,
    },
  },

  shell_voted_already: {
    welcome: {
      next: "▶",
      alt: false,
    },

    first: {
      next: "Sure",
      alt: false,
    },

    last: {
      next: "OK",
      alt: false,
    },
  },

  shell_voting: {
    welcome: {
      next: "▶",
      alt: false,
    },

    first: {
      next: "Sure",
      alt: false,
    },

    second: {
      next: "Got It",
      alt: false,
    },

    vote: {
      next: "Sure",
      alt: false,
    },

    error: {
      next: "OK",
      alt: false,
    },

    progress: {
      next: false,
      alt: false,
    },

    cancel: {
      next: "OK",
      alt: false,
    },

    last: {
      next: "OK",
      alt: false,
    },
  },
};
