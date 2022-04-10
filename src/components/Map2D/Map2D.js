import React from "react";

import { BankIsland } from "./islands/bank";
import { InfoIsland } from "./islands/info";
import { ShopIsland } from "./islands/shop";
import { FarmIsland } from "./islands/farm";
import { SafeIsland } from "./islands/safe";
import { Ship } from "./ship";
import { LiteVersionSwitcher } from "../liteVersionSwitcher";

import "./Map2D.css";

export const Map2D = () => {
  return (
    <>
      <div className="bg">
        <div className="water" />
      </div>
      <svg style={{ width: 0, height: 0 }}>
        <filter id="turbulence" x="0" y="0" width="100%" height="100%">
          <feTurbulence id="sea-filter" numOctaves="3" seed="2" baseFrequency="0.02 0.05" />
          <feDisplacementMap scale="20" in="SourceGraphic" />
          <animate
            xlinkHref="#sea-filter"
            attributeName="baseFrequency"
            dur="60s"
            keyTimes="0;0.5;1"
            values="0.02 0.06;0.04 0.08;0.02 0.06"
            repeatCount="indefinite"
          />
        </filter>
      </svg>
      <div className="mapWrapper">
        <Ship />
        <BankIsland />
        <InfoIsland />
        <ShopIsland />
        <FarmIsland />
        <SafeIsland />
        <LiteVersionSwitcher />
      </div>
    </>
  );
};
