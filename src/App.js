import React from "react";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import { useSessionStorage } from "react-use";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ROUTES from "./router";
import NavigationButton from "components/NavigationButton";
import { GoogleAnalytics4 } from "components/googleAnalytics4";
import Web3ProvidersModal from "components/Web3ProvidersModal";

// Main App Component
const App = () => {
  const [continueMobileAnyway, setContinueMobileAnyway] = useSessionStorage(
    "continueMobileAnyway",
    false
  );

  return (
    <>
      {isMobile && continueMobileAnyway === false ? (
        <div className="h-full absolute p-0 bg-gray-800">
          <div className="mockup-window bg-base-300 m-2">
            <div className="flex flex-col justify-start px-4 py-16 bg-base-200">
              <h1 className="text-2xl my-4"> Ahoy there! It looks like you are on mobile.</h1>
              <p className="text-gray-500">
                Clam Island is not optimized for mobile viewing yet - but we are working hard on it!
              </p>
              <p className="my-4">
                In the meantime, we really do recommend that you browse our site on desktop. If you
                continue on mobile, please be advised that our UI may behave unexpectedly or
                sometimes may not work at all.
              </p>

              <button
                className="btn"
                onClick={() => {
                  setContinueMobileAnyway(true);
                }}
              >
                Continue anyway
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Router>
          <div className="p-0 h-full">
            <Web3ProvidersModal  className="web3providermodal"/>
            <Switch>
              {ROUTES.map((k, i) => {
                return <Route key={i} path={k.url} exact={k.exact} component={k.component} />;
              })}
            </Switch>
          </div>
          <GoogleAnalytics4 />
          <NavigationButton />
          <ToastContainer />
        </Router>
      )}
    </>
  );
};

export default App;
