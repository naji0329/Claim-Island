import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";
import { store } from "../store/redux";

export const formatFromWei = (value) => (value ? formatUnits(value, 18) : "0");

export const formatToWei = (value) => (value ? Web3.utils.toWei(value) : "0");

export const getAccount = () => {
  const address = store.getState().account.address;
  if (address) return address;
  throw new Error("No address found");
};
