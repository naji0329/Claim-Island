import zapAbi from "./abi/Zap.json";
import { zapAddress } from "../constants/constants";
import { contractFactory } from "./index";

export const estimateSwap = async ({ destToken, originToken, amountIn }) => {
  const zap = contractFactory({ abi: zapAbi, address: zapAddress });
  const estSwap = await zap.methods.estimateSwap(destToken, originToken, amountIn).call();

  return estSwap;
};

export const zapBNBForLPToken = async ({ bnbAmount, destToken, tokenAmountOutMin, account }) => {
  console.log({ bnbAmount });
  const zap = contractFactory({ abi: zapAbi, address: zapAddress });

  const method = zap.methods.zapInETH(destToken, tokenAmountOutMin);

  const gasEstimation = await method.estimateGas({
    from: account,
  });

  await method.send({
    from: account,
    gas: gasEstimation,
    value: bnbAmount,
  });
};
