import React, { useState } from "react";
import { useAsync } from "react-use";

import "./index.scss";

import { AccountStore } from "../../store/account";
import { PresaleStore } from "../../store/presale";

const ClamMintModal = ({ progress }) => {
  const clamBalance = AccountStore.useState((obj) => obj.clamBalance);
  const bnbBalance = AccountStore.useState((obj) => obj.bnbBalance);

  const presaleState = PresaleStore.useState((obj) => obj);

  return (
    <>
      {console.log({ clamBalance, bnbBalance, presaleState })}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div className="py-4 px-8 mt-3">
            <div className="flex flex-col mb-8">
              <h2 className="text-blue-700 font-semibold text-2xl tracking-wide mb-2">
                Get Clams on BSC
              </h2>
              <p className="text-gray-500 text-base">0x...</p>
            </div>
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
                          type="number"
                          name="price"
                          className="bg-grey-lighter text-grey-darker py-2 font-normal rounded text-grey-darkest border border-grey-lighter rounded-l-none font-bold"
                          value={presaleState.salePrice}
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
            <div className="py-4 flex flex-col">
              <button
                type="button"
                className="block  uppercase text-center shadow bg-blue-600 hover:bg-blue-700 focus:shadow-outline focus:outline-none text-white text-2xl py-3 px-10 rounded-xl"
              >
                Buy 1 Clam(s)
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClamMintModal;
