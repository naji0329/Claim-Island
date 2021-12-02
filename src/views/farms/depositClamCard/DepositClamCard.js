import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "../index.scss";
import "./DepositClamCard.scss";

export const DepositClamCard = ({
  onClick,
  pearlProductionPrice,
  minPearlProductionTime,
  maxPearlProductionTime,
}) => {
  return (
    <button className="FarmItem depositClamCard md:mt-0" onClick={onClick}>
      <div className="depositClamCardItem item1">
        <div className="cardContent">
          <FontAwesomeIcon className="cardIcon" icon={faPlus} />
          <span className="cardText">Deposit Clam</span>
        </div>
      </div>
      <div className="depositClamCardItem item2 text-xs p-4">
        <ul>
          <li className="flex justify-between">
            <span>Pearl production price:</span>
            <span>{pearlProductionPrice} GEM</span>
          </li>
          <li className="flex justify-between">
            <span>Pearl production time:</span>
            <span>
              {minPearlProductionTime}-{maxPearlProductionTime} hrs
            </span>
          </li>
          <li className="flex justify-between">
            <span>Avg Pearl GEM boost:</span>
            <span>2x</span>
          </li>
          <li className="flex justify-between">
            <span>Avg Clam GEM boost:</span>
            <span>2x</span>
          </li>
          <li className="flex justify-between">
            <span>Total Avg Yield per Pearl:</span>
            <span>{pearlProductionPrice * 2 * 2} GEM</span>
          </li>
        </ul>
      </div>
    </button>
  );
};
