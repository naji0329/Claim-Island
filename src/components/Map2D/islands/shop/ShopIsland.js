import React from "react";
import { Link } from "react-router-dom";

import "../../Map2D.css";
import "./ShopIsland.css";
import ShopBuilding from "assets/islands/shop_building.png";
import ShopPlatform from "assets/islands/shop_platform.png";
import ShopSign from "assets/islandSigns/shop_sign.png";

export const ShopIsland = () => {
  return (
    <div className="island shopIsland">
      <img className="shopSign" src={ShopSign} />
      <img src={ShopPlatform} />
      <Link to="shop">
        <img className="highlight shopBuilding" src={ShopBuilding} />
      </Link>
    </div>
  );
};
