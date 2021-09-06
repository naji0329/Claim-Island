import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "@pancakeswap-libs/uikit";
// import bsc from '@binance-chain/bsc-use-wallet'
// import { UseWalletProvider } from 'use-wallet'
// import { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import * as bsc from "@binance-chain/bsc-use-wallet";
import { ThemeProvider } from "styled-components";
import { light, dark } from "@pancakeswap-libs/uikit";
import { ChainId, DAppProvider } from "@usedapp/core";

import { Provider } from "redux-zero/react";
import { store } from "./store/redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { multicallAddress } from "./web3/constants";

// import library css
import "leaflet/dist/leaflet.css";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

const bscMainnetChainId = 56;
const rpcUrl = "https://bsc-dataseed.binance.org";

const ganacheChainId = 1337;
const hardHatChainId = 31337;
const bscTestnet = 97;

const config = {
  supportedChains: [ChainId.BSC, ganacheChainId, hardHatChainId, bscTestnet],
  readOnlyChainId: ChainId.BSC,
  multicallAddresses: {
    [ChainId.BSC]: multicallAddress[ganacheChainId],
    [ganacheChainId]: multicallAddress[ganacheChainId],
    [hardHatChainId]: multicallAddress[hardHatChainId],
    [bscTestnet]: multicallAddress[bscTestnet],
  },
  readOnlyUrls: {
    [ChainId.BSC]: "https://bsc-dataseed.binance.org",
    [bscTestnet]: "https://data-seed-prebsc-1-s2.binance.org:8545/",
    [ganacheChainId]: "http://127.0.0.1:8545/",
    [hardHatChainId]: "http://127.0.0.1:8545/",
  },
};

ReactDOM.render(
  <Provider store={store}>
    <bsc.UseWalletProvider
      chainId={bscMainnetChainId}
      connectors={{
        walletconnect: { rpcUrl },
        bsc,
      }}
    >
      <DAppProvider config={config}>
        <ThemeProvider theme={dark}>
          <ModalProvider>
            <App />
          </ModalProvider>
        </ThemeProvider>
      </DAppProvider>
    </bsc.UseWalletProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
