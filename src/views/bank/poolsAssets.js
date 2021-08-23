import { gemTokenAddress, shellTokenAddress } from "../../web3/constants";

export const poolAssets = {
  [gemTokenAddress]: {
    name: `$GEM`,
    apy: `82.3%`,
    multiplier: `40x`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    isSingleStake: true,
  },
  [shellTokenAddress]: {
    name: `$SHELL`,
    apy: `82.3%`,
    multiplier: `40x`,
    images: ["https://clamisland.fi/favicon/android-chrome-192x192.png"],
    isSingleStake: true,
  },
  "0xAaf0A7603b9d45c5e2BE0c1b03Cf238168334Ce4": {
    name: `SHELL - BNB`, // dummy bnb - carapace
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
  },
  "0x72032eEcACF17c516dAd81298FDA8Abdc212AB06": {
    name: `GEM - BNB`, // dummy  bnb - jade
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://clamisland.fi/favicon/android-chrome-192x192.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
  },
  "0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082": {
    name: `BNB - BTCB`, // real bnb-btcb
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/14108/small/Binance-bitcoin.png",
    ],
  },
  "0x7213a321F1855CF1779f42c0CD85d3D95291D34C": {
    name: `ETH - BUSD`, // real busd-eth
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
  },
  "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16": {
    name: `BNB - BUSD`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
  },
  "0x74E4716E431f45807DCF19f284c7aA99F18a4fbc": {
    name: `BNB - ETH`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    ],
  },
  "0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1": {
    name: `USDC - BUSD`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
      "https://assets.coingecko.com/coins/images/9576/small/BUSD.png",
    ],
  },
  "0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF": {
    name: `DOT - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/12171/small/aJGBjJFU_400x400.jpg",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
  },
  "0x0eD7e52944161450477ee417DE9Cd3a859b14fD0": {
    name: `CAKE - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/12632/small/IMG_0440.PNG",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
  },
  "0x28415ff2C35b65B9E5c7de82126b4015ab9d031F": {
    name: `ADA - BNB`, // real
    apy: `82.3%`,
    multiplier: `40x`,
    images: [
      "https://assets.coingecko.com/coins/images/975/small/cardano.png",
      "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    ],
  },
};
