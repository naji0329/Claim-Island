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

    traits.tongue = dna[0].tongueShape;
    traits.tongueColour.colour = dna[0].tongueColor;
    traits.shellShape = dna[0].shellShape;
    traits.shellColour.colour = dna[0].shellColor;
    traits.innerColour.colour = dna[0].innerColor;
    traits.lipColour.colour = dna[0].lipColor;
    traits.pattern = dna[0].pattern;
    traits.size = +dna[0].size;
    traits.lifespan = +dna[0].lifespan;
    traits.glow = dna[0].glow;
    traits.rarity = dna[0].rarity;
    traits.rarityValue = dna[0].rarityValue;

    traits.tongueColour.HSV = dna[5][0].map(k => +k - 1000);
    traits.shellColour.HSV = dna[5][1].map(k => +k - 1000);
    traits.innerColour.HSV = dna[5][2].map(k => +k - 1000);
    traits.lipColour.HSV = dna[5][3].map(k => +k - 1000);

    traits.tongueColour.HSVadj = dna[6][0].map(k => +k - 1000);
    traits.shellColour.HSVadj = dna[6][1].map(k => +k - 1000);
    traits.innerColour.HSVadj = dna[6][2].map(k => +k - 1000);
    traits.lipColour.HSVadj = dna[6][3].map(k => +k - 1000);

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
