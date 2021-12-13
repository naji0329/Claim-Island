import clamNFTAbi from "./abi/Clam.json";
import BEP20ABI from "./abi/BEP20.json";
import ERC721ABI from "./abi/ERC721.json";
import { shellTokenAddress, clamNFTAddress, bankAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getAccount, MaxUint256 } from "./shared";
import BigNumber from "bignumber.js";

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const balanceOf = async (address, account) => {
  const token = contractFactory({ abi: BEP20ABI, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const totalSupply = async (address) => {
  const token = contractFactory({ abi: BEP20ABI, address });
  return token.methods.totalSupply().call();
};

export const approveContractForMaxUintErc721 = async (tokenAddress, contractAddress) => {
  const account = getAccount();
  const token = contractFactory({ abi: ERC721ABI, address: tokenAddress });

  const isApprovalForAll = await token.methods.isApprovedForAll(account, contractAddress).call();

  if (isApprovalForAll) return;

  const method = token.methods.setApprovalForAll(contractAddress, true);

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method.send({
    from: account,
    gas: gasEstimation,
  });
};

export const approveBankForMaxUint = async (account, tokenAddress, amount) => {
  const token = contractFactory({ abi: BEP20ABI, address: tokenAddress });

  const allowance = await token.methods.allowance(account, bankAddress).call();

  if (new BigNumber(allowance).gte(amount)) return;

  const method = token.methods.approve(
    bankAddress,
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  );

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method.send({
    from: account,
    gas: gasEstimation,
  });
};

export const hasMaxUintAllowanceBank = async (owner, tokenAddress) => {
  const token = contractFactory({ abi: BEP20ABI, address: tokenAddress });
  const allowance = await token.methods.allowance(owner, bankAddress).call();
  // const allowanceAsHex = web3.utils.toHex(allowance);
  return new BigNumber(allowance, 16).isEqualTo(MaxUint256);
};

export const accountShellBalance = async (account) => {
  const bal = await balanceOf({
    account,
    abi: BEP20ABI,
    address: shellTokenAddress,
  });
  return bal;
};

export const accountClamBalance = async (account) => {
  const bal = await balanceOf({
    account,
    abi: clamNFTAbi,
    address: clamNFTAddress,
  });
  return bal;
};

export const addTokenToMetamask = async ({
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  tokenImage,
}) => {
  if (!window.ethereum) {
    throw new Error("there is no wallet on browser");
  }

  try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    const wasAdded = await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress, // The address that the token is at.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
          decimals: tokenDecimals, // The number of decimals in the token
          image: tokenImage, // A string url of the token logo
        },
      },
    });

    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};
