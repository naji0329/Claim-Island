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
      text: `The island is open. If you bought some from him, you can go see them in the Saferoom.`,
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

  bank: {
    connect: {
      text: "Welcome to Clam Island Bank! You’ll need to connect your wallet using the button on the top right of your screen in order to invest with us.",
      next: false,
      dismiss: true,
      skip: false,
    },
    connect_no_wallet: {
      text: "Welcome to Clam Island Bank! It looks like you don’t have a blockchain wallet installed. You will need one in order to invest with us.",
      next: false,
      dismiss: true,
      skip: false,
    },
    connect_wrong_chain: {
      text: "Welcome to Clam Island Bank! In order to invest with us, you will need to switch your wallet to Binance Smart Chain.",
      next: false,
      dismiss: true,
      skip: false,
    },
    welcome: {
      text: "Welcome back to Clam Island Bank! Please let me know if you need help with anything",
      next: false,
      dismiss: true,
      skip: false,
    },
    welcome_back: {
      text: "Hello again! Do you need my assistance?",
      next: false,
      dismiss: true,
      skip: false,
    },
    acknowledge_no_help_needed: {
      text: "No problem, happy investing! Just talk to me if you do need any help.",
      next: false,
      dismiss: true,
      skip: false,
    },
    help_needed: {
      text: "We are currently working on an explainer video, in the meantime please refer to our Visitor’s Guide. You can also find more information on the Clam Island ecosystem in general at the Visitor’s Information Centre.",
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
      text: `Welcome, traveller! My shop is not open yet, but I do have a batch of Clams that I can sell to you early. However, they won't arrive until ${clamPresaleDate()}, which is ${clamPresaleCountdown()} from now.`,
      next: false,
      dismiss: true,
      skip: false,
    },
  },

  clam_claimer_not_allowed: {
    first: {
      text: `Hi there, traveller! According to your wallet address, you didn't participate in our first presale and can't claim any Clams. If this is a mistake, try switching to a different wallet address.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    claimed: {
      text: `Welcome back, traveller! It looks like you have already claimed all of your Clams. If you want more Clams, please come back and buy more when the island is open!`,
      next: false,
      dismiss: false,
      skip: false,
    },
    congrats: {
      text: `Your claim was successfully processed! Let me just go fetch your Clam.`,
      next: "collection",
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
      text: `Sorry, you're a bit late! I did have some Clams available for presale, but they're all gone now.`,
      next: false,
      dismiss: false,
      skip: false,
    },
  },

  clam_claimer: {
    welcome: {
      text: `Welcome, traveller! You'll need to connect your wallet before you can claim any Clams.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    welcome_connected: {
      text: `Welcome back, traveller! As promised, since you participated in my first presale, you are able to claim up to 4 additional Clams. Would you like to proceed?`,
      next: `claim`,
      dismiss: false,
      skip: false,
    },
    claim: {
      text: `Excellent. Please claim your Clams using the menu above. You can only claim one at a time.`,
      next: false,
      dismiss: false,
      skip: false,
    },
    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },
    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    claimProcessing: {
      text: "Let me just go fetch your Clam. I'll just be a minute.",
    },

    collectionProcessing: {
      text: `One moment, just let me unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations on your claim! We send your collected clams directly to the Saferoom, so you can see them there.`,
      next: false,
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

  clam_presale: {
    welcome_notConnected: {
      text: `Welcome, traveller! My shop is not open yet, but I do have a batch of Clams that I can sell to you early. Due to limited stock, there's a limit of five Clams per customer. Would you like to buy one?`,
      next: `connect`,
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
      text: `Excellent! First, let's get your wallet connected. You will need to do this in order to purchase a Clam. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: `purchase`,
    },

    welcome_connected: {
      text: `Welcome, traveller! My shop is not open yet, but I do have a batch of Clams that I can sell to you early. Due to limited stock, there's a limit of five Clams per customer. Would you like to buy one?`,
      next: `purchase`,
      dismiss: false,
      skip: `purchase`,
    },

    purchase: {
      text: `Excellent, please follow the prompts above to purchase a Clam.`,
      next: `processing`,
      dismiss: false,
      skip: false,
    },

    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },

    congrats: {
      text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
      next: "collection",
      dismiss: true,
      skip: false,
    },

    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    collectionProcessing: {
      text: `One moment, just let me unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations on your purchase! We send your collected clams directly to the Saferoom, so you can see them there.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    error: {
      text: `I'm sorry, something went wrong. Please try again.`,
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
  clam_shop: {
    welcome: {
      text: `Howdy friend. My name is Diego the Shopkeeper. Welcome to my Clam Shop! Here you can buy Clams for $GEM and trade them for $SHELL. Let me show you around...`,
      next: "connect",
      dismiss: false,
      skip: false,
    },
    connect: {
      text: `Oh I've noticed that you've not connected your blockchain wallet yet. Before you can buy or trade any Clams, you need to enable that...`,
      next: false,
      dismiss: false,
      skip: false,
    },
    collect: {
      text: `Looks like you still have a clam to collect from last time you visited. Please do so before you proceed.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    collect_congrats: {
      text: `Congrats on your Clam! You can take your time to savour your luck. If you still feel like buying, click "Buy more" button and I will be able to assist you.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    choose_path: {
      text: `Now that everything is set up, tell me what led you to my Shop?`,
      next: false,
      dismiss: false,
      skip: false,
    },
    harvest_warn: {
      text: `WARNING!!! This action will destroy your Clam for $SHELL tokens and it is not reversible. Click proceed to finish harvesting your chosen Clam.`,
      next: false,
      dismiss: true,
      skip: false,
    },
    harvest_congrats: {
      text: `Big Decision. We have added $SHELL to your wallet`,
      next: false,
      dismiss: true,
      skip: false,
    },
  },
  saferoom: {
    connect: {
      text: `Excellent! First, let's get your wallet connected. You will need to do this in order to see your Clams. Press the "Connect Wallet" button in the top right of the screen.`,
      next: `purchase`,
      dismiss: false,
      skip: `purchase`,
    },

    connected: {
      text: `Excellent, please follow the prompts above to purchase a Clam.`,
      next: `processing`,
      dismiss: false,
      skip: false,
    },

    processing: {
      text: `Hold on while we process your transaction...`,
      next: `congrats`,
      dismiss: false,
      skip: false,
    },

    congrats: {
      text: `Thank you for your purchase! Let me just go fetch your Clam. I'll just be a minute.`,
      next: "collection",
      dismiss: true,
      skip: false,
    },

    collection: {
      text: `You Clam is ready for collection!`,
      next: false,
      dismiss: true,
      skip: false,
    },

    collectionProcessing: {
      text: `One moment, just let me just unbox this Clam for you. Did you know that no one knows what Clam is inside until you collect it, not even me?`,
      next: false,
      dismiss: true,
      skip: false,
    },

    congratsCollection: {
      text: `Congratulations, here's your Clam! You may go to the Saferoom to see your Clam.`,
      next: false,
      dismiss: true,
      skip: false,
    },

    error: {
      text: `I'm sorry, something went wrong. Please try again.`,
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
  farms: {
    placeholder: {
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
  },
};

export const BUTTONS = {
  welcome: {
    welcome: {
      next: "▶",
      alt: false,
    },
    first: {
      next: "Explore Island",
      alt: {
        action: "url_internal",
        destination: "/saferoom",
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
        destination: "/saferoom",
        text: "Go to Saferoom",
      },
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
        destination: "https://clamisland.medium.com/introducing-clam-island-ad424aba1733",
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

    congratsCollection: {
      next: "Buy more",
      alt: {
        action: "url",
        destination: "/saferoom",
        text: "Go to Saferoom",
      },
    },
  },

  farms: {
    withdraw: {
      next: "Withdraw Pearl",
      alt: {
        action: "url",
        destination: "/saferoom",
        text: "Go to Saferoom",
      },
    },
  },

  clam_shop: {
    welcome: {
      next: "Let's go!",
      alt: false,
    },
  },
};

function showPresaleCountdown() {
  const total = Date.parse("Tue May 25 2021 09:00:00 GMT+0000") - Date.parse(String(new Date()));
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

  return `${hours} hours and ${minutes > 9 ? minutes : "0" + minutes.toString()} minutes`;
}

function clamPresaleDate() {
  return "June 21 2021 13:00:00 GMT+0000";
}

function clamPresaleCountdown() {
  const total = Date.parse(clamPresaleDate()) - Date.parse(String(new Date()));
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return `${days} days, ${hours} hours and ${
    minutes > 9 ? minutes : "0" + minutes.toString()
  } minutes`;
}
