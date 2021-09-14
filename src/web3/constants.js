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
export const shellTokenAddress = "0xBf7c5EA332af71C2ccCB890AfB963c8Fc3a70632";
export const clamNFTAddress = "0xC7417cb112488bEb4eBbCc6f518f5E9E2f4FA572";
export const gemTokenAddress = "0x88F502AaE684eb5EA515c2ff4Fb19716cd5B8a14";
export const gemLockerAddress = "0xbf01c7c478462cD1e1FDFf7d4C8db2c88EF6A676";
export const pearlProductionTimeReductionAddress = "0xfC47D5e69a7574D4aacA574A5312d7afF19a5103";
export const bankAddress = "0xa6f97093B83102D65Fa07ca0C6D7A7f0A0B3F85A";
export const pearlDnaDecoderAddress = "0x8E278074Ab0604fd8c7CA32507D02CcB2e407bdA";
export const pearlNFTAddress = "0x25AE8E764b0c8318c093d8eFdd03000b442bb56a";
export const pearlBurnerAddress = "0x704e5430A63749E0D8eA44066065d14E1Fbf9DA4";
export const rngAddress = "0xc4E021a682a3A2109c4E709d37EbD1F22cE664d5";
export const dnaDecoderAddress = "0xbC009070Bd1b18CCe6993F8e3dF47D4e7B404Db1";
export const clamBonusAddress = "0x18ABb319A9738D0637A70967E61082088b077AAD";
export const clamLotteryAddress = "0x672A2Afc9DE934Bc355f5c7A796D265712704021";
export const clamShopAddress = "0xDaF219f41931B4833A71B9D08881491010246691";
export const pearlFarmAddress = "0x4cb38172d52685C139B84cf8E3F912448d13cc8e";

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
