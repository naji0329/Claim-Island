import { gemTokenAddress, shellTokenAddress } from "constants/constants";

const mainnetPools = {
  [gemTokenAddress]: {
    name: `GEM`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    risk: "High Risk",
    isSingleStake: true,
    isNative: true,
  },
  [shellTokenAddress]: {
    name: `SHELL`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    risk: "High Risk",
    isSingleStake: true,
    isNative: true,
  },
  "0x4FF96A563c257152d3766DF8116AcCEB2146775c": {
    name: `SHELL-BNB`, // real
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  "0xD0Bdd50F090c7A09230a9eE9B996676D15b5fec5": {
    name: `GEM-BNB`, // real
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  "0xdD901faf9652D474b0A70263E13DA294990d49AE": {
    name: `BOG-BNB`, // real
    images: [
      "https://assets.coingecko.com/coins/images/15980/small/DNZDqtH2_400x400.png?1622530803",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16": {
    // mainnet
    name: `BNB-BUSD`, // real
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
    risk: "Low Risk",
  },
  "0xEa26B78255Df2bBC31C1eBf60010D78670185bD0": {
    name: `ETH-USDC`, // real usdc-eth
    images: [
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    ],
    risk: "Low Risk",
  },
  "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc": {
    name: `BNB-ETH`, // real
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    ],
    risk: "Medium Risk",
  },
  "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082": {
    name: `BNB-BTCB`, // real bnb-btcb
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/14108/small/Binance-bitcoin.png",
    ],
    risk: "Medium Risk",
  },
  "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0": {
    name: `CAKE-BNB`, // real
    images: [
      "https://assets.coingecko.com/coins/images/12632/small/IMG_0440.PNG",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    risk: "Medium Risk",
  },
  "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F": {
    name: `ADA-BNB`, // real
    images: [
      "https://assets.coingecko.com/coins/images/975/small/cardano.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    risk: "Medium Risk",
  },
  "0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF": {
    name: `DOT-BNB`, // real
    images: [
      "https://assets.coingecko.com/coins/images/12171/small/aJGBjJFU_400x400.jpg",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    risk: "Medium Risk",
  },
  "0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1": {
    name: `USDC-BUSD`, // real
    images: [
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
    risk: "Very Low Risk",
  },
  "0xEc6557348085Aa57C72514D67070dC863C0a5A8c": {
    name: `USDC-USDT`, // real
    images: [
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      "https://assets.coingecko.com/coins/images/325/small/Tether-logo.png?1598003707",
    ],
    risk: "Very Low Risk",
  },
};

const testnetPools = {
  [gemTokenAddress]: {
    name: `$GEM`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    risk: "High Risk",
    isSingleStake: true,
    isNative: true,
  },
  [shellTokenAddress]: {
    name: `$SHELL`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    risk: "High Risk",
    isSingleStake: true,
    isNative: true,
  },
  "0xC5080b85bd6F7e926730892D2ED7dE24D574F4D2": {
    name: `GEM - BNB`,
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  "0x3783898F93dc4eF532Dc7128906f4E75FE29Ed87": {
    name: `SHELL - BNB`, // dummy bnb - carapace
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
};

// this sets addresses of testnet when running locally. Change this if mainnet addresses are desired
export default process.env.NODE_ENV === "development" ||
window.location.hostname === "clam-island-beta.web.app"
  ? testnetPools
  : mainnetPools;
