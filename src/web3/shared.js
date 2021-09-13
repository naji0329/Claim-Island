import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";
import { store } from "../store/redux";
import BigNumber from "bignumber.js";
import { aggregate } from "./multicall";
import { prepPearlDataMulticall, decodePearlDataFromMulticall } from "./pearl";
import { prepGetDnaDecodedMulticall, decodeGetDnaDecodedFromMulticall } from "./pearlDnaDecoder";
import { prepBonusRewardsMulticall, decodeBonusRewardsFromMulticall } from "./pearlBurner";

export const formatFromWei = (value) => (value ? formatUnits(value, 18) : "0");

export const formatToWei = (value) => (value ? Web3.utils.toWei(value) : "0");

export const getAccount = () => {
  const address = store.getState().account.address;
  if (address) return address;
  throw new Error("No address found");
};

export const Zero = new BigNumber(0);
export const One = new BigNumber(1);
export const WeiPerEther = new BigNumber("1000000000000000000");
export const MaxUint256 = new BigNumber(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

export const getPearlDataByIds = async (tokenIds, chainId) => {
  const pearlDataCalls = prepPearlDataMulticall(tokenIds);
  const pearlDataResult = await aggregate(pearlDataCalls, chainId);
  const pearlDataDecoded = decodePearlDataFromMulticall(pearlDataResult.returnData, tokenIds);
  const pearlDnas = pearlDataDecoded.map((data) => data.pearlDataValues.dna);

  const dnaDecodedCalls = prepGetDnaDecodedMulticall(pearlDnas);
  const dnaDecodedResult = await aggregate(dnaDecodedCalls, chainId);
  const dnaDecodedDecoded = decodeGetDnaDecodedFromMulticall(dnaDecodedResult.returnData, tokenIds);

  const traits = dnaDecodedDecoded.map(
    ({ dnaDecodedValues: { size, lustre, nacreQuality, surface, rarityValue } }) => ({
      size,
      lustre,
      nacreQuality,
      surface,
      rarityValue,
    })
  );

  const bonusRewardsCalls = prepBonusRewardsMulticall(traits);
  const bonusRewardsResult = await aggregate(bonusRewardsCalls, chainId);
  const bonusRewardsDecoded = decodeBonusRewardsFromMulticall(
    bonusRewardsResult.returnData,
    tokenIds
  );

  const pearls = pearlDataDecoded.map((pearl) => {
    const samePearl = dnaDecodedDecoded.find(({ pearlId }) => pearlId === pearl.pearlId);
    const sameBonus = bonusRewardsDecoded.find(({ pearlId }) => pearlId === pearl.pearlId);

    if (samePearl && sameBonus) {
      const dnaDecoded = samePearl.dnaDecodedValues;
      const { bonusRewards } = sameBonus;
      return { ...pearl, dnaDecoded, bonusRewards };
    }
    console.error(`Pearl ${pearl.pearlId} from ${address} not found`);
  });

  const pearlsFiltered = pearls.filter((c) => c);

  return pearlsFiltered;
};
