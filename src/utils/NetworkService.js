import { web3 } from "../web3";

const productionNetwork = {
  id: 1,
  jsonrpc: "2.0",
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x38",
      chainName: "Binance Smart Chain Mainnet",
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      nativeCurrency: {
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://bscscan.com"],
    },
  ],
};

const testNetwork = {
  id: 1,
  jsonrpc: "2.0",
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x61",
      chainName: "Binance Smart Chain Testnet",
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      nativeCurrency: {
        symbol: "tBNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://testnet.bscscan.com"],
    },
  ],
};

const NetworkService = {
  createOrSwitchNetwork: async () => {
    let rpcData =
      process.env.REACT_APP_BSC_TESTNET_FORK === "true" ? testNetwork : productionNetwork;

    return web3.currentProvider.sendAsync(rpcData, (err, result) => {});
  },
};

export default NetworkService;
