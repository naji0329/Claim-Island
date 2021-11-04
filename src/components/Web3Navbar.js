import React, { useState, useEffect } from "react";
import { useAsync } from "react-use";
import { useEthers, useTokenBalance, useEtherBalance, ChainId } from "@usedapp/core";
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
import { EmptyBytes, getOwnedClams, getOwnedPearls } from "web3/shared";
import clamContract from "web3/clam";

import { getStakedClamIds, rngRequestHashForProducedPearl } from "web3/pearlFarm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { getUsdPriceOfToken } from "../web3/pancakeRouter";
import BigNumber from "bignumber.js";
import NetworkService from "../utils/NetworkService";
import { NavBarUserProfile } from "./navBarUserProfile";

import ClamIcon from "../assets/img/clam_icon.png";
import PearlIcon from "../assets/img/pearl_icon.png";
import GemIcon from "../assets/img/gems_icon.png";
import ShellIcon from "../assets/img/shell_icon.png";




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
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
        </svg>
      </div>
    </div>
  </div>
);

const formatBNB = (value) => (value ? formatUnits(value, 18) : "0");
const formatNFT = (value) => (value ? formatUnits(value, 0) : "0");
const formatBEP20 = (value) => (value ? formatUnits(value, 18) : "0");

const IconTip = ({ children, text }) => (
  <span data-tip={text} className="cursor-pointer tooltip">
    {children}
  </span>
);

