import React, { useEffect } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ROUTES from "./router";
import NavigationButton from "./components/NavigationButton";

// Main App Component
const App = () => {
  const { account, connect } = useWallet();

  if (isMobile) {
    return (
      <div className="h-full absolute p-0 bg-gray-800">
        <div className="mockup-window bg-base-300 m-2">
          <div className="flex flex-col justify-start px-4 py-16 bg-base-200">
            <h1 className="text-2xl my-4">Oops!</h1>
            <p className="text-gray-500">
              Clam Island is unavailable on mobile at the monent. Our Web app is optmized for
              desktop viewing only.
            </p>
            <p className="my-4">Please access on Chrome or Brave on your computer.</p>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!account && window.localStorage.getItem("accountStatus")) {
      connect("injected");
    }
  }, [account, connect]);

  return (
    <Router>
      <div className="p-0 h-full">
        <Switch>
          {ROUTES.map((k, i) => {
            return <Route key={i} path={k.url} exact={k.exact} component={k.component} />;
          })}
        </Switch>
      </div>
      <NavigationButton />
      <ToastContainer />
    </Router>
  );
};

export default App;
