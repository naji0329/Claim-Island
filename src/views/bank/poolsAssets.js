import { gemTokenAddress, shellTokenAddress } from "web3/constants";

export const poolAssets = {
  [gemTokenAddress]: {
    name: `$GEM`,
    apy: `82.3%`,
    multiplier: `40x`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    risk: "High Risk",
    isSingleStake: true,
    isNative: true,
  },
  [shellTokenAddress]: {
    name: `$SHELL`,
    apy: `82.3%`,
    multiplier: `40x`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    risk: "High Risk",
    isSingleStake: true,
    isNative: true,
  },
  "0x4FF96A563c257152d3766DF8116AcCEB2146775c": {
    name: `SHELL - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  "0xD0Bdd50F090c7A09230a9eE9B996676D15b5fec5": {
    name: `GEM - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  // "0xd7f3F922578480a8E6AD71f020C202505A2BCcb5": {
  //   // testnet
  //   name: `SHELL - BNB`, // dummy bnb - carapace
  //   apy: `82.3%`,
  //   multiplier: `40x`,
  //   images: [
  //     "https://clamisland.fi/favicon/android-chrome-192x192.png",
  //     "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
  //   ],
  //   isNative: true,
  //   risk: "High Risk",
  // },
  // "0xe981Bd77432db9F596eAA3836EbE3Fc2E2264039": {
  //   // testnet
  //   name: `GEM - BNB`, // dummy  bnb - jade
  //   apy: `82.3%`,
  //   multiplier: `40x`,
  //   images: [
  //     "https://clamisland.fi/favicon/android-chrome-192x192.png",
  //     "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
  //   ],
  //   isNative: true,
  //   risk: "High Risk",
  // },
  "0xdD901faf9652D474b0A70263E13DA294990d49AE": {
    name: `BOG - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/15980/small/DNZDqtH2_400x400.png?1622530803",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    isNative: true,
    risk: "High Risk",
  },
  // "0xe0e92035077c39594793e61802a350347c320cf2": {
  // testnet
  "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16": {
    // mainnet
    name: `BNB - BUSD`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
    risk: "Low Risk",
  },
  "0xEa26B78255Df2bBC31C1eBf60010D78670185bD0": {
    name: `ETH - USDC`, // real usdc-eth
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
    ],
    risk: "Low Risk",
  },
  "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc": {
    name: `BNB - ETH`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    ],
    risk: "Medium Risk",
  },
  "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082": {
    name: `BNB - BTCB`, // real bnb-btcb
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/14108/small/Binance-bitcoin.png",
    ],
    risk: "Medium Risk",
  },
  "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0": {
    name: `CAKE - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/12632/small/IMG_0440.PNG",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    risk: "Medium Risk",
  },
  "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F": {
    name: `ADA - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/975/small/cardano.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    risk: "Medium Risk",
  },
  "0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF": {
    name: `DOT - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/12171/small/aJGBjJFU_400x400.jpg",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
    risk: "Medium Risk",
  },

  "0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1": {
    name: `USDC - BUSD`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
    risk: "Very Low Risk",
  },
};
