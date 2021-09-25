import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "../index.scss";
import "./DepositClamCard.scss";

export const DepositClamCard = ({ onClick }) => {
  return (
    <button className="FarmItem depositClamCard mt-24 md:mt-0" onClick={onClick}>
      <div className="cardContent">
        <FontAwesomeIcon className="cardIcon" icon={faPlus} />
        <span className="cardText">Deposit Clam</span>
      </div>
    </button>
  );
};
