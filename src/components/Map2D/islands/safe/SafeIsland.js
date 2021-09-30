import React from "react";
import { Link } from "react-router-dom";

import "../../Map2D.css";
import "./SafeIsland.css";
import SafeBuilding from "assets/islands/safe_building.png";
import SafePlatform from "assets/islands/safe_platform.png";
import SafeSign from "assets/islandSigns/safe_sign.png";

export const SafeIsland = () => {
  return (
    <div className="island safeIsland">
      <img className="safeSign" src={SafeSign} />
      <img src={SafePlatform} />
      <Link to="/saferoom">
        <img className="highlight safeBuilding" src={SafeBuilding} />
      </Link>
    </div>
  );
};
