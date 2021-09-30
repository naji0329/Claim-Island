import { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { Link } from "react-router-dom";
import BigNumber from "bignumber.js";
import { get } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
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
import { depositClamGemPrompt, depositClamError, depositClamGemDeny } from "./character/clamDeposit";

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
  toggleModal,
  setRefreshClams
}) => {
  const [remainingTime, setRemainingTime] = useState("");
  const [buttonText, setButtonText] = useState("Deposit Clam");
  const [inTx, setInTx] = useState(false);
  const [gemApproved, setGemApproved] = useState(false);
  const [pearlPrice, setPearlPrice] = useState(new BigNumber(0));

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

      // character speaks
      depositClamGemPrompt({ updateCharacter, gems: formatFromWei(pearlPrice), dismissModal: toggleModal }, async () => {
        try {
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
          setButtonText("Deposit Clam");
          toast.success("Your clam has been deposited!. You can choose to deposit another clam.")
          setRefreshClams(true);
        } catch (err) {
          updateAccount({ error: err.message });
          setButtonText("Approve Clam");
          setInTx(false);
          depositClamError({ updateCharacter, err }); // character speaks
        }

      });

    } catch (err) {
      updateAccount({ error: err.message });
      setButtonText("Approve Clam");
      setInTx(false);
      depositClamError({ updateCharacter, err }); // character speaks
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
          <div className="grid-title">$GEM boost:&nbsp;
          <button data-tip="Boost only available the first time the Clam is deposited and only if no other Clams of the same rarity tier was deposited at the time. Boost amount will otherwise show as zero." className="pointer-events-auto tooltip">
            <FontAwesomeIcon icon={faInfoCircle} />
          </button>
          </div>
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

const ClamDeposit = ({ clams, updateCharacter, toggleModal, updateAccount, account: { address }, stakedRarities, setRefreshClams }) => {
  return (
    <div className="ClamDeposit max-h-160 overflow-y-auto p-2">
      {clams.length ? (
        <div>
          {clams.map((clam) => (
            <ClamItem key={clam.clamId} updateAccount={updateAccount} address={address} {...clam} updateCharacter={updateCharacter} toggleModal={toggleModal} stakedRarities={stakedRarities} setRefreshClams={setRefreshClams} />
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
