export const decodeDna = (dna) => {
  const traits = {
    tongueColour: { HSV: [], HSVadj: [], colour: "" },
    tongue: "",
    shellShape: "",
    shellColour: { HSV: [], HSVadj: [], colour: "" },
    innerColour: { HSV: [], HSVadj: [], colour: "" },
    lipColour: { HSV: [], HSVadj: [], colour: "" },
    pattern: "",
    size: 0,
    lifespan: 0,
    glow: false,
    rarity: "",
    rarityValue: 0,
    pearlBoost: {
      shape: { button: 0.2 },
      bodyColour: { pink: 0.2, green: 0.2, white: 0.3 },
    },
  };

  traits.tongue = dna.tongueShape;
  traits.tongueColour.colour = dna.tongueColor;
  traits.shellShape = dna.shellShape;
  traits.shellColour.colour = dna.shellColor;
  traits.innerColour.colour = dna.innerColor;
  traits.lipColour.colour = dna.lipColor;
  traits.pattern = dna.pattern;
  traits.size = +dna.size;
  traits.lifespan = +dna.lifespan;
  traits.glow = dna.glow;
  traits.rarity = dna.rarity;
  traits.rarityValue = dna.rarityValue;

  traits.tongueColour.HSV = dna.defaultHSV[0].map((k) => +k - 1000);
  traits.shellColour.HSV = dna.defaultHSV[1].map((k) => +k - 1000);
  traits.innerColour.HSV = dna.defaultHSV[2].map((k) => +k - 1000);
  traits.lipColour.HSV = dna.defaultHSV[3].map((k) => +k - 1000);

  traits.tongueColour.HSVadj = dna.adjHSV[0].map((k) => +k - 1000);
  traits.shellColour.HSVadj = dna.adjHSV[1].map((k) => +k - 1000);
  traits.innerColour.HSVadj = dna.adjHSV[2].map((k) => +k - 1000);
  traits.lipColour.HSVadj = dna.adjHSV[3].map((k) => +k - 1000);

  dna.pearlBodyColorNumber.forEach((pearlBodyColour, index) => {
    if (pearlBodyColour !== "default") {
      traits.pearlBoost.bodyColour[pearlBodyColour] = +dna[2][index] / 100;
    }
  });

  dna.pearlShapeNumber.forEach((pearlShape, index) => {
    if (pearlShape !== "default") {
      traits.pearlBoost.shape[pearlShape] = +dna[4][index] / 100;
    }
  });

  return traits;
};
