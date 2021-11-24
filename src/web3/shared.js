import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";
import { store } from "../store/redux";
import BigNumber from "bignumber.js";
import { aggregate } from "./multicall";
import pearlShared, { legacyCalculateBonusRewards } from "./pearl";
import pearlDnaDecoder from "./pearlDnaDecoder";
import clamDnaDecoder from "./dnaDecoder";
import { pearlLegacyBaseGemRewards } from "./pearlBurner";

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

export const getClamsDataByIds = async ({ chainId, tokenIds, clamContract }) => {
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

  const clams = await Promise.all(
    clamDataDecoded.map(async (clam) => {
      const sameClamDna = dnaDecodedDecoded.find(({ clamId }) => clamId === clam.clamId);
      const sameClamPearlsProduced = producedPearlIdsDecoded.find(
        ({ clamId }) => clamId === clam.clamId
      );

      if (sameClamDna && sameClamPearlsProduced) {
        const dnaDecoded = sameClamDna.dnaDecodedValues;

        const producedPearlIds = sameClamPearlsProduced.producedPearlIds;
        const { dna, pearlBoostM } = clam.clamDataValues;

        const isLegacyClam = new BigNumber(pearlBoostM).eq(0);

        const pearlBoost = !isLegacyClam ? pearlBoostM / (1_000_000).toString() : "0";

        const img = await getClamImageFromCache({ dna });

        return {
          ...clam,
          dnaDecoded,
          producedPearlIds,
          dna,
          pearlBoost,
          tokenId: clam.clamId,
          img,
        };
      }
      console.error(`Clam ${clam.clamId} from ${address} not found`);
    })
  );

  const clamsFiltered = clams.filter((c) => c);

  return clamsFiltered;
};

export const getPearlDataByIds = async (tokenIds, chainId) => {
  const pearlDataCalls = pearlShared.prepPearlDataMulticall(tokenIds);
  const pearlDataResult = await aggregate(pearlDataCalls, chainId);
  const pearlDataDecoded = pearlShared.decodePearlDataFromMulticall(
    pearlDataResult.returnData,
    tokenIds
  );
  const pearlDnas = pearlDataDecoded.map((data) => data.pearlDataValues.dna);

  const dnaDecodedCalls = pearlDnaDecoder.prepGetDnaDecodedMulticall(pearlDnas);
  const dnaDecodedResult = await aggregate(dnaDecodedCalls, chainId);
  const dnaDecodedDecoded = pearlDnaDecoder.decodeGetDnaDecodedFromMulticall(
    dnaDecodedResult.returnData,
    tokenIds
  );

  const pearls = await Promise.all(
    pearlDataDecoded.map(async (pearl) => {
      const samePearl = dnaDecodedDecoded.find(({ pearlId }) => pearlId === pearl.pearlId);

      if (samePearl) {
        const dnaDecoded = samePearl.dnaDecodedValues;
        const { dna } = pearl.pearlDataValues;

        const legacyBaseGEMRewards = await pearlLegacyBaseGemRewards();
        const isLegacyPearl = new BigNumber(pearl.pearlDataValues.gemBoost).eq(0);

        const bonusRewards = isLegacyPearl
          ? await legacyCalculateBonusRewards((+legacyBaseGEMRewards * 1e18).toString(), dnaDecoded)
          : pearl.pearlDataValues.gemBoost;

        const img = await getPearlImageFromCache({ dna });

        return {
          ...pearl,
          dnaDecoded,
          bonusRewards,
          tokenId: pearl.pearlId,
          dna,
          img,
        };
      }
      console.error(`Pearl ${pearl.pearlId} from ${address} not found`);
    })
  );

  const pearlsFiltered = pearls.filter((c) => c);

  return pearlsFiltered;
};

export const getOwnedClams = async ({ chainId, address, balance, clamContract }) => {
  // get owned clams
  const tokenIdsCalls = clamContract.prepTokenOfOwnerByIndexMulticall(address, +balance);
  const tokenIdsResult = await aggregate(tokenIdsCalls, chainId);
  const tokenIdsDecoded = clamContract.decodeTokenOfOwnerByIndexFromMulticall(
    tokenIdsResult.returnData
  );
  const [ownedClams] = await Promise.all([
    getClamsDataByIds({ tokenIds: tokenIdsDecoded, chainId, clamContract }),
  ]);
  // const stakedClamsImg = await addClamImg(stakedClams);
  // const rarities = stakedClams.map((clam) => clam.dnaDecoded.rarity);

  return ownedClams;
};

export const getOwnedPearls = async ({ chainId, address, balance }) => {
  const tokenIdsCalls = pearlShared.prepTokenOfOwnerByIndexMulticall(address, +balance);
  const tokenIdsResult = await aggregate(tokenIdsCalls, chainId);
  const tokenIdsDecoded = pearlShared.decodeTokenOfOwnerByIndexFromMulticall(
    tokenIdsResult.returnData
  );

  const ownedPearls = await getPearlDataByIds(tokenIdsDecoded, chainId);

  return ownedPearls;
};
