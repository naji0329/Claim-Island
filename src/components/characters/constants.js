import Nacre from "../../assets/characters/captain_nacre.png";
import Al from "../../assets/characters/al.png";
import Tanja from "../../assets/characters/tanja.png";
import Diego from "../../assets/characters/diego.png";

export const CHARACTERS = {
  nacre: {
    name: "Captain Nacre",
    charImg: Nacre,
  },
  diego: {
    name: "Diego",
    charImg: Diego,
  },
  tanja: {
    name: "Tanja",
    charImg: Tanja,
  },
  al: {
    name: "Al",
    charImg: Al,
  },
};

export const SPEECHES = {
  welcome: {
    welcome: {
      text: `G'day, welcome to Clam Island!`,
      next: "first",
      dismiss: false,
      skip: false,
    },
    first: {
      text: `The island isn't open yet, but Tanja just finished a presale for $SHELL tokens. I hear Diego will have some Clams available for presale soon...`,
      next: "second",
      dismiss: false,
      skip: false,
    },
    second: {
      text: `I'll be sure to let you know when that becomes available. In the meantime, feel free to look around. You won't be able to go inside any buildings though.`,
      next: "third",
      dismiss: true,
      skip: false,
    },
    third: {
      text: `Nice place, isn't it? Dunno about you, but I'm looking forward to the grand opening.`,
      next: false,
      dismiss: true,
      skip: false,
    },
  },

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
      skip: `purchase`,
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

  clam_presale_not_started: {
    welcome: {
      text: `Welcome, traveller! You're early! $CLAM 1st round of presale starts in ${clamPresaleCountdown()}. Please check back in then.`,
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
      text: `Sorry, you're a bit late! the $CLAM presale has finished. But you can read more on Clam Island and what will happen here. Would you like that?`,
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

  clam_presale: {
    welcome: {
      text: `Welcome, traveller! You're early! Clam Island Shop isn't open yet.
        But since you already made this trip here, I can offer you some $CLAM tokens ahead of our grand opening.
        How does that sound?`,
      next: `notice`,
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
      text: `First, let's get your wallet connected. You will need to do this in order to purchase $CLAM. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: `purchase`,
    },

    purchase: {
      text: `Great! Now you can press "Buy Shell" in the top right of the screen to purchase $CLAM. Remember that you can buy a maximum of 15 $SHELL!`,
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
      text: `Congratulations on being one of our first customers! You must now collect your $CLAM to reveal it!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    conllection: {
      text: `You Clam is ready for collection! Click in the button to send the transaction.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsConllection: {
      text: `You Got a CLAM! You can see your $CLAM balance at the top right of the screen. Remember they are not transferable until Clam Island opens!`,
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
      text: `Ok, let me know if you change your mind and want to buy some $CLAM.`,
      next: "purchase",
      dismiss: false,
      skip: false,
    },
  },
};

export const BUTTONS = {
  welcome: {
    welcome: {
      next: "▶",
      alt: false,
    },
    first: {
      next: "▶",
      alt: false,
    },
    second: {
      next: "OK",
      alt: false,
    },
    third: {
      next: "Keep exploring",
      alt: false,
    },
  },

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
        destination:
          "https://clamisland.medium.com/introducing-clam-island-ad424aba1733",
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
        destination:
          "https://clamisland.medium.com/clam-island-presale-30090591d4f",
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
        destination:
          "https://clamisland.medium.com/introducing-clam-island-ad424aba1733",
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
        destination:
          "https://clamisland.medium.com/clam-island-presale-30090591d4f",
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
  },
};

function showPresaleCountdown() {
  const total =
    Date.parse("Tue May 25 2021 09:00:00 GMT+0000") -
    Date.parse(String(new Date()));
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return `${hours} hours and ${
    minutes > 9 ? minutes : "0" + minutes.toString()
  } minutes`;
}

function clamPresaleCountdown() {
  const total =
    Date.parse("Tue June 18 2021 09:00:00 GMT+0000") -
    Date.parse(String(new Date()));
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours and ${
    minutes > 9 ? minutes : "0" + minutes.toString()
  } minutes`;
}
