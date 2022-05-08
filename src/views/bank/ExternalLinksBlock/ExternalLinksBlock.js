import React from "react";

import { CONNECT_WALLET_TIP } from "constants/ui";
import { TokenExchange } from "components/tokenExchange";

export const ExternalLinksBlock = ({ totalTVL, harvestAllPools }) => (
  <>
    <div className="div_lg">
      
      <div className="flex">
        <div className="mr-2 btn glass drop-shadow-button btn-unclickable">TVL: {totalTVL}</div>
        <TokenExchange />
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
    </div>
    <div className="div_sm">

    </div>
  </>
);
