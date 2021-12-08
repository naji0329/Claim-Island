import mainnetAddresses from "./mainnet";
import testnetAddresses from "./testnet";

// this sets addresses of testnet when running locally. Change this if mainnet addresses are desired
const addresses =
  process.env.NODE_ENV === "development" || window.location.hostname === "clam-island-beta.web.app"
    ? testnetAddresses
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

export const zapAddress = "0x25AE8E764b0c8318c093d8eFdd03000b442bb56a";

export const shellTokenAddress = addresses.shellTokenAddress;
export const clamNFTAddress = addresses.clamNFTAddress;
export const gemTokenAddress = addresses.gemTokenAddress;
export const gemLockerAddress = addresses.gemLockerAddress;
export const pearlProductionTimeReductionAddress = addresses.pearlProductionTimeReductionAddress;
export const bankAddress = addresses.bankAddress;
export const pearlDnaDecoderAddress = addresses.pearlDnaDecoderAddress;
export const pearlNFTAddress = addresses.pearlNFTAddress;
export const pearlBurnerAddress = addresses.pearlBurnerAddress;
export const rngAddress = addresses.rngAddress;
export const dnaDecoderAddress = addresses.dnaDecoderAddress;
export const clamLotteryAddress = addresses.clamLotteryAddress;
export const clamShopAddress = addresses.clamShopAddress;
export const pearlFarmAddress = addresses.pearlFarmAddress;
export const pearlHuntAddress = addresses.pearlHuntAddress;
export const gemOracleAddress = addresses.gemOracleAddress;
export const clamExchangeAddress = addresses.clamExchangeAddress;

export const pancakeRouterAddress = addresses.pancakeRouterAddress;
export const multicallAddress = addresses.multicallAddress;

export const wBNB = addresses.wBNB;
export const BUSD = addresses.BUSD;
