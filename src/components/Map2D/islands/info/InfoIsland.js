import React from "react";
import { Link } from "react-router-dom";

import "../../Map2D.css";
import "./InfoIsland.css";
import InfoBuilding from "assets/islands/info_building.png";
import InfoPlatform from "assets/islands/info_platform.png";
import InfoSign from "assets/islandSigns/info_sign.png";

export const InfoIsland = () => {
  return (
    <div className="island infoIsland">
      <img className="infoSign" src={InfoSign} />
      <img src={InfoPlatform} />
      <Link to="info">
        <img className="highlight infoBuilding" src={InfoBuilding} />
      </Link>
    </div>
  );
};
