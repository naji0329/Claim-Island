//declare traits object with values specifying the digits required to determine trait value
import { traits } from './config/traits.js';

export const getTraits = () => {

    //generate random number - will be replaced with function to get RNG from smart contract

    let rng = "";
    while (rng.length < 77) {
        rng += Math.floor(Math.random() * 10).toString(); //string is required, otherwise JS will apply scientific notation
    }

    // const rng = GET_FROM_SMART_CONTRACT (needs to be passed as string, not number);

    const paddedRng = rng.padStart(77, '0'); //pads the number string with leading zeros

    let rngPosition = paddedRng.length; //to track position in the RNG

    //set pearlBoost object to record overall chance boost to particular pearls for the Clam
    const pearlBoost = {
        shape: false,
        bodycolour: false
    };

    //prepare rarity variable
    let rarity = 1;

    //replace the traits object values with corresponding random numbers

    for (let key in traits) {
        let num = paddedRng.substring(rngPosition - traits[key].length, rngPosition);
        rngPosition -= traits[key].length;
        //console.log(rngPosition);
        let position = 0;

        switch (key) {

            case "shellShape":
            case "tongue":

                for (let shape in traits[key].shapes) {
                    let traitValue = traits[key].shapes[shape];
                    let upper = traitValue.dropRate * 1000 + position - 1;
                    if (num >= position && num <= upper) {
                        rarity = rarity * traitValue.dropRate;
                        if (traitValue.pearlBoost) {
                            let boostValue = Math.round(traitValue.pearlBoost.boost * 10000) / 10000;
                            if (pearlBoost.shape) {
                                traitValue.pearlBoost.shape in pearlBoost.shape ? pearlBoost.shape[traitValue.pearlBoost.shape] += boostValue : pearlBoost.shape[traitValue.pearlBoost.shape] = boostValue;
                            } else {
                                pearlBoost.shape = {};
                                pearlBoost.shape[traitValue.pearlBoost.shape] = boostValue;
                            }
                        };
                        console.log(pearlBoost);
                        let result = shape.replace(/([A-Z])/g, " $1");
                        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                        traits[key] = finalResult;
                        break;
                    }
                    position = upper + 1;
                }
                break;

            case "tongueColour":
            case "shellColour":
            case "innerColour":
            case "lipColour":
                for (let colour in traits[key].colours) {
                    let upper = traits[key].colours[colour].dropRate * 1000 + position - 1;
                    if (num >= position && num <= upper) {
                        let traitValue = traits[key].colours[colour];
                        rarity = rarity * traitValue.dropRate;
                        if (traitValue.pearlBoost) {
                            let boostValue = Math.round(traitValue.pearlBoost.boost * 10000) / 10000;
                            if (pearlBoost.bodycolour) {
                                traitValue.pearlBoost.bodycolour in pearlBoost.bodycolour ? pearlBoost.bodycolour[traitValue.pearlBoost.bodycolour] += boostValue : pearlBoost.bodycolour[traitValue.pearlBoost.bodycolour] = boostValue;
                            } else {
                                pearlBoost.bodycolour = {};
                                pearlBoost.bodycolour[traitValue.pearlBoost.bodycolour] = boostValue;
                            }
                        };
                        let HSV = traitValue.val;
                        console.log(traits);
                        console.log(traitValue.val + ' ' + colour + ' ' + key + ' ' + num + ' ' + HSV);
                        let adjH = HSV[0] + traitValue.minAdj[0] + Math.round((traitValue.maxAdj[0] - traitValue.minAdj[0]) * Math.random());
                        let adjS = HSV[1] + traitValue.minAdj[1] + Math.round((traitValue.maxAdj[1] - traitValue.minAdj[1]) * Math.random());
                        let adjV = HSV[2] + traitValue.minAdj[2] + Math.round((traitValue.maxAdj[2] - traitValue.minAdj[2]) * Math.random());
                        traits[key] = {
                            HSV: HSV,
                            HSVadj: [adjH, adjS, adjV],
                            colour: colour.charAt(0).toUpperCase() + colour.slice(1)
                        };
                        break;
                    }
                    position = upper + 1;
                }
                break;

            case "pattern":
                for (let style in traits[key].styles) {
                    let upper = traits[key].styles[style].dropRate * 1000 + position - 1;
                    if (num >= position && num <= upper) {
                        let traitValue = traits[key].styles[style];
                        rarity = rarity * traitValue.dropRate;
                        if (traitValue.pearlBoost) {
                            let boostValue = Math.round(traitValue.pearlBoost.boost * 10000) / 10000;
                            if (pearlBoost.shape) {
                                traitValue.pearlBoost.shape in pearlBoost.shape ? pearlBoost.shape[traitValue.pearlBoost.shape] += boostValue : pearlBoost.shape[traitValue.pearlBoost.shape] = boostValue;
                            } else {
                                pearlBoost.shape = {};
                                pearlBoost.shape[traitValue.pearlBoost.shape] = boostValue;
                            }
                        };
                        console.log(pearlBoost);
                        traits[key] = style.charAt(0).toUpperCase() + style.slice(1);
                        break;
                    }
                    position = upper + 1;
                }
                break;

            case "size":
            case "lifespan":
                traits[key] = traits[key].min + Math.round((traits[key].max - traits[key].min) * num / 99);
                break;

            case "glow":
                let upper = traits[key].yes * 1000 + position - 1;
                if (num <= upper) {
                    rarity = rarity * traits[key].yes;
                    traits[key] = true;
                } else {
                    traits[key] = false;
                }
                break;
        }

    }
    if (rarity < (1.5 / Math.pow(10, 9))) { traits.rarity = "Legendary" } else //~0.01%
        if (rarity < (7.25 / Math.pow(10, 9))) { traits.rarity = "Epic" } else //~0.5%
            if (rarity < (3 / Math.pow(10, 8))) { traits.rarity = "Ultra Rare" } else //~2.5%
                if (rarity < (1.02 / Math.pow(10, 7))) { traits.rarity = "Rare" } else //~8%
                    if (rarity < (3.23 / Math.pow(10, 7))) { traits.rarity = "Uncommon" } else { //~18%
                        traits.rarity = "Common";
                    }

    traits.rarityValue = rarity;
    traits.pearlBoost = pearlBoost;

    return traits;
}

