import BigNumber from "bignumber.js";

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

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

/**
 * @param {number} number number to be formatted
 * @param {number} decimals decimals, default is 3 if not specified
 * @param {string} fallBackSymbol this sumbol is returned if input number is null or undefined
 * @returns number formatted
 */
export const renderNumber = (number, decimals, fallBackSymbol) => {
  if (number !== 0 && !number) return fallBackSymbol || "";
  if (decimals !== undefined)
    return (
      number?.toLocaleString("EN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }) || ""
    );
  return number?.toLocaleString("EN") || fallBackSymbol || "";
};

/**
 * @param {number} number numberto be formatted
 * @param {number} decimals decimals, default is 3 if not specified
 * @param {string} fallBackSymbol this sumbol is returned if input number is null or undefined
 * @returns amount formatted in USD
 */
export const renderUsd = (number, decimals, fallBackSymbol) => {
  if (number !== 0 && !number) return fallBackSymbol || "";
  if (decimals !== undefined) {
    return number.toLocaleString("EN", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return number.toLocaleString("EN", {
    style: "currency",
    currency: "USD",
  });
};

/**
 * @param {number} percentage percentage to be formatted
 * @param {number} decimals decimals, default is 3 if not specified
 * @param {string} fallBackSymbol this sumbol is returned if input number is null or undefined
 * @returns number formatted in percentage, includes percentage symbol
 */
export const renderPercentage = (percentage, decimals, fallBackSymbol) => {
  if (percentage !== 0 && !percentage) return fallBackSymbol || "";
  return `${percentage.toLocaleString("EN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}%`;
};
