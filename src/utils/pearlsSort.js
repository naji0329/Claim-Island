import { get } from "lodash";

import { SORT_PEARLS_OPTIONS, SORT_ORDERS } from "constants/sorting";

const sortPearlsByIdAsc = (pearl1, pearl2) => +pearl1.pearlId - +pearl2.pearlId;
const sortPearlsByIdDesc = (pearl1, pearl2) => +pearl2.pearlId - +pearl1.pearlId;

const sortPearlsByRarityAsc = (pearl1, pearl2) => {
  const rarityValue1 = get(pearl1, ["dnaDecoded", "rarityValue"]);
  const rarityValue2 = get(pearl2, ["dnaDecoded", "rarityValue"]);
  return +rarityValue2 - +rarityValue1;
};
const sortPearlsByRarityDesc = (pearl1, pearl2) => {
  const rarityValue1 = get(pearl1, ["dnaDecoded", "rarityValue"]);
  const rarityValue2 = get(pearl2, ["dnaDecoded", "rarityValue"]);
  return +rarityValue1 - +rarityValue2;
};

const sortPearlsByShapeAsc = (pearl1, pearl2) => {
  const shape1 = get(pearl1, ["dnaDecoded", "shape"]);
  const shape2 = get(pearl2, ["dnaDecoded", "shape"]);

  return shape1 === shape2 ? 0 : shape1 < shape2 ? -1 : 1;
};
const sortPearlsByShapeDesc = (pearl1, pearl2) => {
  const shape1 = get(pearl1, ["dnaDecoded", "shape"]);
  const shape2 = get(pearl2, ["dnaDecoded", "shape"]);

  return shape1 === shape2 ? 0 : shape1 < shape2 ? 1 : -1;
};

const sortPearlsByColourAsc = (pearl1, pearl2) => {
  const color1 = get(pearl1, ["dnaDecoded", "color"]);
  const color2 = get(pearl2, ["dnaDecoded", "color"]);

  return color1 === color2 ? 0 : color1 < color2 ? -1 : 1;
};

const sortPearlsByColourDesc = (pearl1, pearl2) => {
  const color1 = get(pearl1, ["dnaDecoded", "color"]);
  const color2 = get(pearl2, ["dnaDecoded", "color"]);

  return color1 === color2 ? 0 : color1 < color2 ? 1 : -1;
};

const calculateGrade = ({ lustre, nacreQuality, surface }) =>
  Number(lustre) + Number(nacreQuality) + Number(surface);

const sortPearlsByGradeAsc = (pearl1, pearl2) => {
  const grade1 = calculateGrade(pearl1.dnaDecoded);
  const grade2 = calculateGrade(pearl2.dnaDecoded);

  return grade1 - grade2;
};

const sortPearlsByGradeDesc = (pearl1, pearl2) => {
  const grade1 = calculateGrade(pearl1.dnaDecoded);
  const grade2 = calculateGrade(pearl2.dnaDecoded);

  return grade2 - grade1;
};

const sortPearlsByBoostAsc = (pearl1, pearl2) => {
  const gemBoost1 = get(pearl1, ["pearlDataValues", "gemBoost"]);
  const gemBoost2 = get(pearl2, ["pearlDataValues", "gemBoost"]);
  return +gemBoost1 - +gemBoost2;
};
const sortPearlsByBoostDesc = (pearl1, pearl2) => {
  const gemBoost1 = get(pearl1, ["pearlDataValues", "gemBoost"]);
  const gemBoost2 = get(pearl2, ["pearlDataValues", "gemBoost"]);
  return +gemBoost2 - +gemBoost1;
};

const sortPearlsByMaxYieldInAsc = (pearl1, pearl2) => {
  const traitsBeforeMaxBoost1 = get(pearl1, ["traitsBeforeMaxBoost"]);
  const traitsBeforeMaxBoost2 = get(pearl2, ["traitsBeforeMaxBoost"]);
  return +traitsBeforeMaxBoost1 - +traitsBeforeMaxBoost2;
};
const sortPearlsByMaxYieldInDesc = (pearl1, pearl2) => {
  const traitsBeforeMaxBoost1 = get(pearl1, ["traitsBeforeMaxBoost"]);
  const traitsBeforeMaxBoost2 = get(pearl2, ["traitsBeforeMaxBoost"]);
  return +traitsBeforeMaxBoost2 - +traitsBeforeMaxBoost1;
};

const SORT_FUNCTIONS = {
  [SORT_PEARLS_OPTIONS.id]: {
    [SORT_ORDERS.asc]: sortPearlsByIdAsc,
    [SORT_ORDERS.desc]: sortPearlsByIdDesc,
  },
  [SORT_PEARLS_OPTIONS.rarity]: {
    [SORT_ORDERS.asc]: sortPearlsByRarityAsc,
    [SORT_ORDERS.desc]: sortPearlsByRarityDesc,
  },
  [SORT_PEARLS_OPTIONS.shape]: {
    [SORT_ORDERS.asc]: sortPearlsByShapeAsc,
    [SORT_ORDERS.desc]: sortPearlsByShapeDesc,
  },
  [SORT_PEARLS_OPTIONS.colour]: {
    [SORT_ORDERS.asc]: sortPearlsByColourAsc,
    [SORT_ORDERS.desc]: sortPearlsByColourDesc,
  },
  [SORT_PEARLS_OPTIONS.grading]: {
    [SORT_ORDERS.asc]: sortPearlsByGradeAsc,
    [SORT_ORDERS.desc]: sortPearlsByGradeDesc,
  },
  [SORT_PEARLS_OPTIONS.boost]: {
    [SORT_ORDERS.asc]: sortPearlsByBoostAsc,
    [SORT_ORDERS.desc]: sortPearlsByBoostDesc,
  },
  [SORT_PEARLS_OPTIONS.maxYieldIn]: {
    [SORT_ORDERS.asc]: sortPearlsByMaxYieldInAsc,
    [SORT_ORDERS.desc]: sortPearlsByMaxYieldInDesc,
  },
};

export const getPearlsSortFunction = (sortValue, order) => SORT_FUNCTIONS[sortValue][order];

export const getSortedPearls = (pearls, sortValue, order) => {
  if (pearls?.length && sortValue && order && order !== SORT_ORDERS.none) {
    return [...pearls].sort(getPearlsSortFunction(sortValue, order));
  }

  return pearls;
};