// console.log(rarity);

// console.log(traits);
// console.log(pearlBoost);
// window.traits = traits;

// document.querySelector('#traits').innerHTML = JSON.stringify(traits, null, 4);

let colourTraits = {
    os: {
        traitName: 'shellColour',
        textureFile: 'outerPBS_basecolor.png',
    },
    is: {
        traitName: 'innerColour',
        textureFile: 'innerPBS_basecolor.png'
    },
    lip: {
        traitName: 'lipColour',
        textureFile: 'lip_basecolor.png'
    },
    tongue: {
        traitName: 'tongueColour',
        textureFile: 'tongue_BaseColor.png'
    }
};

let sliderValues = {
    hue: {
        min: 0,
        max: 360,
        step: 1,
        default: 0
    },
    saturation: {
        min: -10,
        max: 2.5,
        step: 0.01,
        default: 1
    },
    value: {
        min: -4,
        max: 1.5,
        step: 0.01,
        default: -1.6
    }
}

// let adjusters = document.createElement("div");

// for (let trait in colourTraits) {
//     // let traitCanvas = document.createElement('div');
//     // traitCanvas.id = trait + '-canvas';
//     // traitCanvas.className = "texture-canvas";
//     // adjusters.appendChild(traitCanvas);

//     let labelContainer = document.createElement('div');
//     let label = document.createElement('label');
//     let adjustContainer = document.createElement('div');

//     labelContainer.className = "controls-label";
//     label.innerHTML = colourTraits[trait].traitName;
//     labelContainer.appendChild(label);

//     adjustContainer.id = trait + "-controls";
//     adjustContainer.className = "controls";
//     let HSVCount = 0;
//     for (let slider in sliderValues) {

//         let adjust = document.createElement('input');
//         let output = document.createElement('output');
//         let span = document.createElement('span');

//         span.innerHTML = slider + ': ';
//         let adjustVal = traits[colourTraits[trait].traitName].HSV[HSVCount];

//         HSVCount == 0 ? adjustVal = adjustVal : adjustVal = adjustVal / 100;

//         HSVCount++;

//         Object.assign(adjust, {
//             id: trait + '-' + slider,
//             className: 'sliders',
//             type: 'range',
//             min: sliderValues[slider].min,
//             max: sliderValues[slider].max,
//             step: sliderValues[slider].step,
//             value: adjustVal
//         })
//         output.innerHTML = adjustVal;
//         adjustContainer.appendChild(span);
//         adjustContainer.appendChild(adjust);
//         adjustContainer.appendChild(output);
//     }


//     adjusters.appendChild(labelContainer);
//     adjusters.appendChild(adjustContainer);
//     document.body.prepend(adjusters);
// }




