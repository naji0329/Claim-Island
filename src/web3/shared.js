import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";
import { store } from "../store/redux";
import BigNumber from "bignumber.js";
import { aggregate } from "./multicall";
import { prepPearlDataMulticall, decodePearlDataFromMulticall } from "./pearl";
import { prepGetDnaDecodedMulticall, decodeGetDnaDecodedFromMulticall } from "./pearlDnaDecoder";
import { prepBonusRewardsMulticall, decodeBonusRewardsFromMulticall } from "./pearlBurner";
import NFTUnknown from "assets/img/clam_unknown.png";
import PEARLunknown from "assets/img/pearl_unknown.png";

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
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  16
);
export const EmptyBytes = "0x0000000000000000000000000000000000000000000000000000000000000000";

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

export const getClamImageFromCache = async ({ dna }) => {
  const cache = await caches.open("clam-island");
  const resp = await cache.match(`/clams/${dna}`);
  if (resp) {
    const { img } = await resp.json();
    return img;
  } else {
    return NFTUnknown;
  }
};

export const getPearlImageFromCache = async ({ dna }) => {
  const cache = await caches.open("clam-island");
  const resp = await cache.match(`/pearls/${dna}`);
  if (resp) {
    const { img } = await resp.json();
    return img;
  } else {
    return PEARLunknown;
  }
};

export const getDna = async (getByNFTIndex, getNFTData, account, index, getDecodedDNA, isClam) => {
  const tokenId = await getByNFTIndex(account, index);
  const data = await getNFTData(tokenId);

  const { dna, birthTime } = data;

  if (dna.length > 1) {
    const dnaDecoded = await getDecodedDNA(dna);

    if (isClam) {
      const img = await getClamImageFromCache({ dna });

      return {
        dna,
        dnaDecoded,
        birthTime,
        tokenId,
        pearlProductionCapacity: data.pearlProductionCapacity,
        pearlsProduced: data.pearlsProduced,
        img,
      };
    } else {
      const img = await getPearlImageFromCache({ dna });
      return { dna, dnaDecoded, birthTime, tokenId, img };
    }
  }
};

export const getNFTs = async ({
  address,
  getByNFTIndex,
  getNFTData,
  nftBalance,
  getDecodedDNA,
  isClam,
}) => {
  let promises = [];
  for (let i = 0; i < Number(nftBalance); i++) {
    promises.push(getDna(getByNFTIndex, getNFTData, address, i, getDecodedDNA, isClam));
  }

  return Promise.all(promises);
};
