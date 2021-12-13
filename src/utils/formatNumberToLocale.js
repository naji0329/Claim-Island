export const formatNumberToLocale = (num, precision, wei = false) => {
  if (wei) {
    return (+(parseFloat(num) / 1e18).toFixed(precision)).toLocaleString();
  } else {
    return (+parseFloat(num).toFixed(precision)).toLocaleString();
  }
};
