import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import {
  useEthers,
  useTokenBalance,
  useEtherBalance,
  ChainId,
  shortenAddress,
} from "@usedapp/core";
import { connect } from "redux-zero/react";
import { actions } from "../store/redux";
import { Link, useLocation } from "react-router-dom";

import { formatUnits } from "@ethersproject/units";

import {
  clamNFTAddress,
  pearlNFTAddress,
  gemTokenAddress,
  shellTokenAddress,
  BUSD,
} from "../web3/constants.js";

import getWeb3 from "../web3/getWeb3";
import { EmptyBytes } from "web3/shared";
import { getStakedClamIds, rngRequestHashForProducedPearl } from "web3/pearlFarm";

import Web3Avatar from "./Web3Avatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { getUsdPriceOfToken } from "../web3/pancakeRouter";
import BigNumber from "bignumber.js";

const ErrorAlert = ({ title, description, onClose }) => (
  <div className="w-full absolute">
    <div
      className="bg-red-200 border-t-4 border-red-600 rounded-md text-red-800 p-4 m-2 absolute z-50"
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

        <svg
          onClick={onClose}
          className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </div>
    </div>
  </div>
);

const formatBNB = (value) => (value ? formatUnits(value, 18) : "0");
const formatNFT = (value) => (value ? formatUnits(value, 0) : "0");
const formatGem = (value) => (value ? formatUnits(value, 18) : "0");

