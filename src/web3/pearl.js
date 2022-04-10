import pearlNFTAbi from "./abi/Pearl.json";
import { pearlNFTAddress } from "../constants/constants";
import { contractFactory } from "./index";

const balanceOf = async ({ account, abi, address }) => {
  const token = contractFactory({ abi, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const accountPearlBalance = async (account) => {
  const bal = await balanceOf({
    account,
    abi: pearlNFTAbi,
    address: pearlNFTAddress,
  });
  return bal;
};

export const totalPearlSupply = async () => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const totalSupply = await pearlNft.methods.totalSupply().call();
  return totalSupply;
};

export const tokenOfOwnerByIndex = async (account, index) => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.tokenOfOwnerByIndex(account, index).call();
  return value;
};

export const getPearlData = async (tokenId) => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.pearlData(tokenId).call();
  return value;
};

export const getPearlByIndex = async (account, index) => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.tokenOfOwnerByIndex(account, index).call();
  return value;
};

export const ownerOfPearl = async (tokenId) => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.ownerOf(tokenId).call();
  return value;
};

export const prepTokenOfOwnerByIndexMulticall = (address, length) => {
  const contractCalls = [];
  for (let index = 0; index < Number(length); index++) {
    contractCalls.push([
      pearlNFTAddress,
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

export const decodeTokenOfOwnerByIndexFromMulticall = (values) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push(web3.eth.abi.decodeParameter("uint256", values[index]));
  }

  return result;
};

export const currentPearlBaseGemRewards = async () => {
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });
  const value = await pearlNft.methods.currentBaseGemRewards().call();

  return value;
};

export const prepPearlDataMulticall = (tokenIds) => {
  const contractCalls = [];
  for (let index = 0; index < tokenIds.length; index++) {
    contractCalls.push([
      pearlNFTAddress,
      web3.eth.abi.encodeFunctionCall(
        {
          name: "pearlData",
          type: "function",
          inputs: [
            {
              type: "uint256",
              name: "",
            },
          ],
        },
        [tokenIds[index]]
      ),
    ]);
  }

  return contractCalls;
};

export const decodePearlDataFromMulticall = (values, tokenIds) => {
  const result = [];

  for (let index = 0; index < values.length; index++) {
    result.push({
      pearlId: tokenIds[index],
      pearlDataValues: web3.eth.abi.decodeParameter(
        {
          pearlData: {
            birthTime: "uint256",
            dna: "uint256",
            pearlsRemaining: "uint256",
            gemBoost: "uint256",
            pearlPrice: "uint256",
          },
        },
        values[index]
      ),
    });
  }

  return result;
};

export const legacyCalculateBonusRewards = async (baseGemRewards, dnaDecoded) => {
  const { size, lustre, nacreQuality, surface, rarityValue } = dnaDecoded;
  const pearlNft = contractFactory({ abi: pearlNFTAbi, address: pearlNFTAddress });

  return pearlNft.methods
    .legacyCalculateBonusRewards(baseGemRewards, size, lustre, nacreQuality, surface, rarityValue)
    .call();
};

export default {
  balanceOf,
  accountPearlBalance,
  totalPearlSupply,
  getPearlData,
  getPearlByIndex,
  decodePearlDataFromMulticall,
  prepPearlDataMulticall,
  decodeTokenOfOwnerByIndexFromMulticall,
  prepTokenOfOwnerByIndexMulticall,
  currentPearlBaseGemRewards,
};
