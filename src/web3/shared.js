import { formatUnits } from "@ethersproject/units";

export const formatFromWei = (value) => (value ? formatUnits(value, 18) : "0");