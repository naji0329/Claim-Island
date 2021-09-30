import React from "react";
import { Link } from "react-router-dom";

import "../../Map2D.css";
import "./FarmIsland.css";
import FarmBuilding from "assets/islands/farm_building.png";
import FarmPlatform from "assets/islands/farm_platform.png";
import FarmSign from "assets/islandSigns/farm_sign.png";

export const FarmIsland = () => {
  return (
    <div className="island farmIsland">
      <img className="farmSign" src={FarmSign} />
      <img src={FarmPlatform} />
      <Link to="/farms">
        <img className="highlight farmBuilding" src={FarmBuilding} />
      </Link>
    </div>
  );
};
