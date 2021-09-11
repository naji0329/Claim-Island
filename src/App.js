import React, { useEffect } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ROUTES from "./router";
import NavigationButton from "./components/NavigationButton";

// Main App Component
const App = () => {
  const { account, connect } = useWallet();

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
