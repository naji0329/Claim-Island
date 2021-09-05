import BigNumber from "bignumber.js";
import gemAbi from "./abi/Gem.json";
import { gemTokenAddress } from "./constants";
import { contractFactory } from "./index";
import { MaxUint256 } from "./shared";

export const getAllowance = async (ownerAddress, spenderAddress) => {
  const gem = contractFactory({ abi: gemAbi, address: gemTokenAddress });
  const value = await gem.methods.allowance(ownerAddress, spenderAddress).call();
  return value;
};

export const getBalance = async (account) => {
  const gem = contractFactory({ abi: gemAbi, address: gemTokenAddress });
  const value = await gem.methods.balanceOf(account).call();
  return value;
};

export const approveSpending = async (ownerAddress, spenderAddress, amount) => {
  const allowance = await getAllowance(ownerAddress, spenderAddress);

  if (new BigNumber(allowance).gte(new BigNumber(amount))) return;
  const gem = contractFactory({ abi: gemAbi, address: gemTokenAddress });

  const method = gem.methods.approve(spenderAddress, amount);

  const gasEstimation = await method.estimateGas({
    from: ownerAddress,
  });

  await method
    .send({
      from: ownerAddress,
      gas: gasEstimation,
    })
    .once("confirmation", async (res) => {
      try {
        console.log("Approval Success", { res }); // add a toaster here
        // return "sale_success";
        return res;
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        return error;
      }
    });
};

export const infiniteApproveSpending = async (ownerAddress, spenderAddress, amount) => {
  const allowance = await getAllowance(ownerAddress, spenderAddress);

  if (new BigNumber(allowance).gte(new BigNumber(amount))) return;

  const gem = contractFactory({ abi: gemAbi, address: gemTokenAddress });

  const method = gem.methods.approve(spenderAddress, MaxUint256);

  const gasEstimation = await method.estimateGas({
    from: ownerAddress,
  });

  await method
    .send({
      from: ownerAddress,
      gas: gasEstimation,
    })
    .once("confirmation", async (res) => {
      try {
        console.log("Approval Success", { res }); // add a toaster here
        // return "sale_success";
        return res;
      } catch (error) {
        console.error(error); // add toaster to show error
        // callback("sale_failure");
        return error;
      }
    });
};

export default {
  getAllowance,
  approveSpending,
};
