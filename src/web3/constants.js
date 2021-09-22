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
export const clamNFTAddress = "0x1b7770F1ad27449E7816313A358a3Fb3fD7be713"
export const gemTokenAddress = "0xBbdb7f29e9D40E8317d8E7cf0552846D3F2251F1"
export const gemLockerAddress = "0x47A2e34C242d7ED066006efb18D6E2c12a53E338"
export const pearlProductionTimeReductionAddress = "0x1f2860A2b475FE15C2915b5031766B9c80D5cf18"
export const bankAddress = "0x6D1C4149e8F173ca8fa7EBE6f53B07dE3cDfEc58"
export const pearlDnaDecoderAddress = "0x6684C3Fb0a85cE9B05187c770c4aa6A824Ed590C"
export const pearlNFTAddress = "0x38517600C51dd2D1cB1F0dAb5C0A6837Ab80E39a"
export const pearlBurnerAddress = "0xF9e898b31Faf85E87646c020eAd19A8b4215De2b"
export const rngAddress = "0xc32859504a5c36C17696837759A57F9d17ab9d8a"
export const dnaDecoderAddress = "0xa737353e19DB3AF5e156BD764ee1338480584913"
export const clamBonusAddress = "0x1B241240294E15B1d7d965d619183a6286BAA1ff"
export const clamLotteryAddress = "0x029284c4ba7104ea25FFfD13f73F0EE3E30DA470"
export const clamShopAddress = "0x4304cA81463992A55430764d8c1abc42c3E679C5"
export const pearlFarmAddress = "0xfd24e647C0c8aafaD77A1FCcbeB1d4b039198534"

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
// export const pancakeRouterAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
export const pancakeRouterAddress = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"; // testnet

// legacy contracts
export const clamPresaleAddress = "0xAAEB1Ea585DbeF06349ac371EBBA54efa0713D1D";
export const shellPresaleAddress = "0x28D51F0E6CC2138fB134986423cb7429E713763E";
export const communityVotingAddress = "0x000F56780E4DC3f619A08EDf84948780be5C83Cf";
export const clamClaimersAddress = "0xDaF219f41931B4833A71B9D08881491010246691";

export const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

// tokens
// export const wBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const wBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; // testnet
// export const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
export const BUSD = "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"; // testnet
