import clamNFTAbi from "./abi/ClamNFT.json";
import BEP20ABI from "./abi/BEP20.json";
import { shellTokenAddress, clamNFTAddress, bankAddress } from "./constants";
import { contractFactory } from "./index";

export const balanceOf = async (address, account) => {
  const token = contractFactory({ abi: BEP20ABI, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const approveBankForMaxUint = async (account, tokenAddress) => {
  const maxUint = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const token = contractFactory({ abi: BEP20ABI, address: tokenAddress });

  const method = token.methods.approve(bankAddress, maxUint);

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method.send({
    from: account,
    gas: gasEstimation,
  });
};

export const hasMaxUintAllowance = async (owner, tokenAddress) => {
  const maxUint =
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  const token = contractFactory({ abi: BEP20ABI, address: tokenAddress });
  const allowance = await token.methods.allowance(owner, bankAddress).call();
  const allowanceAsHex = web3.utils.toHex(allowance)

  return allowanceAsHex == maxUint;
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
