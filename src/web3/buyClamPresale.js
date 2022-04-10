import clamPresaleAbi from "./abi/clamPresale.json";
import { clamPresaleAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getOracleFee } from "./rng";

export const buyClamPresale = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });

  const oracleFee = await getOracleFee();
  const currentPrice = await getClamPrice();
  const amount = Number(currentPrice) + Number(oracleFee);

  const method = clamPresale.methods.buyClam();

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

export const collectClam = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });

  const method = clamPresale.methods.collectClam();

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method
    .send({
      from: account,
      gas: gasEstimation,
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

export const getClamPrice = async () => {
  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });
  const price = await clamPresale.methods.getNFTPrice().call();

  return price;
};

export const presaleCap = async () => {
  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });
  const value = await clamPresale.methods.MAX_SUPPLY().call();

  return value;
};

export const clamsPurchased = async () => {
  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });
  const value = await clamPresale.methods.clamsPurchased().call();

  return value;
};

export const hasSaleStarted = async () => {
  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });
  const value = await clamPresale.methods.hasSaleStarted().call();

  return value;
};

export const hasSaleEnded = async () => {
  const clamPresale = contractFactory({
    abi: clamPresaleAbi,
    address: clamPresaleAddress,
  });
  const value = await clamPresale.methods.hasSaleEnded().call();

  return value;
};

export const usersPurchasedClam = async (address) => {
  if (address) {
    const clamPresale = contractFactory({
      abi: clamPresaleAbi,
      address: clamPresaleAddress,
    });
    const value = await clamPresale.methods.usersPurchasedClam(address).call();
    return value;
  }
};

export const rngRequestHashFromBuyersClam = async (address) => {
  if (address) {
    const clamPresale = contractFactory({
      abi: clamPresaleAbi,
      address: clamPresaleAddress,
    });
    const value = await clamPresale.methods.rngRequestHashFromBuyersClam(address).call();
    return value === "0x0000000000000000000000000000000000000000000000000000000000000000"
      ? undefined
      : value;
  }
};

export default {
  buyClamPresale,
  collectClam,
  getClamPrice,
  presaleCap,
  hasSaleStarted,
  hasSaleEnded,
  clamsPurchased,
  usersPurchasedClam,
  rngRequestHashFromBuyersClam,
};
