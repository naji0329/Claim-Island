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
        name: 'Thotiana',
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
        Welcome, clam investor! You're early! Clam Island Bank isn't open yet.
        But since you already made this trip here, I can offer you some $SHELLs ahead of grand opening.
        How does that sound?`,

        `Before you pull your wallet, I must say that we are currently having a 20 $SHELL individual cap or 2 BNB cap. Our presale hard cap is 100 $SHELL or 200 BNB`,

        `Congratulations on being one of first customers! I look forward to seeing you at the launch! See vault on the map to see what you own.`
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
        'Fuck yea!',
        'I understand',
        'Go to map'
    ],
    clam_presale: [
        'Show me how',
        'Click to close',
        'Buy more'
    ]
};