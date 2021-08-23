import BigNumber from "bignumber.js";
/**
 * BigNumber string formatting
 */

export const formatBN = (amt, position) => {
  const amount = new BigNumber(amt);

  if (amount.lt(new BigNumber(1))) {
    return pad(amount.precision(position, BigNumber.ROUND_FLOOR).toFixed(), position);
  }
  return delineate(amount.toFixed(position, BigNumber.ROUND_FLOOR));
};

function delineate(bnStr) {
  const parts = bnStr.split(".");
  return parts[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "." + parts[1];
}

function pad(bnStr, position) {
  if (!bnStr.includes(".")) {
    bnStr += ".";
  }

  const parts = bnStr.split(".");
  for (let i = 0; i < position - parts[1].length; i++) {
    bnStr += "0";
  }

  return bnStr;
}
