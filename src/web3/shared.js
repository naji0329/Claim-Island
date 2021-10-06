import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";
import { store } from "../store/redux";
import BigNumber from "bignumber.js";
import { aggregate } from "./multicall";
import { prepPearlDataMulticall, decodePearlDataFromMulticall } from "./pearl";
import { prepGetDnaDecodedMulticall, decodeGetDnaDecodedFromMulticall } from "./pearlDnaDecoder";
import clamDnaDecoder from "./dnaDecoder";
import { prepBonusRewardsMulticall, decodeBonusRewardsFromMulticall } from "./pearlBurner";
import {
  decodeCalculateBonusRewardsFromMulticall,
  prepCalculateBonusRewardsMulticall,
} from "./clamBonus";

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

const getClamsDataByIds = async ({ chainId, tokenIds, clamContract }) => {
  const clamDataCalls = clamContract.prepClamDataMulticall(tokenIds);
  const clamDataResult = await aggregate(clamDataCalls, chainId);
  const clamDataDecoded = clamContract.decodeClamDataFromMulticall(
    clamDataResult.returnData,
    tokenIds
  );
  const clamDnas = clamDataDecoded.map((data) => data.clamDataValues.dna);

  const producedPearlIdsCalls = clamContract.prepClamProducedPearlIds(tokenIds);
  const producedPearlIdsResult = await aggregate(producedPearlIdsCalls, chainId);
  const producedPearlIdsDecoded = clamContract.decodeProducedPearlIdsFromMulticall(
    producedPearlIdsResult.returnData,
    tokenIds
  );

  const dnaDecodedCalls = clamDnaDecoder.prepGetDnaDecodedMulticall(clamDnas);
  const dnaDecodedResult = await aggregate(dnaDecodedCalls, chainId);
  const dnaDecodedDecoded = clamDnaDecoder.decodeGetDnaDecodedFromMulticall(
    dnaDecodedResult.returnData,
    tokenIds
  );

  const clamBonusCalls = prepCalculateBonusRewardsMulticall(dnaDecodedDecoded);
  const clamBonusResult = await aggregate(clamBonusCalls, chainId);
  const clamBonusDecoded = decodeCalculateBonusRewardsFromMulticall(
    clamBonusResult.returnData,
    tokenIds
  );

  const clams = clamDataDecoded.map((clam) => {
    const sameClamDna = dnaDecodedDecoded.find(({ clamId }) => clamId === clam.clamId);
    const sameClamPearlsProduced = producedPearlIdsDecoded.find(
      ({ clamId }) => clamId === clam.clamId
    );
    const sameClamBonus = clamBonusDecoded.find(({ clamId }) => clamId === clam.clamId);
    if (sameClamDna && sameClamPearlsProduced && sameClamBonus) {
      const dnaDecoded = sameClamDna.dnaDecodedValues;
      const producedPearlIds = sameClamPearlsProduced.producedPearlIds;
      const dna = clam.clamDataValues.dna;
      const { clamBonus } = sameClamBonus;

      return { ...clam, dnaDecoded, producedPearlIds, dna, clamBonus };
    }
    console.error(`Clam ${clam.clamId} from ${address} not found`);
  });

  const clamsFiltered = clams.filter((c) => c);

  return clamsFiltered;
};

export const getOwnedClams = async ({ chainId, address, balance, clamContract }) => {
  const addImagesToClams = async ({ clams }) => {
    const cache = await caches.open("clam-island");
    const promises = await Promise.all(
      clams.map((clam) => {
        const dna = clam.clamDataValues.dna;
        return cache.match(`/clams/${dna}`);
      })
    );
    const images = await Promise.all(
      promises.map((resp) => {
        return resp ? resp.json() : "";
      })
    );
    const clamsUptd = clams.map((clam, index) => {
      let clamImg = images[index];
      clamImg = clamImg ? clamImg.img : clamImg;
      clam.img = clamImg || NFTUnknown;
      return clam;
    });
    return clamsUptd;
  };

  console.log("getOwnedClams", { chainId, address, balan: +balance, clamContract });
  // get owned clams
  const tokenIdsCalls = clamContract.prepTokenOfOwnerByIndexMulticall(address, +balance);
  const tokenIdsResult = await aggregate(tokenIdsCalls, chainId);
  const tokenIdsDecoded = clamContract.decodeTokenOfOwnerByIndexFromMulticall(
    tokenIdsResult.returnData
  );
  const [ownedClams] = await Promise.all([
    getClamsDataByIds({ tokenIds: tokenIdsDecoded, chainId, clamContract }),
    // getClamsDataByIds(clamsStakedIds),
  ]);

  const ownedClamsImg = await addImagesToClams({ clams: ownedClams });
  // const stakedClamsImg = await addClamImg(stakedClams);
  // const rarities = stakedClams.map((clam) => clam.dnaDecoded.rarity);

  return ownedClamsImg;
};
