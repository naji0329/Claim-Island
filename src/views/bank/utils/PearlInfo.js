import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import ReactTooltip from "react-tooltip";

import { burnPearl } from "web3/pearlBurner";
import NFTUnknown from "assets/img/pearl_unknown.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { formatMsToDuration } from "utils/time";

import {
  burnPearlConfirmation,
  onBurnPearlSuccess,
  forfeitPearlConfirmation,
} from "../character/BurnPearl";
import { onDepositHarvestTxn, onDepositHarvestError } from "../character/OnDepositHarvest";

import { formatUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import { renderNumber } from "utils/number";

const InfoLine = ({ label, value }) => (
  <div className="flex justify-between w-full">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

const PearlInfo = ({
  pearl,
  isLast,
  isNativeStaker,
  showBurn,
  updateCharacter,
  updateAccount,
  maxBoostIn,
  gemPriceUSD,
}) => {
  const { pearlPrice, birthTime } = pearl.pearlDataValues;
  const pearlPriceBN = new BigNumber(pearlPrice);
  const showApr = pearlPriceBN.gt(0);
  const msInDay = 86400000;

  const maxApr = new BigNumber(pearl.bonusRewards)
    .minus(pearlPriceBN)
    .div(pearlPriceBN)
    .div(((Math.ceil((Date.now() - birthTime) / msInDay) + maxBoostIn / msInDay) % 72) + 30)
    .multipliedBy(365 * 100)
    .toFormat(2)
    .toString();

  const [inTx, setInTx] = useState(false);

  const bonusRewardFormatted = Number(formatUnits(pearl.bonusRewards, 18)).toFixed(2);
  const bonusRewardHalf = (+bonusRewardFormatted / 2).toFixed(2);
  const bonusRewardQuarter = (+bonusRewardFormatted / 4).toFixed(2);

  const handleBurn = () => {
    return burnPearlConfirmation(updateCharacter, bonusRewardFormatted, maxBoostIn, () => {
      forfeitPearlConfirmation(
        updateCharacter,
        maxBoostIn ? bonusRewardHalf : bonusRewardFormatted,
        maxBoostIn ? bonusRewardQuarter : bonusRewardHalf,
        async () => await executeBurnPearl(false),
        async () => await executeBurnPearl(true)
      );
    });
  };

  const executeBurnPearl = async (forfeit) => {
    try {
      setInTx(true);
      onDepositHarvestTxn(updateCharacter);

      await burnPearl(pearl.pearlId, forfeit);

      toast.success("Your pearl has been burned!");
      onBurnPearlSuccess(
        updateCharacter,
        forfeit,
        maxBoostIn ? bonusRewardHalf : bonusRewardFormatted,
        maxBoostIn ? bonusRewardQuarter : bonusRewardHalf
      ); // character speak
    } catch (err) {
      onDepositHarvestError(updateCharacter);
      updateAccount({ error: err.message });
      setInTx(false);
    }
  };

  const [image, setImage] = useState("");

  useEffect(() => {
    const getPearlImage = async () => {
      const cache = await caches.open("clam-island");
      const res = await cache.match(`/pearls/${pearl.pearlDataValues.dna}`);
      const image = res ? await res.json() : "";

      setImage(image && image.img ? image.img : NFTUnknown);
    };

    getPearlImage();
  }, [pearl]);

  return (
    <>
      <ReactTooltip multiline={true} />
      <div className="w-full flex justify-between px-5">
        <div className="w-32 mr-4 h-32 overflow-hidden">
          <img src={image} className="rounded-full" />
        </div>
        <div className="w-3/5">
          <InfoLine
            label={
              <>
                Max GEM Yield&nbsp;
                <button data-tip="Streamed linearly over 30 days.<br />Max GEM Yield is available when traits match with the Bank's requirements.<br />Claiming the boost without a match will result in a 50% reduction of GEM Yield.">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            // value={bonusRewardFormatted}
            value={
              <>
                {bonusRewardFormatted}
                &nbsp;($
                {renderNumber(+(gemPriceUSD * +bonusRewardFormatted), 2)})
              </>
            }
          />

          <InfoLine
            label={
              <>
                Max APR&nbsp;
                <button data-tip="GEM APR assuming the Pearl is redeemed for maximum boost as early as possible">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={`${showApr ? maxApr : "?"}%`}
          />
          <InfoLine label="Max boost in:" value={formatMsToDuration(maxBoostIn)} />
          <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
          <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
          <div className="flex justify-between w-full my-2">
            {showBurn && (
              <span data-tip-disable={false} data-tip={!isNativeStaker ? "You need to make a deposit in a GEM or SHELL pool before you can exchange Pearls for GEM yield." : ""}>
              <button
                onClick={() => handleBurn()}
                className="mr-1 btn btn-outline btn-primary"
                disabled={!isNativeStaker || inTx}
              >

                Use

              </button>
              </span>
            )}
            <Link
              to={`/saferoom/pearl?id=${pearl.pearlId}`}
              className="ml-1 btn btn-outline btn-secondary"
            >
              View Details&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Link>
          </div>
        </div>
      </div>
      {!isLast && <div className="py-px mx-8 my-4 bg-blue-300 rounded-xl" />}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PearlInfo);
