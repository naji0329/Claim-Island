import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BigNumber from "bignumber.js";
import { get } from "lodash";

import { deposit } from "../../../web3/bank";
import { approveBankForMaxUint } from "../../../web3/bep20";
import { formatToWei } from "../../../web3/shared";

import { formatNumber, getBalancesFormatted } from ".";

import {
  onDepositHarvestTxn,
  onDepositHarvestError,
  onDepositHarvestSuccess,
  onDepositFeeAlert,
} from "../character/OnDepositHarvest";

import SliderWithPercentages from "./SliderWithPercentages";

const DepositTab = ({ useSharedState, updateCharacter, updateAccount, depositFee }) => {
  const [state, setSharedState] = useSharedState();
  const [inTx, setInTx] = useState(false);
  const { pool, account, depositAmount } = state;
  const { handleSubmit, formState } = useForm();
  const { errors, isValid } = formState;

  const handleDepositChange = (e) => {
    setSharedState({ ...state, depositAmount: e.target.value });
  };

  const handleDeposit = async () => {
    if (depositFee) {
      onDepositFeeAlert(updateCharacter, async () => {
        await executeDeposit();
      });
    } else {
      await executeDeposit();
    }
  };

  const executeDeposit = async () => {
    setInTx(true);
    onDepositHarvestTxn(updateCharacter);
    try {
      await approveBankForMaxUint(account, pool.lpToken);
      await deposit(pool.poolId, formatToWei(depositAmount));

      const balances = await getBalancesFormatted(account, pool.lpToken, pool.isSingleStake);
      const currentDepositBN = new BigNumber(pool.userDepositAmountInPool);
      const depositBN = new BigNumber(depositAmount);
      const newDepositBN = currentDepositBN.plus(depositBN).toString();

      setSharedState({
        ...state,
        balances,
        depositAmount: "0",
        pool: {
          ...pool,
          userDepositAmountInPool: newDepositBN,
        },
      });
      setInTx(false);
      onDepositHarvestSuccess(updateCharacter); // character speak
    } catch (error) {
      onDepositHarvestError(updateCharacter); // character speak
      setInTx(false);
      updateAccount({ error: error.message });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleDeposit)} className="w-full">
      <div className="flex flex-col w-full h-full justify-between">
        <div className="flex items-center justify-between opacity-40 text-xl">
          <div className="">Wallet:</div> {/* TODO: update after deposit */}
          <div className="flex items-center">
            <div className="mx-2">{formatNumber(+get(state, "balances[0]", "0"), 3)}</div>
            {/* <div className="text-sm">($15.01) </div> */}
          </div>
        </div>

        {/* bank 2.0 feature */}
        {/* <div className="flex items-center  my-4">
        <div className="text-xl mr-4">Deposit with</div>

        <div className="flex items-center">
          <div className="avatar">
            <div className=" rounded-full w-8 h-8">
              <img src="https://clamisland.fi/favicon/android-chrome-192x192.png" />
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div> */}

        <div className="flex flex-col px-8 py-4">
          <div className="w-full flex justify-between items-center">
            <input
              className="text-4xl text-right pt-2 w-full rounded bg-transparent"
              placeholder="Amount"
              type="number"
              max={get(state, "balances[0]", "0")}
              value={formatNumber(+state.depositAmount, 3)}
              onChange={handleDepositChange}
            />

            {/* TODO convert to dolar */}
            {/* <div className="text-md opacity-40"> ($7.01) </div> */}
          </div>

          <SliderWithPercentages isDeposit useSharedState={useSharedState} />

          {/* TODO better validation with Yulp */}
          {errors.depositAmount && <div className="my-2 text-error">Validation Error</div>}
        </div>

        <button
          disabled={!isValid || inTx}
          type="submit"
          className="w-full text-white bg-green-500 hover:bg-green-400 rounded-xl shadow-xl p-2 text-center text-2xl"
        >
          Deposit {get(state, "pool.name")}
        </button>
      </div>
    </form>
  );
};
export default DepositTab;
