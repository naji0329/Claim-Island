import React, { useState } from "react";
import classnames from "classnames";

import DepositTab from "./DepositTab";
import WithdrawTab from "./WithdrawTab";

// WHEN WITHDRAWING FROM POOL DEPOSIT. CALLED IN ./PoolItem.js
const PoolDepositWithdraw = ({ depositFee }) => {
  const [tab, setTab] = useState(0);

  const StateButton = ({ isActive, children, ...rest }) => (
    <button
      {...rest}
      className={classnames("w-full p-4 text-center", {
        "font-aristotelica-bold text-xl bg-gray-300 rounded-t-xl": isActive,
        "font-aristotelica text-xl text-gray-800": !isActive,
      })}
    >
      {children}
    </button>
  );

  const handleSelect = (i) => {
    setTab(i);
  };

  return (
    <div className="w-full" style={{ padding: "0 2%" }}>
      <div className="flex flex-row justify-between h-1/5">
        <StateButton isActive={tab === 0} onClick={() => handleSelect(0)}>
          Deposit
        </StateButton>
        <StateButton isActive={tab === 1} onClick={() => handleSelect(1)}>
          Withdraw
        </StateButton>
      </div>

      <div
        className={classnames("flex w-full bg-gray-200 p-4 h-4/5", {
          "rounded-b-xl rounded-tr-xl": tab === 0,
          "rounded-b-xl rounded-tl-xl": tab === 1,
        })}
      >
        {tab === 0 && <DepositTab depositFee={depositFee} />}

        {tab === 1 && <WithdrawTab />}
      </div>
    </div>
  );
};
export default PoolDepositWithdraw;
