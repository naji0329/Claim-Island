import { contractFactory } from "./index";
import clamAbi from "./abi/Clam.json";
import { clamNFTAddress } from "./constants";

const clam = () =>
  contractFactory({
    abi: clamAbi,
    address: clamNFTAddress,
  });

export const calculateBonusRewards = async (dnaDecoded) => {
  const { size, lifespan, rarityValue } = dnaDecoded;

  const baseRewards = currentClamBaseGemRewards();

  return clam().methods.calculateBonusRewards(baseRewards, size, lifespan, rarityValue).call();
};

export const currentClamBaseGemRewards = async () => {
  const value = await clam().methods.currentBaseGemRewards().call();

  return value;
};

export const prepCalculateBonusRewardsMulticall = (baseRewards, dnasDecoded) => {
  const contractCalls = [];
  for (let index = 0; index < dnasDecoded.length; index++) {
    const { size, lifespan, rarityValue } = dnasDecoded[index].dnaDecodedValues;
    contractCalls.push([
      clamNFTAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "calculateBonusRewards",
          type: "function",
          inputs: [
            { name: "baseGemRewards", type: "uint256" },
            { name: "size", type: "uint256" },
            { name: "lifespan", type: "uint256" },
            { name: "rarityValue", type: "uint256" },
          ],
        },
        [baseRewards, size, lifespan, rarityValue]
      ),
    ]);
  }

  return contractCalls;
};

export const decodeCalculateBonusRewardsFromMulticall = (values, tokenIds) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      clamId: tokenIds[index],
      clamBonus: web3.eth.abi.decodeParameter("uint256", values[index]),
    });
  }

  return result;
};
