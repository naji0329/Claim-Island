import Web3 from 'web3';

// import * as ClamToken from '../contracts/Clam.json';
// import * as PearlToken from '../contracts/PearlCore.json';
// import * as ClamCore from '../contracts/ClamNftToken.json';
// import * as PearlCore from '../contracts/PearlNftToken.json';

const CLAM_TOKEN = process.env.REACT_APP_CLAM_TOKEN;
const PEARL_TOKEN = process.env.REACT_APP_PEARL_TOKEN;
const CLAM_CORE = process.env.REACT_APP_CLAM_CORE;
const PEARL_CORE = process.env.REACT_APP_PEARL_CORE;
const RPC_URL = process.env.REACT_APP_RPC_URL;

const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 });

const getWeb3 = () => {
  const web3 = new Web3(httpProvider);
  return web3;
};

const getContract = (abi, address, contractOptions) => {
  const web3 = getWeb3();
  return new web3.eth.Contract(abi, address, contractOptions);
};

// const getClamTokenContract = () => {
//   const contract = getContract(ClamToken.abi, CLAM_TOKEN, {});
//   return contract;
// };

// const getPearlTokenContract = () => {
//   const contract = getContract(PearlToken.abi, PEARL_TOKEN, {});
//   return contract;
// };

// const getClamNFTContract = () => {
//   const contract = getContract(ClamCore.abi, CLAM_CORE, {});
//   return contract;
// };

// const getPearlNFTContract = () => {
//   const contract = getContract(PearlCore.abi, PEARL_CORE, {});
//   return contract;
// };

export {
  getWeb3,
  getContract,
  // getClamTokenContract,
  // getPearlTokenContract,
  // getClamNFTContract,
  // getPearlNFTContract,
  httpProvider
};