const Web3Navbar = ({ title, updateAccount, ...redux }) => {
  //  is called several times thus need a state to lower the renders
  const [activateError, setActivateError] = useState("");
  const [activateBnbBalance, setActivateBnbBalance] = useState("0");
  const [activateClamBalanceInSafe, setActivateClamBalanceInSafe] = useState("0");
  const [activateClamBalanceInFarm, setActivateClamBalanceInFarm] = useState("0");
  const [activateGemBalance, setActivateGemBalance] = useState("0");
  const [activatePearlBalanceInSafe, setActivatePearlBalanceInSafe] = useState("0");
  const [activatePearlBalanceInFarm, setActivatePearlBalanceInFarm] = useState("0");
  const [activateChainId, setActivateChainId] = useState();
  const [activateGemPrice, setActivateGemPrice] = useState("0");
  const [activateShellPrice, setActivateShellPrice] = useState("0");

  const { activateBrowserWallet, account, error } = useEthers();
  const clamBalance = useTokenBalance(clamNFTAddress, account);
  const pearlBalance = useTokenBalance(pearlNFTAddress, account);
  const gemBalance = useTokenBalance(gemTokenAddress, account);
  const bnbBalance = useEtherBalance(account);
  const web3 = getWeb3();
  const location = useLocation();

  useAsync(async () => {
    console.log("loaded");
    const netId = await web3.eth.net.getId();
    if (netId !== activateChainId) {
      setActivateChainId(netId);
    }
  });

  if (window.ethereum) {
    window.ethereum.on("chainChanged", (networkId) => {
      const newChainId = parseInt(networkId);
      console.log("chainChanged", newChainId);
      if (newChainId !== activateChainId) {
        setActivateChainId(newChainId);
      }
    });
  }

  useEffect(async () => {
    if (!web3) {
      return updateAccount({ web3Installed: false, error: "Metamask not installed" });
    }
    const netId = await web3.eth.net.getId();
    const bscTestnet = 97;

    const isBSChain =
      activateChainId === ChainId.BSC ||
      activateChainId === ChainId.Localhost ||
      activateChainId === bscTestnet;
    updateAccount({
      bnbBalance: activateBnbBalance,
      gemBalance: activateGemBalance,
      clamBalance: activateClamBalanceInSafe,
      pearlBalance: activatePearlBalanceInSafe,
      error: isBSChain ? null : activateError,
      address: account,
      isConnected: account ? true : false,
      isBSChain,
      chainId: netId,
    });
  }, [
    account,
    activateChainId,
    activateError,
    activateBnbBalance,
    activateClamBalanceInSafe,
    activatePearlBalanceInSafe,
  ]);

  useEffect(() => {
    if (error) {
      setActivateError(error.message);
    }
  }, [error]);

  useEffect(() => {
    // bnbBalance is bignumber
    const balance = formatBNB(bnbBalance);
    // console.log("useEffect", { balance });
    if (balance !== activateBnbBalance) {
      // balance is string
      setActivateBnbBalance(balance);
    }
  }, [bnbBalance]);

  useEffect(() => {
    // clamBalance is bignumber
    const balanceOfClams = formatNFT(clamBalance);
    if (balanceOfClams !== activateClamBalanceInSafe) {
      // balanceOfClams is string
      setActivateClamBalanceInSafe(balanceOfClams);
    }

    const balanceOfPearls = formatNFT(pearlBalance);
    if (balanceOfPearls !== activatePearlBalanceInSafe) {
      setActivatePearlBalanceInSafe(balanceOfPearls);
    }

    async function initNavBar() {
      if (account) {
        const gemPrice = await getUsdPriceOfToken(gemTokenAddress, BUSD);
        const gemPriceBigNumber = new BigNumber(gemPrice).toFixed(2);
        const shellPrice = await getUsdPriceOfToken(shellTokenAddress, BUSD);
        const shellPriceBigNumber = new BigNumber(shellPrice).toFixed(2);

        setActivateGemPrice(gemPriceBigNumber);
        setActivateShellPrice(shellPriceBigNumber);

        // get Clam in farm
        const stakedClamsInFarm = await getStakedClamIds(account);
        setActivateClamBalanceInFarm(stakedClamsInFarm.length);

        // get Pearls that are ready to be collected in farm
        const promises = stakedClamsInFarm.map((clamId) => rngRequestHashForProducedPearl(clamId));
        const pearlsReadyInFarm = await Promise.all(promises);
        const numberOfPearlsReady = pearlsReadyInFarm.filter((el) => el !== EmptyBytes).length;
        setActivatePearlBalanceInFarm(numberOfPearlsReady);
      }
    }

    initNavBar();
  }, [clamBalance, pearlBalance, account]);

  useEffect(() => {
    // gemBalance is bignumber
    const balance = formatGem(gemBalance);
    // console.log("useEffect", { balance });
    if (balance !== activateGemBalance) {
      // balance is string
      setActivateGemBalance(balance);
    }
  }, [gemBalance]);

  return (
    <>
      {redux.account.error ? (
        <ErrorAlert
          title="Something Wrong"
          description={redux.account.error}
          onClose={() => {
            updateAccount({ error: null });
          }}
        />
      ) : (
        <>
          {!redux.account.isBSChain && (
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
        </>
      )}

      <nav className="flex min-h-48 min-w-full items-center fixed px-6 py-4 bg-transparent mt-2 z-20">
        {/* this push menu to right side */}
        <div className="flex justify-between lg:w-auto w-full  pl-6 pr-2 pb-0 lg:pb-2"></div>

        <div className="w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="flex-grow">
            {title && (
              <h1 className="text-6xl text-shadow font-extrabold font-aristotelica-bold text-white">
                {title}
              </h1>
            )}
          </div>

          <div className="flex">
            {!account && (
              <button
                // style={{ fontFamily: "AristotelicaBold", lineHeight: "0.7rem" }}
                type="button"
                className="focus:outline-none block text-md px-4 ml-2 py-2 rounded-xl bg-gray-800 text-white font-bold hover:text-white hover:bg-gray-700"
                onClick={() => activateBrowserWallet()}
              >
                Connect Wallet
              </button>
            )}

            {account && (
              <>
                <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 bg-opacity-80">
                  <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                    Gem Price: $ {activateGemPrice} | Shell Price: $ {activateShellPrice}
                  </span>
                </div>
                <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 bg-opacity-80">
                  <Link
                    to="/saferoom/clam"
                    className="flex"
                    style={
                      location.pathname.indexOf("saferoom") === -1
                        ? null
                        : { pointerEvents: "none" }
                    }
                  >
                    <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                      Safe: {activateClamBalanceInSafe} Clams | {activatePearlBalanceInSafe} Pearls
                      {location.pathname.indexOf("saferoom") === -1 && (
                        <FontAwesomeIcon icon={faSignInAlt} className="ml-1" />
                      )}
                    </span>
                  </Link>
                </div>
                <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 bg-opacity-80">
                  <Link
                    to="/farms"
                    className="flex"
                    style={
                      location.pathname.indexOf("farms") === -1 ? null : { pointerEvents: "none" }
                    }
                  >
                    <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                      Farm: {activateClamBalanceInFarm} Clams | {activatePearlBalanceInFarm} Pearls
                      {location.pathname.indexOf("farms") === -1 && (
                        <FontAwesomeIcon icon={faSignInAlt} className="ml-1" />
                      )}
                    </span>
                  </Link>
                </div>

                <div className="flex lg:mt-0 px-4 py-2 bg-gray-900 mr-2 rounded-xl shadow bg-black bg-opacity-80">
                  <div className="p-1 text-sm text-gray-200">{shortenAddress(account)}</div>

                  <Web3Avatar address={account} size={30} />
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
// just send everything
const mapToProps = (redux) => redux;
export default connect(mapToProps, actions)(Web3Navbar);
