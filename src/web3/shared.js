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
import { calculatePearlBoost } from "./clam";

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

export const getClamsDataByIds = async ({ tokenIds, clamContract }) => {
  const clamDataCalls = clamContract.prepClamDataMulticall(tokenIds);
  const clamDataResult = await aggregate(clamDataCalls);
  const clamDataDecoded = clamContract.decodeClamDataFromMulticall(
    clamDataResult.returnData,
    tokenIds
  );
  const clamDnas = clamDataDecoded.map((data) => data.clamDataValues.dna);

  const producedPearlIdsCalls = clamContract.prepClamProducedPearlIds(tokenIds);
  const producedPearlIdsResult = await aggregate(producedPearlIdsCalls);
  const producedPearlIdsDecoded = clamContract.decodeProducedPearlIdsFromMulticall(
    producedPearlIdsResult.returnData,
    tokenIds
  );

  const dnaDecodedCalls = clamDnaDecoder.prepGetDnaDecodedMulticall(clamDnas);
  const dnaDecodedResult = await aggregate(dnaDecodedCalls);
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

        const pearlBoost = new BigNumber(
          !isLegacyClam ? pearlBoostM : await calculatePearlBoost(dnaDecoded)
        )
          .div(1000000)
          .toString();

        const img = await getClamImageFromCache({ dna });

        return {
          ...clam,
          isLegacyClam,
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

export const getClamById = async ({ tokenId, clamContract }) => {
  const clams = await getClamsDataByIds({ tokenIds: [tokenId], clamContract });
  return clams[0];
};

export const getPearlDataByIds = async (tokenIds) => {
  const pearlDataCalls = pearlShared.prepPearlDataMulticall(tokenIds);
  const pearlDataResult = await aggregate(pearlDataCalls);
  const pearlDataDecoded = pearlShared.decodePearlDataFromMulticall(
    pearlDataResult.returnData,
    tokenIds
  );
  const pearlDnas = pearlDataDecoded.map((data) => data.pearlDataValues.dna);

  const dnaDecodedCalls = pearlDnaDecoder.prepGetDnaDecodedMulticall(pearlDnas);
  const dnaDecodedResult = await aggregate(dnaDecodedCalls);
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

        const isLegacyPearl = new BigNumber(pearl.pearlDataValues.gemBoost).eq(0);
        let bonusRewards;

        if (isLegacyPearl) {
          const legacyBaseGEMRewards = await pearlLegacyBaseGemRewards();

          bonusRewards = await legacyCalculateBonusRewards(
            formatToWei(legacyBaseGEMRewards),
            dnaDecoded
          );
        } else {
          bonusRewards = pearl.pearlDataValues.gemBoost;
        }

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

export const getPearlById = async (tokenId) => {
  const pearls = await getPearlDataByIds([tokenId]);
  return pearls[0];
};

export const getOwnedClams = async ({ address, balance, clamContract }) => {
  // get owned clams
  const tokenIdsCalls = clamContract.prepTokenOfOwnerByIndexMulticall(address, +balance);
  const tokenIdsResult = await aggregate(tokenIdsCalls);
  const tokenIdsDecoded = clamContract.decodeTokenOfOwnerByIndexFromMulticall(
    tokenIdsResult.returnData
  );
  const [ownedClams] = await Promise.all([
    getClamsDataByIds({ tokenIds: tokenIdsDecoded, clamContract }),
  ]);
  // const stakedClamsImg = await addClamImg(stakedClams);
  // const rarities = stakedClams.map((clam) => clam.dnaDecoded.rarity);

  return ownedClams;
};

export const getOwnedPearls = async ({ address, balance }) => {
  const tokenIdsCalls = pearlShared.prepTokenOfOwnerByIndexMulticall(address, +balance);
  const tokenIdsResult = await aggregate(tokenIdsCalls);
  const tokenIdsDecoded = pearlShared.decodeTokenOfOwnerByIndexFromMulticall(
    tokenIdsResult.returnData
  );

  const ownedPearls = await getPearlDataByIds(tokenIdsDecoded);

  return ownedPearls;
};
