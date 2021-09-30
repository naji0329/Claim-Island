import React from "react";
import { Link } from "react-router-dom";

import "../../Map2D.css";
import "./BankIsland.css";
import BankBuilding from "assets/islands/bank_building.png";
import BankPlatform from "assets/islands/bank_platform.png";
import BankSign from "assets/islandSigns/bank_sign.png";

export const BankIsland = () => {
  return (
    <div className="island bankIsland" style={{ width: 400, height: 200 }}>
      <img className="bankSign" src={BankSign} />
      <img src={BankPlatform} />
      <Link to="bank">
        <img className="highlight bankBuilding" src={BankBuilding} />
      </Link>
    </div>
  );
};
