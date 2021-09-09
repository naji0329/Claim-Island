import Web3 from "web3";

const RPC_URL = process.env.REACT_APP_RPC_URL;
const TESTNET = process.env.REACT_APP_BSC_TESTNET_FORK;

export default () => {
  if (window.web3 && typeof window.web3 !== "object") {
    return window.web3;
  }
  let web3;
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    if (TESTNET) {
      web3.setProvider(RPC_URL);
    }
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  }
  window.web3 = web3;
  return window.web3;
};
