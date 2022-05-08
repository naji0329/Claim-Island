import React, { useState } from "react";
import classnames from "classnames";

import DepositTab from "./DepositTab";
import WithdrawTab from "./WithdrawTab";
import { CONNECT_WALLET_TIP } from "constants/ui";

import PoolHarvest from "./PoolHarvest";

// WHEN WITHDRAWING FROM POOL DEPOSIT. CALLED IN ./PoolItem.js
const PoolDepositWithdraw = ({ depositFee, disabled, toggleModal, harvestAmount }) => {
  const [tab, setTab] = useState(2);

  const StateButton = ({ isActive, children, ...rest }) => (
    <button
      {...rest}
      className={classnames("w-full p-4 text-center", {
        "font-aristotelica-bold text-md bg-gray-100 rounded-t-xl": isActive,
        "font-aristotelica text-md text-gray-800": !isActive,
      })}
    >
      {children}
    </button>
  );

  const handleSelect = (i) => {
    if (disabled) {
      return;
    }
    setTab(i);
  };

  return (
    <div className="w-full" style={{ padding: "0 2%" }}>
      <div data-tip={CONNECT_WALLET_TIP} className={disabled ? "tooltip" : ""}>
        <div className="flex flex-row justify-between h-1/5">
          <StateButton isActive={tab === 2} onClick={() => handleSelect(2)}>
            Havest
          </StateButton>
          <StateButton isActive={tab === 0} onClick={() => handleSelect(0)}>
            Deposit
          </StateButton>
          <StateButton isActive={tab === 1} onClick={() => handleSelect(1)}>
            Withdraw
          </StateButton>
        </div>
      </div>

      <div
        className={classnames("flex w-full bg-gray-100 p-4 h-4/5", {
          "rounded-b-xl rounded-tr-xl": tab === 0,
          "rounded-b-xl rounded-tl-xl": tab === 1,
        })}
      >
        {tab === 0 && <DepositTab depositFee={depositFee} />}

        {tab === 1 && <WithdrawTab />}

        {tab === 2 && <PoolHarvest toggleModal={toggleModal} harvestAmount={harvestAmount} /> }        
      </div>
    </div>
  );
};
export default PoolDepositWithdraw;
