import { Store } from "pullstate";

export const VotingStore = new Store({
  inProgress: false,
  complete: false,
  cancelled: false,
  error: false,
  alreadyVoted: false,
  walletConnected: false,
});
