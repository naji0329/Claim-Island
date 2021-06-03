import communityVotingAbi from "./abi/CommunityVoting.json";
import { communityVotingAddress } from "./constants";
import { contractFactory } from "./index";

export const voteOptionOne = async (account) => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  await voting.methods.voteOptionOne({ from: account });
};

export const voteOptionTwo = async (account) => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  await voting.methods.voteOptionTwo({ from: account });
};

export const voteOptionThree = async (account) => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  await voting.methods.voteOptionThree({ from: account });
};

export const votesForOptionOne = async () => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  const optionOne = await voting.methods.OPTION_ONE().call();
  const value = await voting.methods.votesFor(optionOne).call();

  return value;
};

export const votesForOptionTwo = async () => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  const optionTwo = await voting.methods.OPTION_TWO().call();
  const value = await voting.methods.votesFor(optionTwo).call();

  return value;
};

export const votesForOptionThree = async () => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  const optionThree = await voting.methods.OPTION_THREE().call();
  const value = await voting.methods.votesFor(optionThree).call();

  return value;
};

export const hasAccountedVoted = async (account) => {
  const voting = contractFactory({ abi: communityVotingAbi, address: communityVotingAddress });

  const value = await voting.methods.hasUserVoted(account).call();

  return value;
};
