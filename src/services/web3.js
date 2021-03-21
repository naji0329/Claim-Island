import Web3 from 'web3';

const RPC_URL = "http://localhost:8545";
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 });

// let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const getWeb3 = () => {
  const web3 = new Web3(httpProvider)
  return web3
};

const getContract = (abi, address, contractOptions) => {
  const web3 = getWeb3()
  return new web3.eth.Contract(abi, address, contractOptions)
}

export { getWeb3, getContract, httpProvider }
