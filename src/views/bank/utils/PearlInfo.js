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

import { burnPearlConfirmation, onBurnPearlSuccess } from "../character/BurnPearl";
import { onDepositHarvestTxn, onDepositHarvestError } from "../character/OnDepositHarvest";

import { formatUnits } from "@ethersproject/units";

const InfoLine = ({ label, value }) => (
  <div className="flex justify-between w-full">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

const PearlInfo = ({ pearl, isLast, isNativeStaker, showBurn, updateCharacter, updateAccount }) => {
  const [inTx, setInTx] = useState(false);

  const handleBurn = () => {
    const bonusReward = Number(formatUnits(String(pearl.bonusRewards), 18)).toFixed(2);
    return burnPearlConfirmation(updateCharacter, String(bonusReward), async () => {
      await executeBurnPearl();
    });
  };

  const executeBurnPearl = async () => {
    try {
      setInTx(true);
      onDepositHarvestTxn(updateCharacter);

      await burnPearl(pearl.pearlId, false); // TODO: forfeitPearl

      toast.success("Your pearl has been burned!");
      onBurnPearlSuccess(updateCharacter); // character speak
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
                <button
                  data-tip="Streamed over 30 days"
                  className="pointer-events-auto tooltip tooltip-bottom"
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={Number(formatUnits(String(pearl.bonusRewards), 18)).toFixed(2)}
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
