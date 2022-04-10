import React from "react";
import ReactDOM from "react-dom";
import { ModalProvider } from "@pancakeswap-libs/uikit";
import { ThemeProvider } from "styled-components";
import { light } from "@pancakeswap-libs/uikit";
import TagManager from "react-gtm-module";

import { Provider } from "redux-zero/react";
import { store } from "store/redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// import library css
import "leaflet/dist/leaflet.css";
import "./index.scss";
import "react-toastify/dist/ReactToastify.css";

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GTM_TRACKING_NO,
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={light}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
