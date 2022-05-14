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
import { getMaxApr, getMaxRoi } from "utils/pearlStats";

import { pearlGrade } from "../../saferoom/utils/pearlSizeAndGradeValues";

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
  <div className="flex justify-between w-full pb-1">
    <span className="text-gray-500 text-left">{label}</span>
    <span className="text-gray-500 text-right">{value}</span>
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
  hideViewDetails,
}) => {
  const { pearlPrice } = pearl.pearlDataValues;
  const pearlPriceBN = new BigNumber(pearlPrice);
  const showApr = pearlPriceBN.gt(0);

  const maxApr = getMaxApr(pearl.pearlDataValues, maxBoostIn, pearl.bonusRewards);
  const maxRoi = getMaxRoi(pearl.pearlDataValues, pearl.bonusRewards);

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

      //toast.success("Your pearl has been burned!");
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
      <div className="div_lg">

        <ReactTooltip html={true} className="max-w-xl" />
        <div className="w-full flex justify-between px-5">
          <div className="w-32 mr-4 h-full overflow-hidden">
            <img src={image} className="rounded-full" />
            <div className="flex justify-center text-center text-gray-600 pt-2">
              <span className="badge badge-success">#{pearl.pearlId}</span>
            </div>
            <p className="text-center text-gray-600 pt-2">{pearl.dnaDecoded["rarity"]}</p>
          </div>
          <div className="w-2/3">
            <InfoLine
              label={
                <>
                  Max GEM Yield&nbsp;
                  <button
                    data-tip={
                      '<p class="text-left pb-2">Streamed linearly over 30 days.</p><p class="text-left pb-2">Max GEM Yield is available when traits match with the Bank\'s requirements.</p><p class="text-left pb-2">Claiming the boost without a match will result in a 50% reduction of GEM Yield.'
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </>
              }
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
                  Max ROI / Max APR&nbsp;
                  <button data-tip='<p class="text-left pb-2">Assumes that the Pearl is exchanged for max GEM yield.</p><p class="text-left pb-2">APR shows annualised returns where the Pearl is exchanged for max GEM yield as soon as it next becomes available.'>
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </>
              }
              value={`${showApr ? maxRoi + "% / " + maxApr : "?% / ?"}%`}
            />
            
            <InfoLine
              label={
                <>
                  Max yield available in&nbsp;
                  <button data-tip="Shows the time until this Pearl can next be exchanged for max GEM yield">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </button>
                </>
              }
              value={formatMsToDuration(maxBoostIn)}
            />
            <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
            <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
            <InfoLine label="Grade:" value={
              pearlGrade(
                pearl.dnaDecoded["surface"],
                pearl.dnaDecoded["lustre"],
                pearl.dnaDecoded["nacreQuality"]
              )
            } />
            <div className="flex justify-between w-full my-2">
              {showBurn && (
                <span
                  data-tip-disable={false}
                  data-tip={
                    !isNativeStaker
                      ? "You need to make a deposit in a GEM or SHELL pool before you can exchange Pearls for GEM yield."
                      : ""
                  }
                >
                  <button
                    onClick={() => handleBurn()}
                    className="mr-1 btn btn-outline btn-primary"
                    disabled={!isNativeStaker || inTx}
                  >
                    Use
                  </button>
                </span>
              )}
              {!hideViewDetails && (
                <Link
                  to={`/saferoom/pearl?id=${pearl.pearlId}`}
                  className="ml-1 btn btn-outline btn-secondary"
                >
                  View Details&nbsp;
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </Link>
              )}
            </div>
          </div>
        </div>
        {!isLast && <div className="py-px mx-8 my-4 bg-blue-300 rounded-xl" />}
      </div>
      <div className="div_sm">
        <div className="mFarmItem pt-4">
          <ReactTooltip html={true} className="max-w-xl" />
          <div className="w-32 m-auto">
            <img src={image} className="rounded-full" />
            <div className="flex justify-between items-center text-gray-600 pt-2">
              <span className="badge badge-success">#{pearl.pearlId}</span>
              <p className="text-center text-gray-600">{pearl.dnaDecoded["rarity"]}</p>
            </div>
          </div>
          <div className="w-full flex justify-between px-1">
            <div className="w-full">
              {/* <InfoLine
                label={
                  <>
                    Max GEM Yield&nbsp;
                    <button
                      data-tip={
                        '<p class="text-left pb-2">Streamed linearly over 30 days.</p><p class="text-left pb-2">Max GEM Yield is available when traits match with the Bank\'s requirements.</p><p class="text-left pb-2">Claiming the boost without a match will result in a 50% reduction of GEM Yield.'
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                  </>
                }
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
                    Max ROI / Max APR&nbsp;
                    <button data-tip='<p class="text-left pb-2">Assumes that the Pearl is exchanged for max GEM yield.</p><p class="text-left pb-2">APR shows annualised returns where the Pearl is exchanged for max GEM yield as soon as it next becomes available.'>
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                  </>
                }
                value={`${showApr ? maxRoi + "% / " + maxApr : "?% / ?"}%`}
              />
              <InfoLine
                label={
                  <>
                    Max yield available in&nbsp;
                    <button data-tip="Shows the time until this Pearl can next be exchanged for max GEM yield">
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                  </>
                }
                value={formatMsToDuration(maxBoostIn)}
              />
              <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
              <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
              <InfoLine label="Grade:" value={
                pearlGrade(
                  pearl.dnaDecoded["surface"],
                  pearl.dnaDecoded["lustre"],
                  pearl.dnaDecoded["nacreQuality"]
                )
              } /> */}
              <div className="text-center m-auto w-full my-2">
                {showBurn && (
                  <div>
                    <span
                      data-tip-disable={false}
                      data-tip={
                        !isNativeStaker
                          ? "You need to make a deposit in a GEM or SHELL pool before you can exchange Pearls for GEM yield."
                          : ""
                      }
                    >
                      <button
                        onClick={() => handleBurn()}
                        className="selectBtn"
                        disabled={!isNativeStaker || inTx}
                      >
                        Use
                      </button>
                    </span>
                  </div>
                )}
                {!hideViewDetails && (
                  <div className="mt-2">
                    <Link
                      to={`/saferoom/pearl?id=${pearl.pearlId}`}
                      className="selectBtn"
                    >
                      View Details&nbsp;
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* {!isLast && <div className="py-px mx-8 my-4 bg-blue-300 rounded-xl" />} */}
        </div>
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PearlInfo);
