import pearlHuntAbi from "./abi/PearlHunt.json";
import { pearlHuntAddress } from "../constants/constants";
import { contractFactory } from "./index";

export const enterPearlHuntCompetition = async (account, pearlId, hashTgHandle) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const PearlHunt = contractFactory({
    abi: pearlHuntAbi,
    address: pearlHuntAddress,
  });

  const method = PearlHunt.methods.enter(pearlId, hashTgHandle);

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
    })
    .once("confirmation", async (res) => {
      try {
        console.log("Success", { res }); // add a toaster here
        // return "sale_success";
        return res;
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        return error;
      }
    });
};

export const isClamClaimer = async (account) => {
  const ClamClaimer = contractFactory({
    abi: pearlHuntAbi,
    address: pearlHuntAddress,
  });
  const isClaimer = await ClamClaimer.methods.isClamClaimer(account).call();

  return isClaimer;
};

export const lastWinner = async () => {
  const PearlHunt = contractFactory({
    abi: pearlHuntAbi,
    address: pearlHuntAddress,
  });
  const value = await PearlHunt.methods.lastWinnerAddress().call();

  return value;
};

export const accountPearlCount = async (account) => {
  const PearlHunt = contractFactory({
    abi: pearlHuntAbi,
    address: pearlHuntAddress,
  });
  const value = await PearlHunt.methods.account2pearlCount(account).call();

  return value;
};

export default {
  enterPearlHuntCompetition,
  lastWinner,
  accountPearlCount,
};
