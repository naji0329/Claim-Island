const ClamIslandChain = {
  BSC: 56,
  BSC_TESTNET: 97,
  Localhost: 1337,
  Hardhat: 31337,
};

const localhostMulticallAddress =
  process.env.REACT_APP_BSC_TESTNET_FORK === "true"
    ? "0x28d387c0405Fb8eE7bBeB92A6D783A8436076487"
    : "0x0AD12d0cF5137e51e82B486381f4a6E4cbddE2F1";

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
export const clamBonusAddress = "0x15b540771a373c0e8a082d0dF4cDBaDddBc106cc";
export const clamLotteryAddress = "0x5b9d7dCC720f6B1bE1c8f8fAd54e89DBa57B2036";
export const clamShopAddress = "0xb073dD56EDc93Ea80Bd3cBbB62eB2093aDAa5903";
export const pearlFarmAddress = "0x6e4942Cc0FF4138A5148f96efc68F95C2f14F973";

export const communityRewardsAddress = "0x6684C3Fb0a85cE9B05187c770c4aa6A824Ed590C";

export const multicallAddress = {
  [ClamIslandChain.BSC]: "0x0AD12d0cF5137e51e82B486381f4a6E4cbddE2F1",
  [ClamIslandChain.Localhost]: localhostMulticallAddress,
  [ClamIslandChain.BSC_TESTNET]: "0x28d387c0405Fb8eE7bBeB92A6D783A8436076487",
};

export const zapAddress = "0x25AE8E764b0c8318c093d8eFdd03000b442bb56a";
export const pancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
// export const pancakeRouterAddress = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"; // testnet

// legacy contracts
export const clamPresaleAddress = "0xAAEB1Ea585DbeF06349ac371EBBA54efa0713D1D";
export const shellPresaleAddress = "0x28D51F0E6CC2138fB134986423cb7429E713763E";
export const communityVotingAddress = "0x000F56780E4DC3f619A08EDf84948780be5C83Cf";
export const clamClaimersAddress = "0xDaF219f41931B4833A71B9D08881491010246691";

export const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

// tokens
export const wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
// export const wBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; // testnet
export const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
// export const BUSD = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"; // testnet
