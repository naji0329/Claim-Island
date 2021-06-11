import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getExplorerAddressLink, ChainId } from "@usedapp/core";
import { connect } from "redux-zero/react";
import "./index.scss";

import { buyClamPresale } from "../../web3/buyClamPresale";
import { clamPresaleAddress } from "../../web3/constants";

const Divider = () => (
  <div className="w-full flex flex-col justify-center items-center my-2">
    <div className="bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
      <svg
        className="w-4 h-4 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
    </div>
  </div>
);

const ClamMintModal = ({
  account: { bnbBalance, address },
  presale: { salePrice, hasPurchasedClam },
}) => {
  const INDIVIDUAL_CAP = 1;
  //  disableButton = hasPurchasedClam > INDIVIDUAL_CAP;

  const { register, handleSubmit, setValue, reset, formState, getValues } =
    useForm();

  const onSubmit = async (data) => {
    console.log({ data, address });

    await buyClamPresale(address)
      .then((res) => {
        alert("You just got a CLAM! Congrats!");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  return (
    <>
      {console.log({
        form: getValues(),
        hasPurchasedClam,
        bnbBalance,
      })}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto">
            <div className="py-4 px-8 mt-3">
              <div className="flex flex-col mb-8">
                <h2 className="text-blue-700 font-semibold text-2xl tracking-wide mb-2">
                  Get Clams on BSC
                </h2>
                <a
                  className="text-gray-500 text-base underline"
                  href={getExplorerAddressLink(clamPresaleAddress, ChainId.BSC)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {clamPresaleAddress}
                </a>
              </div>

              {/* input */}
              <div className="bg-white border-2 shadow-xl rounded-lg">
                <div className="p-3">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">Price of Clam</h4>
                    <div className="flex flex-col text-sm text-gray-500">
                      <div className="flex flex-col">
                        <label
                          htmlFor="price"
                          className="mb-1 uppercase text-grey-darker text-xs font-bold"
                        >
                          amount
                        </label>
                        <div className="flex flex-row">
                          <input
                            disabled
                            value={salePrice}
                            className="bg-grey-lighter text-grey-darker p-2 font-normal rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold"
                            {...register("input", { required: true })}
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
                          <span className="flex items-center bg-gray-100 rounded rounded-r-none px-3 text-lg font-bold font-sans mx-1">
                            BNB
                          </span>
                        </div>
                      </div>
                      <span className="mb-1">/{bnbBalance} BNB available</span>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              {/* output */}
              <div className="bg-white border-2 shadow-xl rounded-lg">
                <div className="p-3">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-semibold">Clams to buy</h4>
                    <div className="flex flex-col text-sm text-gray-500">
                      <div className="flex flex-col">
                        <label
                          htmlFor="price"
                          className="mb-1 uppercase text-grey-darker text-xs font-bold"
                        >
                          amount
                        </label>
                        <div className="flex flex-row">
                          <input
                            disabled
                            value="1"
                            className="bg-grey-lighter text-grey-darker p-2 font-normal rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold"
                            {...register("output", { required: true })}
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
                          <span className="flex items-center bg-gray-100 rounded rounded-r-none px-3 text-lg font-bold font-sans mx-1">
                            CLAM
                          </span>
                        </div>
                      </div>
                      <span className="mb-1">1 CLAM = {salePrice} BNB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-4 flex flex-col">
                {hasPurchasedClam ? (
                  <button
                    disabled
                    type="submit"
                    className="disabled cursor-not-allowed block uppercase text-center shadow bg-red-300  focus:shadow-outline focus:outline-none text-white text-2xl py-3 px-10 rounded-xl"
                  >
                    Not allowed buy more
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="block uppercase text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-2xl py-3 px-10 rounded-xl"
                  >
                    Buy 1 Clam
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps)(ClamMintModal);
