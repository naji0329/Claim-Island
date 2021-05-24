import Nacre from '../../assets/characters/captain_nacre.png';
import Al from '../../assets/characters/al.png';
import Tanja from '../../assets/characters/tanja.png';
import Diego from '../../assets/characters/diego.png';

export const CHARACTERS = {
    nacre: {
        name: 'Captain Nacre',
        charImg: Nacre
    },
    diego: {
        name: 'Diego',
        charImg: Diego
    },
    tanja: {
        name: 'Tanja',
        charImg: Tanja
    },
    al: {
        name: 'Al',
        charImg: Al
    },
};

export const SPEECHES = {
    welcome: {
      welcome: {
        text: `G'day, welcome to Clam Island!
        The island isn't open yet so you can't go into any of the buildings,
        but feel free to have a look around while we're here.`,
        next: 'second',
        dismiss: true,
        skip: false
      },
      second: {
        text: `Nice place, isn't it? Not long before it opens now. I'll be sure to give you the inside scoop if I hear something.`,
        next: 'second',
        dismiss: true,
        skip: false
      }
    },

    shell_presale: {
      welcome: {
        text: `Welcome, traveller! You're early! Clam Island Bank isn't open yet.
        But since you already made this trip here, I can offer you some $SHELL tokens ahead of our grand opening.
        How does that sound?`,
        next: `notice`,
        dismiss: false,
        skip: false
      },

      notice: {
        text: `Before you pull your wallet, I should let you know that we are currently having a 15 $SHELL (3 BNB) individual cap. Our presale hard cap is 2,000 $SHELL or 400 BNB.`,
        next: `connect`,
        dismiss: false,
        skip: false
      },

      connect: {
        text: `First, let's get your wallet connected. You will need to do this in order to purchase $SHELL.`,
        next: `purchase`,
        dismiss: false,
        skip: `purchase`
      },

      purchase: {
        text: `Great! You can now use the interface above to buy $SHELL. Remember that you can buy a maximum of 15 $SHELL!`,
        next: `congrats`,
        dismiss: true,
        skip: false
      },

      congrats: {
        text: `Congratulations on being one of our first customers! You can see your $SHELL balance at the top right of the screen. Remember they are not transferable until Clam Island opens! I look forward to seeing you at the launch!`,
        next: false,
        dismiss: true,
        skip: false
      }
    },

    clam_presale: [
        `Welcome, traveller! You're early! Clam Island Shop isn't open for business yet. But I can hook you up with some fresh Clams we caught this morning. Would you like to buy some?`,

        `First, you would need to connect your wallet. Then choose your currency. Then select amount of Clams you want to purchase today.`,

        `Congratulations! You have have purchased 1 Clam! I’ll keep it safe for you until the grand opening. How can I be useful now?`
    ]
};

export const BUTTONS = {

    welcome: {
      welcome: {
        next: 'OK',
        alt: false
      },
      second: {
        next: 'OK',
        alt: false
      }
    },

    shell_presale: {
      welcome: {
        next: "Sounds good!",
        alt: false
      },

      notice: {
        next: "I understand",
        alt: {
          action: "url",
          destination: "https://clamisland.medium.com/clam-island-presale-30090591d4f",
          text: 'More information'
        }
      },

      connect: {
        next: false,
        alt: {
          action: "connectWallet_next",
          destination: "purchase",
          text: 'Connect'
        }
      },

      purchase: {
        next: "Ok",
        alt: false
      },

      congrats: {
        next: "Ok",
        alt: {
          action: "url",
          destination: "/",
          text: "Exit bank"
        }
      }

    }
  }
