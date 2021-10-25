import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { CONNECT_WALLET_TIP } from "constants/ui";

export const ExternalLinksBlock = ({ totalTVL, harvestAllPools }) => (
  <div className="flex">
    <div className="mr-2 btn glass drop-shadow-button btn-unclickable">TVL: {totalTVL}</div>
    <a
      className="mr-2 btn btn-secondary drop-shadow-button"
      href="https://app.bogged.finance/swap?tokenIn=BNB&tokenOut=0x01c16da6E041Cf203959624Ade1F39652973D0EB"
      target="_blank"
      rel="noopener noreferrer"
    >
      Exchange $SHELL&nbsp;
      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
    </a>
    <a
      className="btn btn-secondary drop-shadow-button"
      href="https://app.bogged.finance/swap?tokenIn=BNB&tokenOut=0x9fb4DEF63f8caEC83Cb3EBcC22Ba0795258C988a"
      target="_blank"
      rel="noopener noreferrer"
    >
      Exchange $GEM&nbsp;
      <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
    </a>

    <div data-tip={CONNECT_WALLET_TIP} className={harvestAllPools ? "" : "tooltip"}>
      <button
        className="ml-2 btn btn-secondary drop-shadow-button"
        onClick={harvestAllPools}
        disabled={!harvestAllPools}
      >
        Harvest All Rewards
      </button>
    </div>
  </div>
);
