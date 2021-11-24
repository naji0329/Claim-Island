import PearlBurnerAbi from "./abi/PearlBurner.json";
import { pearlBurnerAddress, pearlNFTAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getAccount } from "./shared";

const pearlBurner = () =>
  contractFactory({
    abi: PearlBurnerAbi,
    address: pearlBurnerAddress,
  });

export const shape = async () => {
  return await pearlBurner().methods.shape().call();
};

export const color = async () => {
  return await pearlBurner().methods.colour().call();
};

export const periodStart = async () => {
  return await pearlBurner().methods.periodStart().call();
};

export const periodInSeconds = async () => {
  return await pearlBurner().methods.periodInSeconds().call();
};

export const pearlLegacyBaseGemRewards = async () => {
  return await pearlBurner().methods.baseGemRewards().call();
};

export const burnPearl = async (pearlId, forfeitPearl) => {
  const account = getAccount();
  const method = pearlBurner().methods.burnPearl(pearlId, forfeitPearl);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const periodCheckpoint = async () => {
  const account = getAccount();
  const method = pearlBurner().methods.periodCheckpoint();
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const prepBonusRewardsMulticall = (baseRewards, traits) => {
  const contractCalls = [];
  for (let index = 0; index < traits.length; index++) {
    const { size, lustre, nacreQuality, surface, rarityValue } = traits[index];
    contractCalls.push([
      pearlNFTAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "calculateBonusRewards",
          type: "function",
          inputs: [
            {
              name: "baseGemRewards",
              type: "uint256",
            },
            {
              name: "size",
              type: "uint256",
            },
            {
              name: "lustre",
              type: "uint256",
            },
            {
              name: "nacreQuality",
              type: "uint256",
            },
            {
              name: "surface",
              type: "uint256",
            },
            {
              name: "rarityValue",
              type: "uint256",
            },
          ],
        },
        [baseRewards[index], size, lustre, nacreQuality, surface, rarityValue]
      ),
    ]);
  }

  return contractCalls;
};

export const decodeBonusRewardsFromMulticall = (values, tokenIds) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      pearlId: tokenIds[index],
      bonusRewards: web3.eth.abi.decodeParameter("uint256", values[index]),
    });
  }

  return result;
};
