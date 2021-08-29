import PearlBurnerAbi from "./abi/PearlBurner.json";
import { pearlBurnerAddress } from "./constants";
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

export const weekStart = async () => {
  return await pearlBurner().methods.weekStart().call();
};

export const burnPearl = async (pearlId, shape, color) => {
  const account = getAccount();
  const method = pearlBurner().methods.burnPearl(pearlId, shape, color);
  const gasEstimation = await method.estimateGas({ from: account });

  await method.send({ from: account, gas: gasEstimation });
};

export const prepBonusRewardsMulticall = (traits) => {
  const contractCalls = [];
  for (let index = 0; index < traits.length; index++) {
    const { size, lustre, nacreQuality, surface, rarityValue } = traits[index];
    contractCalls.push([
      pearlBurnerAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "calculateBonusRewards",
          type: "function",
          inputs: [
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
        [size, lustre, nacreQuality, surface, rarityValue]
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
