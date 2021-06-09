import { Store } from "pullstate";

export const AccountStore = new Store({
  bnbBalance: "0",
  clamBalance: "0",
  error: undefined,
  isConnected: undefined,
});
