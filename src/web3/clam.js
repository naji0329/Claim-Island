import clamNFTAbi from "./abi/ClamNFT.json";
import clamShopAbi from "./abi/ClamShop.json";
import { clamNFTAddress, clamShopAddress } from "./constants";
import { contractFactory } from "./index";

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

export const totalClamSupply = async () => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const totalSupply = await clamNft.methods.totalSupply().call();
  return totalSupply;
};

export const getClamData = async (tokenId) => {
  const clamNft = contractFactory({ abi: clamNFTAbi, address: clamNFTAddress });
  const value = await clamNft.methods.clamData(tokenId).call();
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

  // const oracleFee = await getOracleFee();
  const currentPrice = await getPrice();
  const amount = Number(currentPrice); // + Number(oracleFee);

  const method = clamShop.methods.shopClam();

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
  const clamShop = contractFactory({ abi: clamShopAbi, address: clamShopAddress });
  const value = await clamShop.methods.getUpdatedPrice().call();
  return value;
};

export const checkHasClamToCollect = async (address) => {
  const clamShop = contractFactory({
    abi: clamShopAbi,
    address: clamShopAddress,
  });

  const value = await clamShop.methods.rngRequestHashForFarmedClam(address).call();
  return value;
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
};
