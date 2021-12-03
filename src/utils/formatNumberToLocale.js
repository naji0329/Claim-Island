export const formatNumberToLocale = (num, precision) => {
  return (+parseFloat(num).toFixed(precision)).toLocaleString();
}
