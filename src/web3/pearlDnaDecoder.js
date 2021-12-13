import pearlDnaDecoderAbi from "./abi/PearlDnaDecoder.json";
import { pearlDnaDecoderAddress } from "../constants/constants";
import { contractFactory } from "./index";

export const getPearlDNADecoded = async (dna) => {
  const pearlDnaDecoder = contractFactory({
    abi: pearlDnaDecoderAbi,
    address: pearlDnaDecoderAddress,
  });
  const traits = await pearlDnaDecoder.methods.getDNADecoded(dna).call();

  return traits;
};

export const prepGetDnaDecodedMulticall = (dnas) => {
  const contractCalls = [];
  for (let index = 0; index < dnas.length; index++) {
    contractCalls.push([
      pearlDnaDecoderAddress,
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
      pearlId: tokenIds[index],
      dnaDecodedValues: web3.eth.abi.decodeParameter(
        {
          traits: {
            shape: "string",
            color: "string",
            overtone: "string",
            size: "uint256",
            lustre: "uint256",
            nacreQuality: "uint256",
            surface: "uint256",
            glow: "bool",
            rarity: "string",
            rarityValue: "uint256",
            HSV: "uint256[3][2]",
          },
        },
        values[index]
      ),
    });
  }

  return result;
};

export default {
  decodeGetDnaDecodedFromMulticall,
  prepGetDnaDecodedMulticall,
  getPearlDNADecoded,
};
