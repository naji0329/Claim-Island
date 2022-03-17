import mainnetAddresses from "./mainnet";
import testnetAddresses from "./testnet";

// this sets addresses of testnet when running locally. Change this if mainnet addresses are desired
const addresses =
  process.env.NODE_ENV === "development" || window.location.hostname === "clam-island-beta.web.app"
    ? mainnetAddresses
    : mainnetAddresses;

export const ClamIslandChain = {
  BSC: 56,
  BSC_TESTNET: 97,
  Localhost: 1337,
  Hardhat: 31337,
};

// legacy contracts
export const clamPresaleAddress = "0xAAEB1Ea585DbeF06349ac371EBBA54efa0713D1D";
export const shellPresaleAddress = "0x28D51F0E6CC2138fB134986423cb7429E713763E";
export const communityVotingAddress = "0x000F56780E4DC3f619A08EDf84948780be5C83Cf";
export const clamClaimersAddress = "0xDaF219f41931B4833A71B9D08881491010246691";

export const zeroHash = "0x0000000000000000000000000000000000000000000000000000000000000000";

export const communityRewardsAddress = "0x6684C3Fb0a85cE9B05187c770c4aa6A824Ed590C";

export const {
  shellTokenAddress,
  clamNFTAddress,
  gemTokenAddress,
  gemLockerAddress,
  gemLockerV2Address,
  pearlProductionTimeReductionAddress,
  bankAddress,
  pearlDnaDecoderAddress,
  pearlNFTAddress,
  pearlBurnerAddress,
  rngAddress,
  dnaDecoderAddress,
  clamLotteryAddress,
  clamShopAddress,
  pearlFarmAddress,
  pearlHuntAddress,
  gemOracleAddress,
  clamExchangeAddress,
  pancakeRouterAddress,
  multicallAddress,
  wBNB,
  BUSD,
  zapAddress,
} = addresses;
