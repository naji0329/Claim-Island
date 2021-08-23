import React, { useEffect } from "react";
import { useWallet } from "@binance-chain/bsc-use-wallet";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ROUTES from "./router";

// import {  getClamTokenContract, getContract, httpProvider } from './services/web3';
// import {  getContract, httpProvider } from './services/web3';

// import NavbarComp from './components/Navbar';

// Main App Component
const App = (props) => {
  const { account, connect } = useWallet();

  // const contract = getClamTokenContract();
  // console.log(contract);

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
            return <Route key={i} path={k.url} exact={true} component={k.component} />;
          })}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
