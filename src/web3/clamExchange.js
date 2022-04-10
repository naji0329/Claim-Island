import clamExchangeAbi from "./abi/ClamExchange.json";
import { clamExchangeAddress } from "../constants/constants";
import { contractFactory } from "./index";
import { getOracleFee } from "./rng";
import { getAccount } from "./shared";

const clamExchange = contractFactory({
  abi: clamExchangeAbi,
  address: clamExchangeAddress,
});

export const exchangeClam = async (clamId) => {
  const account = getAccount();
  const oracleFee = await getOracleFee();
  const amount = Number(oracleFee);
  const method = clamExchange.methods.exchangeClam(clamId);

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

export const collectClam = async () => {
  const account = getAccount();

  const method = clamExchange.methods.collectClam();
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

export const rngRequestHash = async () => {
  const account = getAccount();

  const exchangeData = await clamExchange.methods.clamExchangeData(account).call();
  const value = exchangeData.rngRequestHash;

  return value === "0x0000000000000000000000000000000000000000000000000000000000000000"
    ? undefined
    : value;
};

export const clamBonusData = async (clamId) => {
  const repayGem = await clamExchange.methods.clamBonusData(clamId).call();
  return repayGem;
};
