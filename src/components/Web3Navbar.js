import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import {
  useEthers,
  useTokenBalance,
  useEtherBalance,
  ChainId,
} from "@usedapp/core";

import { formatUnits } from "@ethersproject/units";

import { clamNFTAddress } from "../web3/constants.js";
import { AccountStore } from "../store/account";

const ErrorAlert = ({ title, description }) => (
  <div className="w-full absolute">
    <div
      className="bg-red-200 border-t-4 border-red-600 rounded-md text-red-800 p-4 m-2"
      role="alert"
    >
      <div className="flex">
        <svg
          className="h-6 w-6 fill-current text-red-500 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
        </svg>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm ">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

const Web3Navbar = () => {
  const [activateError, setActivateError] = useState("");
  const { activateBrowserWallet, account, chainId, error } = useEthers();
  const clamBalance = useTokenBalance(clamNFTAddress, account);
  const bnbBalance = useEtherBalance(account);

  useAsync(async () => {
    console.log("loaded");
  });

  useEffect(() => {
    const newClamBalance = clamBalance ? formatUnits(clamBalance, 0) : 0;
    const newBnbBalance = bnbBalance ? formatUnits(bnbBalance, 18) : 0;
    console.log("######## account balance", { newClamBalance, newBnbBalance });

    AccountStore.update((obj) => {
      obj.clamBalance = newClamBalance;
    });

    AccountStore.update((obj) => {
      obj.bnbBalance = newBnbBalance;
    });

    AccountStore.update((obj) => {
      obj.isConnected = account ? true : false;
    });

    AccountStore.update((obj) => {
      obj.error = activateError;
    });
  }, [clamBalance, bnbBalance, activateError]);

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }
  }, [error]);

  return (
    <>
      {activateError && (
        <ErrorAlert title="Something Wrong" description={activateError} />
      )}
      {chainId !== ChainId.BSC && (
        <ErrorAlert
          title="Wrong Network"
          description={
            <>
              You must be connected to{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://docs.binance.org/smart-chain/wallet/metamask.html"
                className="underline"
              >
                Binance Smart Chain
              </a>{" "}
              network.
            </>
          }
        />
      )}

      <nav className="flex items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-b-4 border-blue-200">
        <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-0 lg:pb-2">
          <div className="flex items-center flex-shrink-0 text-gray-800 mr-16">
            <span className="font-semibold text-xl tracking-tight">$CLAM</span>
          </div>
          <div className="block lg:hidden ">
            <button
              id="nav"
              className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="lg:flex-grow">
            {account && (
              <p className="block lg:inline-block lg:mt-0 px-4 py-2  mr-2">
                Account:{" "}
                <span className="bg-blue-100 text-blue-500 p-1 rounded text-sm">
                  {account}
                </span>
              </p>
            )}
          </div>

          <div className="flex">
            {!account && (
              <button
                type="button"
                className="focus:outline-none block text-md px-4  ml-2 py-2 rounded border-2 border-blue-400 text-blue-600 font-bold hover:text-white hover:bg-blue-400"
                onClick={() => activateBrowserWallet()}
              >
                Connect Wallet
              </button>
            )}

            {account && (
              <>
                <p className="block lg:inline-block lg:mt-0 px-4 py-2  mr-2">
                  Balance:{" "}
                  <span className="bg-blue-100 text-blue-500 p-1 rounded text-sm">
                    {clamBalance ? formatUnits(clamBalance, 0) : 0} CLAM
                  </span>
                </p>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Web3Navbar;
