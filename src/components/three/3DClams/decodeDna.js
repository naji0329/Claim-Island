const decodeDna = (dna) => {
    const traits = {
        tongueColour: { HSV: [], HSVadj: [], colour: '' },
        tongue: '',
        shellShape: '',
        shellColour: { HSV: [], HSVadj: [], colour: '' },
        innerColour: { HSV: [], HSVadj: [], colour: '' },
        lipColour: { HSV: [], HSVadj: [], colour: '' },
        pattern: '',
        size: 0,
        lifespan: 0,
        glow: false,
        rarity: '',
        rarityValue: 0,
        pearlBoost: {
            shape: {button: 0.2},
            bodyColour: {pink: 0.2, green: 0.2, white: 0.3}
        }
    };

    traits.tongue = dna[0][0];
    traits.tongueColour.colour = dna[0][1];
    traits.shellShape = dna[0][2];
    traits.shellColour.colour = dna[0][3];
    traits.innerColour.colour = dna[0][4];
    traits.lipColour.colour = dna[0][5];
    traits.pattern = dna[0][6];
    traits.size = +dna[0][7];
    traits.lifespan = +dna[0][8];
    traits.glow = dna[0][9];
    traits.rarity = dna[0][10];
    traits.rarity = dna[0][10];
    traits.rarityValue = 0.22; // dna[0][11] || 0;

    traits.tongueColour.HSV = dna[5][0].map(k => +k);
    traits.shellColour.HSV = dna[5][1].map(k => +k);
    traits.innerColour.HSV = dna[5][2].map(k => +k);
    traits.lipColour.HSV = dna[5][3].map(k => +k);

    traits.tongueColour.HSVadj = dna[6][0].map(k => +k);
    traits.shellColour.HSVadj = dna[6][1].map(k => +k);
    traits.innerColour.HSVadj = dna[6][2].map(k => +k);
    traits.lipColour.HSVadj = dna[6][3].map(k => +k);

    dna[1].forEach((pearlBodyColour, index) => {
        if(pearlBodyColour !== 'default') {
            traits.pearlBoost.bodyColour[pearlBodyColour] = +dna[2][index] / 100;
        }
    });

    dna[3].forEach((pearlShape, index) => {
        if(pearlShape !== 'default') {
            traits.pearlBoost.shape[pearlShape] = +dna[4][index] / 100;
        }
    });

    return traits;
};

export default decodeDna;