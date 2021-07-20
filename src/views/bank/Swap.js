import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";

import BNBLogo from "../../assets/img/binance-coin-bnb-logo.png";
import ClamLogo from "../../assets/clam-icon.png";
import Icon from "../../assets/img/icon-reload.svg";

import { estimateSwap, zapBNBForLPToken } from "../../web3/zap";

import { actions } from "../../store/redux";

import { poolAssets } from "./poolsAssets";
const lPTokens = Object.keys(poolAssets);

const Divider = () => (
  <div className="w-full flex flex-col justify-center items-center my-2">
    <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
      <img className="h-8 mr-2" src={Icon} />
    </div>
  </div>
);

const showImage = (images) => {
  return images.map((image, i) => (
    <div className="avatar bg-white" key={i}>
      <div className="w-12 h-12">
        <img src={image} />
      </div>
    </div>
  ));
};

const Swap = ({ account: { bnbBalance, address }, updateAccount, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [tokenAmountOutMin, setTokenAmountOutMin] = useState(0);
  const [destToken, setDestToken] = useState('0xE26482b00781b7BA03f725719feD8Bae1d070f8e');

  // const { register, handleSubmit, setValue, reset, formState, getValues } =
  //   useForm();

  // const onSubmit = async (data) => {
  //   console.log({ data, address });
  // };
  const calculateTokenAmount = async (value) => {
    if (value == '') return;
    setAmount(value);
    console.log('destToken', destToken);
    const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c"; // assuming the in token is always BNB
    const estimateAmount = await estimateSwap({ destToken, originToken: WBNB, amountIn: web3.utils.toWei(value) });
    console.log({ estimateAmount: estimateAmount.swapAmountOut, destToken });
    setTokenAmountOutMin(estimateAmount.swapAmountOut);
  };

  const handleSwap = async () => {
    try {
      await zapBNBForLPToken({ bnbAmount: web3.utils.toWei(amount), destToken, tokenAmountOutMin, account: address });
    } catch (error) {
      updateAccount({ error: error.message });
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {/* input */}
      <div className="bg-white border-2 shadow rounded-xl">
        <div className="px-2 py-2">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold my-2 text-black">BNB</h4>
            <div className="flex flex-col text-sm text-gray-600">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex">
                    <img className="w-12 mr-2" src={BNBLogo} />
                    <input
                      onChange={(v) => calculateTokenAmount(v.currentTarget.value)}
                      value={amount}
                      className="bg-gray-100 text-center text-xl w-20  text-black p-2 font-normal rounded  border-none font-extrabold"
                      // {...register("input", { required: true })}
                      // onChange={(v) => {
                      //   const input = parseUnits(
                      //     v.currentTarget.value,
                      //     "wei"
                      //   ); // input in wei
                      //   const price = parseUnits(
                      //     presaleState.salePrice,
                      //     "ether"
                      //   ); // input in ether
                      //   const out = formatUnits(input.mul(price), 18);
                      //   setValue("output", out);
                      // }}
                    />
                    <span className="flex items-center text-xs px-3 uppercase">
                      {bnbBalance.slice(0, 4)} BNB available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider />
      <span className="text-gray-700">Select Output Token</span>
      <select onChange={(v) => setDestToken(v.currentTarget.value)} className="form-select block w-full mt-1">
        {lPTokens.map((lp, i) => (
          <option key={i} value={lp}>
            {showImage(poolAssets[lp].images)}
          </option>
        ))}
      </select>
      {/* output */}
      <div className="bg-white border-2 shadow-xl rounded-xl">
        <div className="px-2 py-2">
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold mb-2 text-black">$GEM</h4>
            <div className="flex flex-col text-sm text-gray-500">
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex">
                    <img className="w-12 mr-2" src={ClamLogo} />
                    <input
                      disabled
                      value={tokenAmountOutMin}
                      className="bg-gray-100 text-center text-xl w-20  text-black p-2 font-normal rounded  border-none font-extrabold"
                      // {...register("output", { required: true })}
                      // onChange={(v) => {
                      //   const output = parseUnits(
                      //     v.currentTarget.value,
                      //     "ether"
                      //   ); // input in wei
                      //   const price = parseUnits(
                      //     presaleState.salePrice,
                      //     "ether"
                      //   ); // input in ether
                      //   console.log({ output, price });
                      //   const input = formatUnits(output.div(price), 18);
                      //   console.log({ output, price, input });
                      //   setValue("input", input);
                      // }}
                    />
                  </div>
                  {/* <span className="flex items-center  px-3 text-lg font-extrabold font-sans mx-1">
                        CLAM
                      </span> */}

                  {/* <div className="mx-2">1 $GEM = {salePrice} BNB</div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-2 flex flex-col">
        <>
          {isLoading ? (
            <button
              disabled={isLoading}
              type="submit"
              className="flex justify-content-center items-center block uppercase text-center shadow bg-yellow-200 text-yellow-600 text-xl py-3 px-10 rounded-xl cursor-not-allowed"
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-yello-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>{" "}
              Sending transaction...
            </button>
          ) : (
            <button
              onClick={handleSwap}
              // type="submit"
              className="block  text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-xl py-3 px-10 rounded-xl"
            >
              Change
            </button>
          )}
        </>
      </div>
      {/* </form> */}
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(Swap);
