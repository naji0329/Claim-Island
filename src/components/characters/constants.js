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
    welcome: [
        `G'day, welcome to Clam Island!
        The island isn't open yet so you can't go into any of the buildings,
        but feel free to have a look around while we're here.`,

        `Nice place, isn't it? Not long before it opens now. I'll be sure to give you the inside scoop if I hear something.`
    ],
    shell_presale: [`
        Welcome, traveller! You're early! Clam Island Bank isn't open yet.
        But since you already made this trip here, I can offer you some $SHELL tokens ahead of our grand opening.
        How does that sound?`,

        `Before you pull your wallet, I should let you know that we are currently having a 15 $SHELL (3 BNB) individual cap. Our presale hard cap is 2,000 $SHELL or 400 BNB.`,

        `Congratulations on being one of our first customers! I look forward to seeing you at the launch!`
    ],
    clam_presale: [
        `Welcome, traveller! You're early! Clam Island Shop isn't open for business yet. But I can hook you up with some fresh Clams we caught this morning. Would you like to buy some?`,

        `First, you would need to connect your wallet. Then choose your currency. Then select amount of Clams you want to purchase today.`,

        `Congratulations! You have have purchased 1 Clam! I’ll keep it safe for you until the grand opening. How can I be useful now?`
    ]
};

export const BUTTONS = {
    welcome: [
        'OK',
        'OK'
    ],
    shell_presale: [
        'Sounds good!',
        'I understand',
        'Go to map'
    ],
    clam_presale: [
        'Show me how',
        'Click to close',
        'Buy more'
    ]
};