const Web3Navbar = ({ updateAccount, ...redux }) => {
  //  is called several times thus need a state to lower the renders
  const [activateError, setActivateError] = useState("");
  const [activateBnbBalance, setActivateBnbBalance] = useState("0");
  const [activateClamBalanceInSafe, setActivateClamBalanceInSafe] = useState("0");
  const [activateClamBalanceInFarm, setActivateClamBalanceInFarm] = useState("0");
  const [activatePearlBalanceInSafe, setActivatePearlBalanceInSafe] = useState("0");
  const [activatePearlBalanceInFarm, setActivatePearlBalanceInFarm] = useState("0");
  const [activateChainId, setActivateChainId] = useState();
  const [activateGemPrice, setActivateGemPrice] = useState("0");
  const [activateShellPrice, setActivateShellPrice] = useState("0");
  const [activateGemBalance, setActivateGemBalance] = useState("0");
  const [activateShellBalance, setActivateShellBalance] = useState("0");

  const [activateClams, setActivateClams] = useState([]);
  const [activatePearls, setActivatePearls] = useState([]);

  const { activateBrowserWallet, account, error, deactivate } = useEthers();
  const clamBalance = useTokenBalance(clamNFTAddress, account);
  const pearlBalance = useTokenBalance(pearlNFTAddress, account);
  const gemBalance = useTokenBalance(gemTokenAddress, account);
  const shellBalance = useTokenBalance(shellTokenAddress, account);
  const bnbBalance = useEtherBalance(account);
  const web3 = getWeb3();
  const isMetamaskInstalled = web3.currentProvider.isMetaMask === true;
  const location = useLocation();

  useAsync(async () => {
    // console.log("loaded");
    const netId = await web3.eth.net.getId();
    if (netId !== activateChainId) {
      setActivateChainId(netId);
    }

    if (account) {
      const gemPrice = await getUsdPriceOfToken(gemTokenAddress, BUSD);
      const gemPriceBigNumber = new BigNumber(gemPrice).toFixed(2);
      const shellPrice = await getUsdPriceOfToken(shellTokenAddress, BUSD);
      const shellPriceBigNumber = new BigNumber(shellPrice).toFixed(2);

      // console.log({ reason: "gem price" });
      setActivateGemPrice(gemPriceBigNumber);
      // console.log({ reason: "shell price" });
      setActivateShellPrice(shellPriceBigNumber);

      // get Clam in farm
      const stakedClamsInFarm = await getStakedClamIds(account);
      // console.log({ reason: "clams in farm" });
      setActivateClamBalanceInFarm(stakedClamsInFarm.length);

      // get Pearls that are ready to be collected in farm
      const promises = stakedClamsInFarm.map((clamId) =>
        rngRequestHashForProducedPearl(clamId, account)
      );
      const pearlsReadyInFarm = await Promise.all(promises);
      const numberOfPearlsReady = pearlsReadyInFarm.filter((el) => el !== EmptyBytes).length;
      // console.log({ reason: "pearls in farm" });
      setActivatePearlBalanceInFarm(numberOfPearlsReady);

      const clams = await getOwnedClams({
        chainId: netId,
        address: account,
        balance: clamBalance,
        clamContract,
      });
      setActivateClams(clams);

      const pearls = await getOwnedPearls({
        chainId: netId,
        address: account,
        balance: pearlBalance,
      });
      setActivatePearls(pearls);
    }
  }, [account, activateClamBalanceInSafe]);

  if (window.ethereum) {
    window.ethereum.on("chainChanged", (networkId) => {
      const newChainId = parseInt(networkId);
      // console.log("chainChanged", newChainId);
      if (newChainId !== activateChainId) {
        setActivateChainId(newChainId);
      }
    });
  }

  useEffect(async () => {
    if (!web3) {
      console.log({ reason: "not connected" });
      return updateAccount({ web3Installed: false, error: "Wallet not installed" });
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
      shellBalance: activateShellBalance,
      clamBalance: activateClamBalanceInSafe,
      pearlBalance: activatePearlBalanceInSafe,
      error: isBSChain ? null : activateError,
      address: account,
      isConnected: !!account,
      isBSChain,
      chainId: netId,
      clams: activateClams,
      pearls: activatePearls,
    });
  }, [
    account,
    activateChainId,
    activateError,
    activateBnbBalance,
    activateClamBalanceInSafe,
    activatePearlBalanceInSafe,
    activateClams,
    activatePearls,
  ]);

  useEffect(() => {
    if (error) {
      console.log({ reason: "unknown error" });
      setActivateError(error.message);
    }
  }, [error]);

  useEffect(() => {
    // bnbBalance is bignumber
    const balance = formatBNB(bnbBalance);
    // console.log("useEffect", { balance });
    if (balance !== activateBnbBalance) {
      // balance is string
      // console.log({ reason: "bnb balance update" });
      setActivateBnbBalance(balance);
    }
  }, [bnbBalance]);

  useEffect(() => {
    // clamBalance is bignumber
    const balanceOfClams = formatNFT(clamBalance);
    if (balanceOfClams !== activateClamBalanceInSafe) {
      // balanceOfClams is string
      // console.log({ reason: "clams nft update" });
      setActivateClamBalanceInSafe(balanceOfClams);
    }

    const balanceOfPearls = formatNFT(pearlBalance);
    if (balanceOfPearls !== activatePearlBalanceInSafe) {
      // console.log({ reason: "pearls nft update" });
      setActivatePearlBalanceInSafe(balanceOfPearls);
    }
  }, [clamBalance, pearlBalance, account]);

  useEffect(() => {
    // gemBalance is bignumber
    const gemBal = formatBEP20(gemBalance);
    const shellBal = formatBEP20(shellBalance);

    if (Number(gemBal).toFixed(2) !== Number(activateGemBalance).toFixed(2)) {
      // gemBal is string
      // console.log({ gemBal, activateGemBalance });
      // console.log({ reason: "gem balance" });
      setActivateGemBalance(new BigNumber(gemBal).toFixed(2));
    }

    if (Number(shellBal).toFixed(2) !== Number(activateShellBalance).toFixed(2)) {
      // shellBal is string
      // console.log({ reason: "shell balance" });
      setActivateShellBalance(new BigNumber(shellBal).toFixed(2));
    }
  }, [gemBalance]);

  return (
    <>
      {redux.account.error ? (
        <ErrorAlert
          title="Error"
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
                  network. Click{" "}
                  <a
                    className="cursor-pointer underline"
                    onClick={async () => {
                      await NetworkService.createOrSwitchNetwork();
                    }}
                  >
                    here
                  </a>{" "}
                  for add/switch to a Binance network in your Metamask
                </>
              }
            />
          )}
        </>
      )}

      <nav className="flex min-h-48 min-w-full justify-end fixed px-6 py-4 bg-transparent mt-2 z-20">
        <div className="w-full lg:block lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
          <div className="flex">
            {!account && (
              <button
                // style={{ fontFamily: "AristotelicaBold", lineHeight: "0.7rem" }}
                type="button"
                className="focus:outline-none block text-md px-4 ml-2 py-2 rounded-xl bg-gray-800 text-white font-bold hover:text-white hover:bg-gray-700"
                onClick={activateBrowserWallet}
              >
                Connect Wallet
              </button>
            )}

            {account && (
              <>
                <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 bg-opacity-80">
                  <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                    Balance: {activateGemBalance} <IconTip text="$GEM Balance"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={GemIcon} /></IconTip> |{" "}
                    {activateShellBalance} <IconTip text="$SHELL Balance"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={ShellIcon} /></IconTip>
                  </span>
                </div>

                <div className="flex lg:mt-0 px-4 py-2 mr-2 rounded-xl shadow bg-gray-600 bg-opacity-80">
                  <span className="p-1 text-sm text-gray-200 font-bold font-sans">
                    Price: <IconTip text="Price of 1 $GEM"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={GemIcon} /></IconTip> = $ {activateGemPrice} |{" "}
                    <IconTip text="Price of 1 $SHELL"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={ShellIcon} /></IconTip> = $ {activateShellPrice}
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
                      Safe: {activateClamBalanceInSafe} <IconTip text="Clams owned"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={ClamIcon} /></IconTip> |{" "}
                      {activatePearlBalanceInSafe} <IconTip text="Pearls owned"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={PearlIcon} /> </IconTip>{" "}
                      {location.pathname.indexOf("saferoom") === -1 && (
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
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
                      Farm: {activateClamBalanceInFarm} <IconTip text="Clams deposited"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={ClamIcon} /></IconTip> |{" "}
                      {activatePearlBalanceInFarm} <IconTip text="Pearls for collection"><img style={{maxHeight: "1rem", marginBottom: "-0.1rem"}} src={PearlIcon} /></IconTip>
                      {location.pathname.indexOf("farms") === -1 && (
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
                      )}
                    </span>
                  </Link>
                </div>
                <NavBarUserProfile account={account} disconnect={deactivate} />
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
