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

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import library css
import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "./index.scss";

const chainId = 56;
const rpcUrl = "https://bsc-dataseed.binance.org";

const config = {
  readOnlyChainId: ChainId.BSC,
  readOnlyUrls: {
    [ChainId.BSC]: "https://bsc-dataseed.binance.org",
  },
};

ReactDOM.render(
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
  </bsc.UseWalletProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
