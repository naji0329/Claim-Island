import * as React from "react";
import { useState } from "react";

import { connect } from "redux-zero/react";
import { actions, store } from "store/redux";
import BigNumber from "bignumber.js";

import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import { convertUtf8ToHex } from "@walletconnect/utils";
import { useAsync } from "react-use";

import clamContract from "web3/clam";
import {
  ClamIslandChain,
  gemTokenAddress,
  shellTokenAddress,
  BUSD,
  clamNFTAddress,
  pearlNFTAddress,
} from "web3/constants";
import { getUsdPriceOfToken } from "web3/pancakeRouter";
import { getStakedClamIds, rngRequestHashForProducedPearl } from "web3/pearlFarm";
import { EmptyBytes, getOwnedClams, getOwnedPearls, formatFromWei } from "web3/shared";
import { balanceOf } from "web3/bep20";

import Navbar from "components/Navbar";

function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

const Web3ProvidersModal = ({ resetAccount, updateAccount, updatePrice, updateUI }) => {
  const [activeAddress, setActiveAddress] = useState();

  let web3;
  const web3Modal = new Web3Modal({
    network: "binance",
    cacheProvider: true, // maybe use true on production
    providerOptions: {
      // injected: {
      //   display: {
      //     name: "Injected",
      //     description: "Home-BrowserWallet",
      //   },
      // },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // required
          rpc: {
            56: "https://bsc-dataseed.binance.org/",
          },
          network: "binance",
          chainId: 56,
        },
        // options: {
        //   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // required
        //   rpc: {
        //     97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        //   },
        //   network: "binance",
        //   chainId: 97,
        // },
      },
    },
  });

  useAsync(async () => {
    if (web3Modal.cachedProvider) {
      onConnect();
    }
  });

  const isBinanceChain = (chainId) =>
    [ClamIslandChain.BSC, ClamIslandChain.Localhost, ClamIslandChain.BSC_TESTNET].includes(chainId);

  const onConnect = async () => {
    console.log("onConnect");
    const provider = await web3Modal.connect();

    await subscribeProvider(provider);

    web3 = initWeb3(provider);

    const [address] = await web3.eth.getAccounts();
    const chainId = await web3.eth.getChainId();

    const isBSChain = isBinanceChain(chainId);

    console.log({
      chainId,
      provider,
      address,
    });

    await updateAccount({
      // error: isBSChain ? null : activateError,
      address,
      isConnected: !!address,
      isBSChain,
      chainId,
      reason: "onConnect",
    });

    setActiveAddress(address);

    // get balances and nfts
    await getAccountAssets();
  };

  const subscribeProvider = async (provider) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => {
      console.log("close");
      resetApp();
    });

    provider.on("accountsChanged", async (accounts) => {
      console.log("accountsChanged");
      updateAccount({ address: accounts[0], reason: "accountsChanged" });
      // get balance and nfts from account
      await getAccountAssets();
    });

    provider.on("chainChanged", async (chainId) => {
      const netId = parseInt(chainId);
      console.log("chainChanged", { netId });

      const isBSChain = isBinanceChain(netId);

      updateAccount({
        isBSChain,
        chainId: netId,
        reason: "chainChanged",
      });

      // get balance and nfts from account on new network
      await getAccountAssets();
    });
  };

  const getAccountAssets = async () => {
    console.log("getAccountAssets");
    const {
      account: { address, chainId, isBSChain },
    } = store.getState();

    updateUI({ isFetching: true });
    try {
      if (isBSChain) {
        const [gemPrice, shellPrice] = (
          await Promise.all([
            getUsdPriceOfToken(gemTokenAddress, BUSD),
            getUsdPriceOfToken(shellTokenAddress, BUSD),
          ])
        ).map((price) => new BigNumber(price).toFixed(2));

        updatePrice({ gem: gemPrice, shell: shellPrice });
        // get Clam and Pearsm  in farm
        const stakedClamsInFarm = await getStakedClamIds(address);
        const pearlsReadyInFarm = await Promise.all(
          stakedClamsInFarm.map((clamId) => rngRequestHashForProducedPearl(clamId, address))
        );
        const pearlBalanceInFarm = pearlsReadyInFarm.filter((el) => el !== EmptyBytes).length;
        const clamBalanceInFarm = stakedClamsInFarm.length;

        const [clamBalance, pearlBalance, gemBalance, shellBalance] = await Promise.all([
          balanceOf(clamNFTAddress, address),
          balanceOf(pearlNFTAddress, address),
          balanceOf(gemTokenAddress, address).then((b) => formatFromWei(b)),
          balanceOf(shellTokenAddress, address).then((b) => formatFromWei(b)),
        ]);

        const clams = await getOwnedClams({
          chainId,
          address,
          balance: clamBalance,
          clamContract,
        });

        const pearls = await getOwnedPearls({
          chainId,
          address,
          balance: pearlBalance,
        });

        updateAccount({
          clamBalanceInFarm,
          clamBalance,
          pearlBalanceInFarm,
          pearlBalance,
          gemBalance,
          shellBalance,
          clams,
          pearls,
          reason: "getAccountAssets",
        });

        updateUI({ isFetching: false });
      } else {
        updateUI({ isFetching: false });
      }
    } catch (error) {
      console.error("web3providerModal", { error });
      updateUI({ isFetching: false });
    }
  };

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    web3Modal.clearCachedProvider();

    resetAccount();
    setActiveAddress(undefined);
  };

  return (
    <>
      {activeAddress ? (
        <Navbar onDisconnect={resetApp} />
      ) : (
        <nav className="flex min-h-48 min-w-full justify-end fixed px-6 py-4 bg-transparent mt-2 z-20">
          <div className="w-full lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div className="flex">
              <button
                type="button"
                className="focus:outline-none block text-md px-4 ml-2 py-2 rounded-xl bg-gray-800 text-white font-bold hover:text-white hover:bg-gray-700"
                onClick={onConnect}
              >
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

// just send everything
const mapToProps = (redux) => redux;
export default connect(mapToProps, actions)(Web3ProvidersModal);
