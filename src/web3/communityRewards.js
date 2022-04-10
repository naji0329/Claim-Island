import communityRewardsAbi from "./abi/CommunityRewards.json";
import { communityRewardsAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getOracleFee } from "./rng";

export const claimReward = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const CommunityAwardee = contractFactory({
    abi: communityRewardsAbi,
    address: communityRewardsAddress,
  });

  const oracleFee = await getOracleFee();
  const amount = Number(oracleFee);

  const method = CommunityAwardee.methods.claimReward();

  const gasEstimation = await method.estimateGas({
    from: account,
    value: amount,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
      value: amount,
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

export const collectReward = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const CommunityAwardee = contractFactory({
    abi: communityRewardsAbi,
    address: communityRewardsAddress,
  });

  const method = CommunityAwardee.methods.collectReward();

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

export const isAwardee = async (account) => {
  const CommunityAwardee = contractFactory({
    abi: communityRewardsAbi,
    address: communityRewardsAddress,
  });
  const isClaimer = await CommunityAwardee.methods.isAwardee(account).call();

  return isClaimer;
};

export const userRewards = async (address) => {
  if (address) {
    const CommunityAwardee = contractFactory({
      abi: communityRewardsAbi,
      address: communityRewardsAddress,
    });
    const value = await CommunityAwardee.methods.userRewards(address).call();
    return value;
  }
};

export const rngRequestHashFromRewardBeneficiary = async (address) => {
  if (address) {
    const CommunityAwardee = contractFactory({
      abi: communityRewardsAbi,
      address: communityRewardsAddress,
    });
    const value = await CommunityAwardee.methods
      .rngRequestHashFromRewardBeneficiary(address)
      .call();
    return value === "0x0000000000000000000000000000000000000000000000000000000000000000"
      ? undefined
      : value;
  }
};

export default {
  claimReward,
  collectReward,
  isAwardee,
  userRewards,
  rngRequestHashFromRewardBeneficiary,
};
