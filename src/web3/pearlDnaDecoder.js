import pearlDnaDecoderAbi from "./abi/PearlDnaDecoder.json";
import { pearlDnaDecoderAddress } from "./constants";
import { contractFactory } from "./index";

export const getPearlDNADecoded = async (dna) => {
  const pearlDnaDecoder = contractFactory({
    abi: pearlDnaDecoderAbi,
    address: pearlDnaDecoderAddress,
  });
  const traits = await pearlDnaDecoder.methods.getDNADecoded(dna).call();

  return traits;
};
