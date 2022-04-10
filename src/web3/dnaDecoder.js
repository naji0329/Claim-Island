import dnaDecoderAbi from "./abi/DNADecoder.json";
import { dnaDecoderAddress } from "../constants/constants";
import { contractFactory } from "./index";

export const getDNADecoded = async (dna) => {
  const dnaDecoder = contractFactory({
    abi: dnaDecoderAbi,
    address: dnaDecoderAddress,
  });
  const traits = await dnaDecoder.methods.getDNADecoded(dna).call();

  return traits;
};

export const prepGetDnaDecodedMulticall = (dnas) => {
  const contractCalls = [];
  for (let index = 0; index < dnas.length; index++) {
    contractCalls.push([
      dnaDecoderAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "getDNADecoded",
          type: "function",
          inputs: [
            {
              name: "_rng",
              type: "uint256",
            },
          ],
        },
        [dnas[index]]
      ),
    ]);
  }

  return contractCalls;
};

export const decodeGetDnaDecodedFromMulticall = (values, tokenIds) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      clamId: tokenIds[index],
      dnaDecodedValues: web3.eth.abi.decodeParameter(
        {
          traits: {
            tongueShape: "string",
            tongueColor: "string",
            shellShape: "string",
            shellColor: "string",
            innerColor: "string",
            lipColor: "string",
            pattern: "string",
            size: "uint256",
            lifespan: "uint256",
            glow: "bool",
            rarity: "string",
            rarityValue: "uint256",
            pearlBodyColorNumber: "uint8[10]",
            pearlShapeNumber: "uint8[6]",
            defaultHSV: "uint256[3][4]",
            adjHSV: "uint256[3][4]",
          },
        },
        values[index]
      ),
    });
  }

  return result;
};

export default {
  getDNADecoded,
  prepGetDnaDecodedMulticall,
  decodeGetDnaDecodedFromMulticall,
};
