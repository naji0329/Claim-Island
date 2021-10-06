import React from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO);

export const GoogleAnalytics4 = () => {
  const { pathname } = useLocation();
  ReactGA.send({ hitType: "pageview", page: pathname });

  return <></>;
};
