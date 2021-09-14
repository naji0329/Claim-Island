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

//// add test contracts here
export const shellTokenAddress = "0xb3f768D115B234Ac39B21D40Cb5E4D530AdAbea4"
export const clamNFTAddress = "0xAbF5E799B79B9DD2AfE8766EA672257bb2c96EB8"
export const gemTokenAddress = "0xBbdb7f29e9D40E8317d8E7cf0552846D3F2251F1"
export const gemLockerAddress = "0xE90aB579610a46fAE5d8eb892Cf1533DA3cd976E"
export const pearlProductionTimeReductionAddress = "0x93CdD7c46504cAC2E3c2c6BdAfc3Cc2866E94127"
export const bankAddress = "0x8D2592412AB893cE5048d836c49147993C3eBEE3"
export const pearlDnaDecoderAddress = "0xde89e60e8954880604D1141365Af00aCD3085365"
export const pearlNFTAddress = "0x1cB9Abaf22cB2D41808c998BbC07EE9e773a007A"
export const pearlBurnerAddress = "0xD0772158DFcedf5E067c2E50083BC7EC019BDE37"
export const rngAddress = "0x2E1179D2d8c393499Dd65B9a3b3349e64eb2c6a6"
export const dnaDecoderAddress = "0x787E0903fF061a901255cb95dd2c645f956D4D1B"
export const clamBonusAddress = "0xD434b21B5F9E3163e8FBDF2FB698A17E443e80D1"
export const clamLotteryAddress = "0xBecf0e8f5DE07316DC6E2f317775fAd27d4695B6"
export const clamShopAddress = "0x96930F0667701D7A24B563138Fe0A34ACC0d2E9e"
export const pearlFarmAddress = "0xb073dD56EDc93Ea80Bd3cBbB62eB2093aDAa5903"

// export const shellTokenAddress = "0x6BD2ce3D5556799464Aa4737a1742C1bC6DD2304";
// export const clamNFTAddress = "0x48F38cfac50f34Eec654a2Cabf219fB31bA39394";
// export const gemTokenAddress = "0xae78ECf8aFbA0b9447E82b5Cbd519DE74FFCc4e7";
// export const gemLockerAddress = "0x50E571Db905936163775325f3d4B1Eb4ADfFf206";
// export const pearlProductionTimeReductionAddress = "0x8Fd9d0c0f49956c0d87Dda967ce45fe7c3b6b10B";
// export const bankAddress = "0x78573464595f57BB36Bf2AdCE7159BF279E98Fc9";
// export const pearlDnaDecoderAddress = "0x09050Fa6E6cADA3B87c7BA8Db9D0a545BB506f0a";
// export const pearlNFTAddress = "0x526b57f9D6126BBB91A44c38A405D68C1adB741a";
// export const pearlBurnerAddress = "0x0c2d5Bc9a8c51B6f865609257627Af4E834ECFa7";
// export const rngAddress = "0xf6fEEA84B09c28aA823B279D30b8cbC0042e4844";
// export const dnaDecoderAddress = "0xa931f40e73F094f9AEB4c8549833Ff1aB5DDEd17";
// export const clamBonusAddress = "0x00D45Bd841d878698Ad57f7210222Ea1Ace51110";
// export const clamShopAddress = "0x5B71fc3FE3e3C299fd5713F0E5Fbf5611BD152b5";
// export const pearlFarmAddress = "0xd5EcaFd95824E7d443913b5D284950CeC742347b";

//// end of test contracts

//// contracts already deployed to mainnet
// export const shellTokenAddress = "0x01c16da6E041Cf203959624Ade1F39652973D0EB";
// export const clamNFTAddress = "0x77ab76cc8193cafbe7ec748d52e57b25d184b311";
// export const rngAddress = "0xbacdF6F20DC405574C7c1e1a7cbAB06107d94DEc";
// export const dnaDecoderAddress = "0xb9cCd96b2D6B9733b97Ad17BA4395Ee37ef0312f";
//// end

export const multicallAddress = {
  [ClamIslandChain.BSC]: "0x0AD12d0cF5137e51e82B486381f4a6E4cbddE2F1",
  [ClamIslandChain.Localhost]: localhostMulticallAddress,
  [ClamIslandChain.BSC_TESTNET]: "0x28d387c0405Fb8eE7bBeB92A6D783A8436076487",
};

export const zapAddress = "0x25AE8E764b0c8318c093d8eFdd03000b442bb56a";

// legacy contracts
export const clamPresaleAddress = "0xAAEB1Ea585DbeF06349ac371EBBA54efa0713D1D";
export const shellPresaleAddress = "0x28D51F0E6CC2138fB134986423cb7429E713763E";
export const communityVotingAddress = "0x000F56780E4DC3f619A08EDf84948780be5C83Cf";
export const clamClaimersAddress = "0xDaF219f41931B4833A71B9D08881491010246691";

export const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
