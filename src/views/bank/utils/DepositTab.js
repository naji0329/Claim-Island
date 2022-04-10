import React, { useState } from "react";
import ReactGA from "react-ga4";
import { useForm } from "react-hook-form";
import BigNumber from "bignumber.js";
import { connect } from "redux-zero/react";
import { actions } from "../../../store/redux";
import { get, round } from "lodash";

import { deposit, getAllPools } from "../../../web3/bank";
import { approveBankForMaxUint } from "../../../web3/bep20";
import { formatToWei } from "../../../web3/shared";
import { ACTIONS, CATEGORIES } from "constants/googleAnalytics";

import { formatNumber, getBalancesFormatted } from "./";

import {
  onDepositHarvestTxn,
  onDepositHarvestError,
  onDepositHarvestSuccess,
  onDepositFeeAlert,
} from "../character/OnDepositHarvest";

import SliderWithPercentages from "./SliderWithPercentages";
import ActionButton from "./ActionButton";
import { CONNECT_WALLET_TIP } from "../../../constants/ui";

const DepositTab = ({
  account: { address },
  bank: { depositAmount, selectedPool, ...bank },
  updateBank,
  updateCharacter,
  updateAccount,
  dispatchFetchAccountAssets,
  depositFee,
}) => {
  const [inTx, setInTx] = useState(false);
  const { handleSubmit, formState } = useForm();
  const { errors, isValid } = formState;

  const handleDepositChange = (e) => {
    updateBank({ depositAmount: e.target.value });
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
      await approveBankForMaxUint(address, selectedPool.lpToken, depositAmount);

      await deposit(selectedPool.poolId, formatToWei(depositAmount));

      ReactGA.event({
        action: `${ACTIONS.depositedInBank}_${selectedPool.name.replace("-", "_")}`,
        category: CATEGORIES.bank,
        value: round(selectedPool.tokenPrice * depositAmount, 2),
      });

      const balances = await getBalancesFormatted(
        address,
        selectedPool.lpToken,
        selectedPool.isSingleStake
      );
      const currentDepositBN = new BigNumber(selectedPool.userDepositAmountInPool);
      const depositBN = new BigNumber(depositAmount);
      const newDepositBN = currentDepositBN.plus(depositBN).toString();

      const setUpPools = await getAllPools({ address });

      updateBank({
        pools: setUpPools, //update all pools
        balances,
        depositAmount: "0",
        selectedPool: {
          ...selectedPool,
          userDepositAmountInPool: newDepositBN,
        },
      });

      await dispatchFetchAccountAssets();
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
        <div className="flex items-center justify-between text-sm">
          <span>Deposit fee:</span>
          <span className="mx-2">{depositFee}%</span>
        </div>
        <div className="flex items-center justify-between text-xl">
          <span>Wallet:</span>
          <span className="mx-2">{formatNumber(+get(bank, "balances[0]", "0"), 3)}</span>
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
              step="any"
              max={get(bank, "balances[0]", "0")}
              min="0"
              value={+depositAmount}
              onChange={handleDepositChange}
            />

            {/* TODO convert to dolar */}
            {/* <div className="text-md opacity-40"> ($7.01) </div> */}
          </div>

          <SliderWithPercentages
            isDeposit
            state={{ selectedPool, ...bank }}
            onChange={(newValue) => {
              updateBank(newValue);
            }}
          />

          {/* TODO better validation with Yulp */}
          {errors.depositAmount && <div className="my-2 text-error">Validation Error</div>}
        </div>
        <div data-tip={CONNECT_WALLET_TIP} className={!address ? "tooltip" : ""}>
          <ActionButton
            style="btn-secondary w-full"
            isDisabled={!isValid || inTx || !address}
            isLoading={inTx}
          >
            Deposit {get(selectedPool, "name")}
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(DepositTab);
