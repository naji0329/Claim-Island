import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";

import { burnPearl } from "web3/pearlBurner";
import NFTUnknown from "assets/img/pearl_unknown.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import {
  burnPearlConfirmation,
  onBurnPearlSuccess,
  forfeitPearlConfirmation,
} from "../character/BurnPearl";
import { onDepositHarvestTxn, onDepositHarvestError } from "../character/OnDepositHarvest";

import { formatUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";

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
  boosted,
}) => {
  const [inTx, setInTx] = useState(false);
  const bonusReward = boosted
    ? pearl.bonusRewards
    : new BigNumber(pearl.bonusRewards).div(2).toString();

  const bonusRewardFormatted = Number(formatUnits(bonusReward, 18)).toFixed(2);

  const handleBurn = () => {
    return burnPearlConfirmation(updateCharacter, bonusRewardFormatted, () => {
      forfeitPearlConfirmation(
        updateCharacter,
        bonusRewardFormatted,
        (+bonusRewardFormatted / 2).toFixed(2),
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
      onBurnPearlSuccess(updateCharacter, forfeit); // character speak
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
      <div className="flex w-full">
        <div className="w-32 h-32 mr-4 overflow-hidden">
          <img src={image} className="rounded-full" />
        </div>
        <div className="w-3/5">
          <InfoLine
            label={
              <>
                $GEM yield&nbsp;
                <div
                  data-tip={`Streamed over 30 days${
                    !boosted && ". Yield is half of what it would be, if boosted."
                  }`}
                  className="pointer-events-auto tooltip tooltip-bottom"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </div>
              </>
            }
            value={bonusRewardFormatted}
          />

          <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
          <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
          <div className="flex justify-between w-full my-2">
            {showBurn && (
              <button
                onClick={() => handleBurn()}
                className="mr-1 btn btn-outline btn-primary"
                disabled={!isNativeStaker || inTx}
              >
                Use
              </button>
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
      {!isLast && <div className="py-px mx-8 my-4 bg-gray-400 rounded-xl" />}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PearlInfo);
