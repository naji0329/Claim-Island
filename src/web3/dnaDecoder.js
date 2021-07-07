import dnaDecoderAbi from "./abi/DNADecoder.json";
import { dnaDecoderAddress } from "./constants";
import { contractFactory } from "./index";

export const getDNADecoded = async (dna) => {
  const dnaDecoder = contractFactory({
    abi: dnaDecoderAbi,
    address: dnaDecoderAddress,
  });
  const traits = await dnaDecoder.methods.getDNADecoded(dna).call();

  return traits;
};
