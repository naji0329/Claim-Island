import shellTokenAbi from "./abi/BEP20.json";
import { shellTokenAddress } from "./constants";
import { contractFactory } from "./index";

const balanceOf = async ({ account, abi, address }) => {
  const token = contractFactory({ abi, address });
  const accountBalance = await token.methods.balanceOf(account).call();

  return accountBalance;
};

export const accountShellBalance = async (account) => {
  const bal = await balanceOf({ account, abi: shellTokenAbi, address: shellTokenAddress });
  return bal;
};

export const addTokenToMetamask = async ({ tokenAddress, tokenSymbol, tokenDecimals, tokenImage }) => {
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
