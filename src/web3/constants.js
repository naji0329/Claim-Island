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
export const shellTokenAddress = "0xb3f768D115B234Ac39B21D40Cb5E4D530AdAbea4";
export const clamNFTAddress = "0x6190Aa95C9Ac532A8Ea15605163451DAb3F85E65";
export const gemTokenAddress = "0xBbdb7f29e9D40E8317d8E7cf0552846D3F2251F1";
export const gemLockerAddress = "0xE5827CF0994dcBcd14e0e052F84faFc1B6459D5D";
export const pearlProductionTimeReductionAddress = "0xbacdF6F20DC405574C7c1e1a7cbAB06107d94DEc";
export const bankAddress = "0xb9cCd96b2D6B9733b97Ad17BA4395Ee37ef0312f";
export const pearlDnaDecoderAddress = "0x81d8AcA8eE8199E5FbFBA2bbd75e49E07aBED68f";
export const pearlNFTAddress = "0x792Ce8Ea57f65C292990e1b2AE86902DDa1f0a2E";
export const pearlBurnerAddress = "0x9e00DdE8263B46FC67a602b95fbD9A8aE240e58D";
export const rngAddress = "0xbCD9B1Fa013060dA6937a5BCBd63Da22C7518eDc";
export const dnaDecoderAddress = "0x05AB5F88bE1aFDEB6eF23136b1f398e2a5d54494";
export const clamBonusAddress = "0x225B00316580c1eD1C878BBe0F2D7D864c1299d8";
export const clamShopAddress = "0x74f3dc50456c757a2455BFD661C2979A5e56338f";
export const pearlFarmAddress = "0x5Ef121f2D160A3fae2CBA6A628ac3253C575A192";

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
export const pancakeRouterAddress = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3";

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
