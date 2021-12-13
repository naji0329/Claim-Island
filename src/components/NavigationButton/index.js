import React, { useState } from "react";
import _ from "lodash";
import { Link, useLocation } from "react-router-dom";

import ROUTES from "../../router";

import "./NavigationButton.scss";

const NAV_ROUTES = _.chain(ROUTES)
  .filter((k) => k.icon)
  .sortBy((k) => k.order)
  .map(({ title, icon, url }) => ({ title, icon, url }))
  .value();

const IMG_LOC = "/nav_icons/";

const NavigationButton = () => {
  const [showNav, setShowNav] = useState(false);
  // const [isCurrent, setIsCurrent] = useState(false);
  const homeIcon = "main.svg";
  const { pathname } = useLocation();

  const checkSelectedRoute = (route, type) => {
    const url = route.url;
    const isCurrent =
      (pathname === "/" && url === "/") || (pathname.indexOf(url) !== -1 && url !== "/");

    if (type === "class") {
      return isCurrent ? "current-nav-icon" : "nav-icon";
    } else {
      const imgUrl = IMG_LOC + route.icon;
      return isCurrent ? imgUrl.replace(".svg", "_selected.svg") : imgUrl;
    }
  };

  const navIcons = () => {
    const icons = NAV_ROUTES.map((k, i) => {
      return (
        <div key={i} className="nav-access-btn" onClick={toggle}>
          <Link to={k.url} className={checkSelectedRoute(k, "class")}>
            <img src={checkSelectedRoute(k)} />
          </Link>
          <p>{k.title}</p>
        </div>
      );
    });
    return (
      <>
        {icons}
        <div className="flex flex-row space-x-4">
          <div className="nav-access-btn" onClick={toggle}>
            <button className="nav-icon">
              <img src={IMG_LOC + "cancel.svg"} />
            </button>
          </div>
          <a className="social-btn" href="https://t.me/clamisland" target="_blank" rel="noreferrer">
            <button className="nav-icon" style={{ width: "75px" }}>
              <img src={IMG_LOC + "telegram.svg"} />
            </button>
          </a>
          <a
            className="social-btn"
            href="https://twitter.com/clam_island"
            target="_blank"
            rel="noreferrer"
          >
            <button className="nav-icon" style={{ width: "75px" }}>
              <img src={IMG_LOC + "twitter.svg"} />
            </button>
          </a>
          <a
            className="social-btn"
            href="https://discord.com/invite/aH6U2hjby7"
            target="_blank"
            rel="noreferrer"
          >
            <button className="nav-icon">
              <img src={IMG_LOC + "discord.svg"} />
            </button>
          </a>
          <a
            className="social-btn"
            href="https://clamisland.medium.com/"
            target="_blank"
            rel="noreferrer"
          >
            <button className="nav-icon">
              <img src={IMG_LOC + "medium-64.png"} />
            </button>
          </a>
        </div>
      </>
    );
  };

  const toggle = () => {
    setShowNav(!showNav);
  };

  return (
    <>
      {!showNav ? (
        <>
          <div className="nav-access-btn nav-btn-container fixed" onClick={toggle}>
            <button className="nav-icon">
              <img src={IMG_LOC + homeIcon} />
            </button>
          </div>
          <div className="overlay pointer-events-none opacity-0" />
        </>
      ) : (
        <>
          <div className="nav-btn-container fixed">{navIcons()}</div>
          <div className="overlay pointer-events-auto opacity-70" />
        </>
      )}
    </>
  );
};

export default NavigationButton;
