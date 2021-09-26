import { contractFactory } from "./index";
import clamBonusAbi from "./abi/ClamBonus.json";
import { clamBonusAddress } from "./constants";

const clamBonus = () =>
  contractFactory({
    abi: clamBonusAbi,
    address: clamBonusAddress,
  });

export const calculateBonusRewards = async (dnaDecoded) => {
  const { size, lifespan, rarityValue } = dnaDecoded;
  return clamBonus().methods.calculateBonusRewards(size, lifespan, rarityValue).call();
};

export const prepCalculateBonusRewardsMulticall = (dnasDecoded) => {
  const contractCalls = [];
  for (let index = 0; index < dnasDecoded.length; index++) {
    const { size, lifespan, rarityValue } = dnasDecoded[index].dnaDecodedValues;
    contractCalls.push([
      clamBonusAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "calculateBonusRewards",
          type: "function",
          inputs: [
            { name: "size", type: "uint256" },
            { name: "lifespan", type: "uint256" },
            { name: "rarityValue", type: "uint256" },
          ],
        },
        [size, lifespan, rarityValue]
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
