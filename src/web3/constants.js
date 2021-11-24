export const ClamIslandChain = {
  BSC: 56,
  BSC_TESTNET: 97,
  Localhost: 1337,
  Hardhat: 31337,
};

const localhostMulticallAddress =
  process.env.REACT_APP_BSC_TESTNET_FORK === "true"
    ? "0x28d387c0405Fb8eE7bBeB92A6D783A8436076487"
    : "0x0AD12d0cF5137e51e82B486381f4a6E4cbddE2F1";

export const multicallAddress = {
  [ClamIslandChain.BSC]: "0x0AD12d0cF5137e51e82B486381f4a6E4cbddE2F1",
  [ClamIslandChain.Localhost]: localhostMulticallAddress,
  [ClamIslandChain.BSC_TESTNET]: "0x28d387c0405Fb8eE7bBeB92A6D783A8436076487",
};
// legacy contracts
export const clamPresaleAddress = "0xAAEB1Ea585DbeF06349ac371EBBA54efa0713D1D";
export const shellPresaleAddress = "0x28D51F0E6CC2138fB134986423cb7429E713763E";
export const communityVotingAddress = "0x000F56780E4DC3f619A08EDf84948780be5C83Cf";
export const clamClaimersAddress = "0xDaF219f41931B4833A71B9D08881491010246691";

export const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const communityRewardsAddress = "0x6684C3Fb0a85cE9B05187c770c4aa6A824Ed590C";

export const zapAddress = "0x25AE8E764b0c8318c093d8eFdd03000b442bb56a";

export const shellTokenAddress = "0x01c16da6E041Cf203959624Ade1F39652973D0EB";
export const clamNFTAddress = "0x77ab76cc8193cafbe7ec748d52e57b25d184b311";
export const gemTokenAddress = "0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a";
export const gemLockerAddress = "0x93CdD7c46504cAC2E3c2c6BdAfc3Cc2866E94127";
export const pearlProductionTimeReductionAddress = "0x8D2592412AB893cE5048d836c49147993C3eBEE3";
export const bankAddress = "0x1cB9Abaf22cB2D41808c998BbC07EE9e773a007A";
export const pearlDnaDecoderAddress = "0xD0772158DFcedf5E067c2E50083BC7EC019BDE37";
export const pearlNFTAddress = "0x16E091BCf0BBBb4517861C26541958033267bEFF";
export const pearlBurnerAddress = "0x49e3ceADdD501A7e558821e4633015B651FC9d9e";
export const rngAddress = "0xbacdF6F20DC405574C7c1e1a7cbAB06107d94DEc";
export const dnaDecoderAddress = "0xb9cCd96b2D6B9733b97Ad17BA4395Ee37ef0312f";
export const clamBonusAddress = "0x15b540771a373c0e8a082d0dF4cDBaDddBc106cc"; // deprecated
export const clamLotteryAddress = "0x5b9d7dCC720f6B1bE1c8f8fAd54e89DBa57B2036";
export const clamShopAddress = "0xb073dD56EDc93Ea80Bd3cBbB62eB2093aDAa5903";
export const pearlFarmAddress = "0x6e4942Cc0FF4138A5148f96efc68F95C2f14F973";
export const pearlHuntAddress = "0x3CefCe21F06bA801A97f7167E2292ea38854Df96";

export const pancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";

// tokens
export const wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

// TESTNET
// export const shellTokenAddress = "0x911088Cd9E4430C2170Ab47090F6B8fF69a21d53";
// export const clamNFTAddress = "0x59a064a6783ea249c1d50Bb3E397290261802146";
// export const gemTokenAddress = "0x6fB726cfe83da65FC2dDBF2aC0ba2DEd86dbbfbB";
// export const gemLockerAddress = "0xC01069c6E189946444DCD5Df8E31643E62F0c8d4";
// export const pearlProductionTimeReductionAddress = "0x8D4DD6cbB268790D71CE5eC89117Fb812Bde0f95";
// export const bankAddress = "0x9Cd2F4D1BA4A51204A67A77d08F97F56A4cBbD0F";
// export const pearlDnaDecoderAddress = "0xA2833952204C2c30DaF2D4a1C61dF7a87D4624dA";
// export const pearlNFTAddress = "0x397F5a4D99Bc31A0482EE3183c11191CF9b0A0c2";
// export const pearlBurnerAddress = "0xC8939b390bDcf564d75400f7f93A8Cd668b0eBdc";
// export const rngAddress = "0xcd513386a4E9fDf65DaA04d9c49547800dc8b1f6";
// export const dnaDecoderAddress = "0x68Bb6FAFDDAcbaE3d78D0E98f711E4A2e20fCb94";
// export const clamLotteryAddress = "0x1a3FF0d81912D07e482C3D73589936679224dCBB";
// export const clamShopAddress = "0x349614150425bd55a1B5753E99B598Ea9284Ef18";
// export const pearlFarmAddress = "0x9a373B19a8eAa0DF916923a3Bde4C3B7d05002d3";
// export const pearlHuntAddress = "0x59eb52cBa7998bCc7CE3aa8a58107d2f8629586E";

// export const pancakeRouterAddress = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";

// export const wBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
// export const BUSD = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
