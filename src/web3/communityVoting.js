import communityVotingAbi from "./abi/CommunityVoting.json";
import { communityVotingAddress } from "../constants/constants";
import { contractFactory } from "./index";

export const voteOptionOne = async (account) => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const method = voting.methods.voteOptionOne();
  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
    })
    .once("confirmation", async () => {
      try {
        console.log("Success"); // add a toaster here
        // callback("sale_success");
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        // errCallback(error.message);
      }
    });
};

export const voteOptionTwo = async (account) => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const method = voting.methods.voteOptionTwo();
  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
    })
    .once("confirmation", async () => {
      try {
        console.log("Success"); // add a toaster here
        // callback("sale_success");
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        // errCallback(error.message);
      }
    });
};

export const voteOptionThree = async (account) => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const method = voting.methods.voteOptionThree();
  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
    })
    .once("confirmation", async () => {
      try {
        console.log("Success"); // add a toaster here
        // callback("sale_success");
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        // errCallback(error.message);
      }
    });
};

export const votesForOptionOne = async () => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const optionOne = await voting.methods.OPTION_ONE().call();
  const value = await voting.methods.votesFor(optionOne).call();

  return value / 1e18;
};

export const votesForOptionTwo = async () => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const optionTwo = await voting.methods.OPTION_TWO().call();
  const value = await voting.methods.votesFor(optionTwo).call();

  return value / 1e18;
};

export const votesForOptionThree = async () => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const optionThree = await voting.methods.OPTION_THREE().call();
  const value = await voting.methods.votesFor(optionThree).call();

  return value / 1e18;
};

export const hasAccountedVoted = async (account) => {
  const voting = contractFactory({
    abi: communityVotingAbi,
    address: communityVotingAddress,
  });

  const value = await voting.methods.hasUserVoted(account).call();

  return value;
};
