import { formatUnits } from "@ethersproject/units";

export const sortClamsById = ({ clamId: clamId1 }, { clamId: clamId2 }) =>
  parseInt(clamId1) - parseInt(clamId2);

export const formatShell = (value) => (value ? formatUnits(String(value), 18) : "0");
