import getWeb3 from "./getWeb3";

export const web3 = getWeb3();
export const contractFactory = ({ abi, address }) => new web3.eth.Contract(abi, address);
export const getCurrentBlockTimestamp = async () => {
  const currentBlock = await web3.eth.getBlockNumber();
  return (await web3.eth.getBlock(currentBlock)).timestamp;
};
