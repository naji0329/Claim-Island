import { get } from "lodash";

import { SORT_CLAMS_OPTIONS, SORT_ORDERS } from "constants/sorting";

const sortClamsByIdAsc = (clam1, clam2) => +clam1.clamId - +clam2.clamId;
const sortClamsByIdDesc = (clam1, clam2) => +clam2.clamId - +clam1.clamId;

const sortClamsByRarityAsc = (clam1, clam2) => {
  const rarityValue1 = get(clam1, ["dnaDecoded", "rarityValue"]);
  const rarityValue2 = get(clam2, ["dnaDecoded", "rarityValue"]);
  return +rarityValue2 - +rarityValue1;
};
const sortClamsByRarityDesc = (clam1, clam2) => {
  const rarityValue1 = get(clam1, ["dnaDecoded", "rarityValue"]);
  const rarityValue2 = get(clam2, ["dnaDecoded", "rarityValue"]);
  return +rarityValue1 - +rarityValue2;
};

const getRemainingPearls = (clam1, clam2) => {
  const pearlProductionCapacity1 = get(clam1, ["clamDataValues", "pearlProductionCapacity"]);
  const pearlsProduced1 = get(clam1, ["clamDataValues", "pearlsProduced"]);
  const pearlProductionCapacity2 = get(clam2, ["clamDataValues", "pearlProductionCapacity"]);
  const pearlsProduced2 = get(clam2, ["clamDataValues", "pearlsProduced"]);
  return [pearlProductionCapacity1 - pearlsProduced1, pearlProductionCapacity2 - pearlsProduced2];
};
const sortClamsByPearlsRemainingAsc = (clam1, clam2) => {
  const [pearlsRemaining1, pearlsRemaining2] = getRemainingPearls(clam1, clam2);

  return pearlsRemaining1 - pearlsRemaining2;
};
const sortClamsByPearlsRemainingDesc = (clam1, clam2) => {
  const [pearlsRemaining1, pearlsRemaining2] = getRemainingPearls(clam1, clam2);

  return pearlsRemaining2 - pearlsRemaining1;
};

const sortClamsByShapeAsc = (clam1, clam2) => {
  const shape1 = get(clam1, ["dnaDecoded", "shellShape"]);
  const shape2 = get(clam2, ["dnaDecoded", "shellShape"]);

  return shape1 === shape2 ? 0 : shape1 < shape2 ? -1 : 1;
};
const sortClamsByShapeDesc = (clam1, clam2) => {
  const shape1 = get(clam1, ["dnaDecoded", "shellShape"]);
  const shape2 = get(clam2, ["dnaDecoded", "shellShape"]);

  return shape1 === shape2 ? 0 : shape1 < shape2 ? 1 : -1;
};

const getUniqueColors = (clam1, clam2) => {
  const {
    innerColor: innerColor1,
    lipColor: lipColor1,
    shellColor: shellColor1,
    tongueColor: tongueColor1,
  } = clam1.dnaDecoded;
  const {
    innerColor: innerColor2,
    lipColor: lipColor2,
    shellColor: shellColor2,
    tongueColor: tongueColor2,
  } = clam2.dnaDecoded;
  const clamColours1 = new Set([innerColor1, lipColor1, shellColor1, tongueColor1]);
  const clamColours2 = new Set([innerColor2, lipColor2, shellColor2, tongueColor2]);

  return [clamColours1.size, clamColours2.size];
};

const sortClamsByColourAsc = (clam1, clam2) => {
  const { shellColor: shellColor1 } = clam1.dnaDecoded;
  const { shellColor: shellColor2 } = clam2.dnaDecoded;

  if (shellColor1 === shellColor2) {
    const [uniqueColors1, uniqueColors2] = getUniqueColors(clam1, clam2);
    return uniqueColors2 - uniqueColors1;
  }

  return shellColor1 === shellColor2 ? 0 : shellColor1 < shellColor2 ? -1 : 1;
};

const sortClamsByColourDesc = (clam1, clam2) => {
  const { shellColor: shellColor1 } = clam1.dnaDecoded;
  const { shellColor: shellColor2 } = clam2.dnaDecoded;

  if (shellColor1 === shellColor2) {
    const [uniqueColors1, uniqueColors2] = getUniqueColors(clam1, clam2);
    return uniqueColors1 - uniqueColors2;
  }

  return shellColor1 === shellColor2 ? 0 : shellColor1 < shellColor2 ? 1 : -1;
};

const sortClamsByClaimableShellAsc = (clam1, clam2) => {
  return clam1.harvestShellValue - clam2.harvestShellValue;
};
const sortClamsByClaimableShellDesc = (clam1, clam2) => {
  return clam2.harvestShellValue - clam1.harvestShellValue;
};

const sortClamsByTimeTillPearlAsc = (clam1, clam2) => {
  return clam1.pearlProductionTimeLeft - clam2.pearlProductionTimeLeft;
};
const sortClamsByTimeTillPearlDesc = (clam1, clam2) => {
  return clam2.pearlProductionTimeLeft - clam1.pearlProductionTimeLeft;
};

const SORT_FUNCTIONS = {
  [SORT_CLAMS_OPTIONS.id]: {
    [SORT_ORDERS.asc]: sortClamsByIdAsc,
    [SORT_ORDERS.desc]: sortClamsByIdDesc,
  },
  [SORT_CLAMS_OPTIONS.rarity]: {
    [SORT_ORDERS.asc]: sortClamsByRarityAsc,
    [SORT_ORDERS.desc]: sortClamsByRarityDesc,
  },
  [SORT_CLAMS_OPTIONS.pearls]: {
    [SORT_ORDERS.asc]: sortClamsByPearlsRemainingAsc,
    [SORT_ORDERS.desc]: sortClamsByPearlsRemainingDesc,
  },
  [SORT_CLAMS_OPTIONS.shape]: {
    [SORT_ORDERS.asc]: sortClamsByShapeAsc,
    [SORT_ORDERS.desc]: sortClamsByShapeDesc,
  },
  [SORT_CLAMS_OPTIONS.colour]: {
    [SORT_ORDERS.asc]: sortClamsByColourAsc,
    [SORT_ORDERS.desc]: sortClamsByColourDesc,
  },
  [SORT_CLAMS_OPTIONS.shell]: {
    [SORT_ORDERS.asc]: sortClamsByClaimableShellAsc,
    [SORT_ORDERS.desc]: sortClamsByClaimableShellDesc,
  },
  [SORT_CLAMS_OPTIONS.pearlTime]: {
    [SORT_ORDERS.asc]: sortClamsByTimeTillPearlAsc,
    [SORT_ORDERS.desc]: sortClamsByTimeTillPearlDesc,
  },
};

export const getClamsSortFunction = (sortValue, order) => SORT_FUNCTIONS[sortValue][order];

export const getSortedClams = (clams, sortValue, order) => {
  if (clams?.length && sortValue && order && order !== SORT_ORDERS.none) {
    return [...clams].sort(getClamsSortFunction(sortValue, order));
  }

  return clams;
};
