import clamNFTAbi from "./abi/Clam.json";
import clamShopAbi from "./abi/ClamShop.json";
import { clamNFTAddress, clamShopAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getOracleFee } from "./rng";
import { getRNGFromHashRequest } from "./rng";
import { zeroHash } from "../constants/constants";
import BigNumber from "bignumber.js";

const balanceOf = async ({ account, abi, address }) => {
  const token = contractFactory({ abi, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const accountClamBalance = async (account) => {
  const bal = await balanceOf({
    account,
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });
  return bal;
};

export const getMinPearlProductionDelay = async () => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const minPearlProductionDelay = await clamNft.methods.minPearlProductionDelay().call();
  return minPearlProductionDelay;
};

export const getMaxPearlProductionDelay = async () => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const maxPearlProductionDelay = await clamNft.methods.maxPearlProductionDelay().call();
  return maxPearlProductionDelay;
};

export const totalClamSupply = async () => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const totalSupply = await clamNft.methods.totalSupply().call();
  return totalSupply;
};

export const getClamIncubationTime = async () => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const value = await clamNft.methods.incubationTime().call();
  return value;
};

export const getClamData = async (tokenId) => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const value = await clamNft.methods.getClamData(tokenId).call();
  return value;
};

export const getClamByIndex = async (account, index) => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const value = await clamNft.methods.tokenOfOwnerByIndex(account, index).call();
  return value;
};

export const buyClam = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });

  const oracleFee = await getOracleFee();
  const amount = Number(oracleFee);

  const method = clamShop.methods.buyClam();

  const gasEstimation = await method.estimateGas({
    from: account,
    value: amount,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
      value: amount,
    })
    .once("confirmation", async (res) => {
      try {
        console.log("Success", { res }); // add a toaster here
        // return "sale_success";
        return res;
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        return error;
      }
    });
};

export const buyClamWithVestedTokens = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });

  const oracleFee = await getOracleFee();
  const amount = Number(oracleFee);

  const method = clamShop.methods.buyClamWithVestedTokens();

  const gasEstimation = await method.estimateGas({
    from: account,
    value: amount,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
      value: amount,
    })
    .once("confirmation", async (res) => {
      try {
        console.log("Success", { res }); // add a toaster here
        // return "sale_success";
        return res;
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        return error;
      }
    });
};

export const getPrice = async () => {
  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });
  const value = await clamShop.methods.getUpdatedPrice().call();
  return value;
};

export const getPriceUsd = async () => {
  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });
  const value = await clamShop.methods.priceUsd().call();
  return value;
};
export const getWeekSupply = async () => {
  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });
  const value = await clamShop.methods.clamsPerWeek().call();
  return value;
};

export const getWeekPurchased = async () => {
  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });
  const value = await clamShop.methods.mintedThisWeek().call();
  return value;
};

export const canUnlockGemVestedAmount = async (account) => {
  const clamShop = contractFactory({ abi: clamShopAbi, address: clamShopAddress });
  const value = await clamShop.methods.canUnlockGemVestedAmount(account).call();
  return value;
};

export const checkHasClamToCollect = async (address) => {
  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });

  const requestHash = await clamShop.methods.rngRequestHashForFarmedClam(address).call();
  if (requestHash === zeroHash) {
    return requestHash;
  }
  const rng = await getRNGFromHashRequest(requestHash);
  return rng;
};

export const collectClam = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });

  const method = clamShop.methods.collectClam();

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  return await method.send({
    from: account,
    gas: gasEstimation,
  });
};

export const ownerOfClam = async (tokenId) => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const owner = await clamNft.methods.ownerOf(tokenId).call();

  return owner;
};

export const prepTokenOfOwnerByIndexMulticall = (address, length) => {
  const contractCalls = [];
  for (let index = 0; index < Number(length); index++) {
    contractCalls.push([
      clamNFTAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "tokenOfOwnerByIndex",
          type: "function",
          inputs: [
            {
              type: "address",
              name: "owner",
            },
            {
              type: "uint256",
              name: "index",
            },
          ],
        },
        [address, index]
      ),
    ]);
  }

  return contractCalls;
};

