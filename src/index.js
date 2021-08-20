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

const chainId = 56;
const rpcUrl = "https://bsc-dataseed.binance.org";

const config = {
  supportedChains: [1337, 56],
  readOnlyChainId: ChainId.BSC,
  multicallAddresses: { 1337: multicallAddress },
  readOnlyUrls: {
    [ChainId.BSC]: "https://bsc-dataseed.binance.org",
    [1337]: "http://127.0.0.1:8545/",
  },
};

ReactDOM.render(
  <Provider store={store}>
    <bsc.UseWalletProvider
      chainId={chainId}
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
