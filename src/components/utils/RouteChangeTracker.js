import React from "react";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
const RouteChangeTracker = ({ history }) => {
  history.listen((location, action) => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname + location.search);
  });

  return <div></div>;
};

export default withRouter(RouteChangeTracker);
