import BigNumber from "bignumber.js";

import { formatNumberToLocale } from "./formatNumberToLocale";

const msInDay = 86400000;

export const getMaxApr = (pearlDataValues, maxBoostIn, bonusRewards) => {
  const { pearlPrice, birthTime } = pearlDataValues;
  const pearlPriceBN = new BigNumber(pearlPrice);

  return formatNumberToLocale(
    new BigNumber(bonusRewards)
      .minus(pearlPriceBN)
      .div(pearlPriceBN)
      .div(((Math.ceil((Date.now() - birthTime) / msInDay) + maxBoostIn / msInDay) % 72) + 30)
      .multipliedBy(365 * 100),
    2
  );
};

export const getMaxRoi = (pearlDataValues, bonusRewards) => {
  const { pearlPrice } = pearlDataValues;
  const pearlPriceBN = new BigNumber(pearlPrice);

  return formatNumberToLocale(
    new BigNumber(bonusRewards).minus(pearlPriceBN).div(pearlPriceBN).multipliedBy(100),
    2
  );
};
