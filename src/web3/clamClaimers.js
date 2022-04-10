import clamClaimersAbi from "./abi/ClamClaimers.json";
import { clamClaimersAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getOracleFee } from "./rng";

export const claimClam = async (account) => {
  if (!account) {
    throw new Error("There is no account connected!");
  }

  const ClamClaimer = contractFactory({
    abi: clamClaimersAbi,
    address: clamClaimersAddress,
  });

  const oracleFee = await getOracleFee();
  const amount = Number(oracleFee);

  const method = ClamClaimer.methods.claimClam();

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

  const ClamClaimer = contractFactory({
    abi: clamClaimersAbi,
    address: clamClaimersAddress,
  });

  const method = ClamClaimer.methods.collectClam();

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

export const isClamClaimer = async (account) => {
  const ClamClaimer = contractFactory({
    abi: clamClaimersAbi,
    address: clamClaimersAddress,
  });
  const isClaimer = await ClamClaimer.methods.isClamClaimer(account).call();

  return isClaimer;
};

export const clamsClaimed = async () => {
  const ClamClaimer = contractFactory({
    abi: clamClaimersAbi,
    address: clamClaimersAddress,
  });
  const value = await ClamClaimer.methods.clamsClaimed().call();

  return value;
};

export const individualCap = async () => {
  const ClamClaimer = contractFactory({
    abi: clamClaimersAbi,
    address: clamClaimersAddress,
  });
  const value = await ClamClaimer.methods.INDIVIDUAL_CAP().call();

  return value;
};

export const usersClaimedClam = async (address) => {
  if (address) {
    const ClamClaimer = contractFactory({
      abi: clamClaimersAbi,
      address: clamClaimersAddress,
    });
    const value = await ClamClaimer.methods.usersClaimedClam(address).call();
    return value;
  }
};

export const rngRequestHashFromBuyersClam = async (address) => {
  if (address) {
    const ClamClaimer = contractFactory({
      abi: clamClaimersAbi,
      address: clamClaimersAddress,
    });
    const value = await ClamClaimer.methods.rngRequestHashFromBuyersClam(address).call();
    return value === "0x0000000000000000000000000000000000000000000000000000000000000000"
      ? undefined
      : value;
  }
};

export default {
  claimClam,
  collectClam,
  isClamClaimer,
  clamsClaimed,
  individualCap,
  usersClaimedClam,
  rngRequestHashFromBuyersClam,
};
