import { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { Link } from "react-router-dom";
import BigNumber from "bignumber.js";
import { get } from "lodash";

import { actions } from "../../store/redux";
import { approveContractForMaxUintErc721 } from "../../web3/bep20";
import { clamNFTAddress, pearlFarmAddress } from "../../web3/constants";
import { formatFromWei } from "../../web3/shared";
import { getBalance, infiniteApproveSpending, getAllowance } from "../../web3/gem";
import {
  stakeClam,
  hasClamBeenStakedBeforeByUser,
  stakeClamAgain,
  getRemainingPearlProductionTime,
  stakePrice,
} from "../../web3/pearlFarm";
import { clamRarityAlreadyStaked } from "./character/DepositClam";

const ClamItem = ({
  clamId,
  img,
  clamDataValues,
  updateAccount,
  address,
  dnaDecoded,
  stakedRarities,
  updateCharacter,
  clamBonus,
}) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [buttonText, setButtonText] = useState("Deposit Clam");
  const [inTx, setInTx] = useState(false);
  const [gemApproved, setGemApproved] = useState(false);
  const [pearlPrice, setPearlPrice] = useState(new BigNumber(0));
  const rarity = get(dnaDecoded, "rarity", "Rarity???");

  const rarityIsAlreadyStaked = stakedRarities.includes(dnaDecoded.rarity);

  useEffect(() => {
    const init = async () => {
      try {
        const remaining = await getRemainingPearlProductionTime(clamId);
        setRemainingTime(remaining);

        const pPrice = await stakePrice(); // price as string
        setPearlPrice(pPrice);

        // set up for GEM approval comparison check
        const pPriceAsBigNumber = new BigNumber(pPrice);
        const gemAllowance = await getAllowance(address, pearlFarmAddress).then(
          (v) => new BigNumber(v)
        );
        setGemApproved(pPriceAsBigNumber.lt(gemAllowance));
      } catch (err) {
        updateAccount({ error: err.message });
      }
    };

    init();
  }, [address, inTx]);

  const handleDeposit = async () => {
    setInTx(true);
    if (rarityIsAlreadyStaked) {
      clamRarityAlreadyStaked(updateCharacter, clamBonus, async () => {
        await executeDeposit();
      });
    } else {
      await executeDeposit();
    }
    setInTx(false);
  };

  const executeDeposit = async () => {
    try {
      const gemBalance = await getBalance(address).then((v) => new BigNumber(v)); // from string to BN

      if (gemBalance.lt(pearlPrice))
        throw new Error(`You need at least ${formatFromWei(pearlPrice)} GEM to stake Clam`);

      setButtonText("Approving Clam...");
      await approveContractForMaxUintErc721(clamNFTAddress, pearlFarmAddress);

      if (!gemApproved) {
        setButtonText("Approving GEM...");
        console.log(pearlPrice);
        await infiniteApproveSpending(address, pearlFarmAddress, pearlPrice);
      }

      setButtonText("Depositing Clam...");

      const hasClamBeenStakeByUserBefore = await hasClamBeenStakedBeforeByUser(clamId);
      if (hasClamBeenStakeByUserBefore) {
        await stakeClamAgain(clamId);
      } else {
        await stakeClam(clamId);
      }
    } catch (err) {
      updateAccount({ error: err.message });
      setButtonText("Approve Clam");
    }
  };

  return (
    <div className="clam-details">
      <div className="w-1/3">
        <div className="flex-row pr-4">
          <img className="w-full" src={img} />
          <div className="flex-row text-center text-green-400 text-bold">{dnaDecoded.rarity}</div>
        </div>
      </div>
      <div className="details">
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 flex-2">
          <div className="grid-title">Pearl ETA:</div>
          <div className="grid-value">
            {new Date(remainingTime * 1000).toISOString().substr(11, 8)}
          </div>
          <div className="grid-title">Lifespan:</div>
          <div className="grid-value">
            {+clamDataValues.pearlProductionCapacity - +clamDataValues.pearlsProduced} pearls
            remaining
          </div>
          <div className="grid-title">$GEM boost:</div>
          <div className="grid-value">{rarityIsAlreadyStaked ? 0 : clamBonus}</div>
        </div>
        <div className="flex flex-col">
          <Link
            to={"/saferoom/clam"}
            className="font-montserrat underline"
            style={{ color: "#757575" }}
          >
            View in saferoom
          </Link>
          <button
            disabled={inTx}
            className="btn btn-info mt-4 font-montserrat font-bold"
            onClick={() => handleDeposit()}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

const ClamDeposit = ({
  clams,
  updateAccount,
  updateCharacter,
  account: { address },
  stakedRarities,
}) => {
  return (
    <div className="ClamDeposit max-h-160 overflow-y-auto p-2">
      {clams.length ? (
        <div>
          {clams.map((clam) => (
            <ClamItem
              key={clam.clamId}
              updateAccount={updateAccount}
              updateCharacter={updateCharacter}
              address={address}
              stakedRarities={stakedRarities}
              {...clam}
            />
          ))}
        </div>
      ) : (
        <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
          You&#39;ve got no more clams available to add to farm
        </div>
      )}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamDeposit);
