import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";

export const formatFromWei = (value) => (value ? formatUnits(value, 18) : "0");

export const formatToWei = (value) => (value ? Web3.utils.toWei(value) : "0");
