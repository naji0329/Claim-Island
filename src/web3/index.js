import getWeb3 from "./getWeb3";

export const web3 = getWeb3();
export const contractFactory = ({ abi, address }) =>
  new web3.eth.Contract(abi, address);