export const prepClamDataMulticall = (tokenIds) => {
  const contractCalls = [];

  for (let index = 0; index < tokenIds.length; index++) {
    contractCalls.push([
      clamNFTAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "getClamData",
          type: "function",
          inputs: [
            {
              type: "uint256",
              name: "clamId",
            },
          ],
        },
        [tokenIds[index]]
      ),
    ]);
  }

  return contractCalls;
};

export const prepClamProducedPearlIds = (tokenIds) => {
  const contractCalls = [];

  for (let index = 0; index < tokenIds.length; index++) {
    contractCalls.push([
      clamNFTAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "getProducedPearlIds",
          type: "function",
          inputs: [
            {
              type: "uint256",
              name: "clamId",
            },
          ],
        },
        [tokenIds[index]]
      ),
    ]);
  }

  return contractCalls;
};

export const decodeProducedPearlIdsFromMulticall = (values, tokenIds) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      clamId: tokenIds[index],
      producedPearlIds: web3.eth.abi.decodeParameter("uint256[]", values[index]),
    });
  }

  return result;
};

export const decodeTokenOfOwnerByIndexFromMulticall = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push(web3.eth.abi.decodeParameter("uint256", values[index]));
  }

  return result;
};

export const decodeClamDataFromMulticall = (values, tokenIds) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      clamId: tokenIds[index],
      clamDataValues: web3.eth.abi.decodeParameter(
        {
          clamData: {
            isMaxima: "bool",
            isAlive: "bool",
            birthTime: "uint256",
            pearlsProduced: "uint256",
            pearlProductionDelay: "uint256",
            pearlProductionCapacity: "uint256",
            dna: "uint256",
            pearlProductionStart: "uint256",
            producedPearlIds: "uint256[]",
            gemBoost: "uint256",
            pearlBoostM: "uint256",
          },
        },
        values[index]
      ),
    });
  }

  return result;
};

export const getClamValueInShellToken = async () => {
  const clamNft = contractFactory({
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });

  return clamNft.methods.clamPriceForShell().call();
};

export const getPearlValueInShellToken = async () => {
  const clamNft = contractFactory({
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });

  return clamNft.methods.pearlPriceForShell().call();
};

export const harvestClamForShell = async (tokenId, account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const clamNft = contractFactory({
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });

  const method = clamNft.methods.harvestClamForShell(tokenId);

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  return method.send({
    from: account,
    gas: gasEstimation,
  });
};

export const canStillProducePearls = async (clamId) => {
  const clamNft = contractFactory({
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });
  return await clamNft.methods.canStillProducePearls(clamId).call();
};

export const canCurrentlyProducePearl = async (clamId) => {
  const clamNft = contractFactory({
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });
  return await clamNft.methods.canCurrentlyProducePearl(clamId).call();
};

export const getPearlBoost = async (clamId) => {
  const { pearlBoost } = await getClamData(clamId);
  if (new BigNumber(pearlBoost).gt(0)) return pearlBoost;
  return "0";
};

export const calculatePearlBoost = async (dnaDecoded) => {
  const { size, lifespan, rarityValue } = dnaDecoded;
  const clamNft = contractFactory({
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });

  const boost = await clamNft.methods.calculatePearlBoost(size, lifespan, rarityValue).call();
  return boost;
};

export default {
  balanceOf,
  accountClamBalance,
  totalClamSupply,
  getClamData,
  getClamByIndex,
  buyClam,
  getPrice,
  checkHasClamToCollect,
  collectClam,
  prepTokenOfOwnerByIndexMulticall,
  decodeTokenOfOwnerByIndexFromMulticall,
  prepClamDataMulticall,
  decodeClamDataFromMulticall,
  getClamValueInShellToken,
  getPearlValueInShellToken,
  harvestClamForShell,
  prepClamProducedPearlIds,
  decodeProducedPearlIdsFromMulticall,
  calculatePearlBoost,
  ownerOfClam,
};
