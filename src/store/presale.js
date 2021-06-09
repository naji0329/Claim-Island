import { Store } from "pullstate";

export const PresaleStore = new Store({
  cap: "0",
  totalSupply: "0",
  progress: undefined,
  salePrice: "0",
  isStarted: false,
});
