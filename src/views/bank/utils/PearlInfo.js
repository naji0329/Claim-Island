import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";

import { burnPearl } from "web3/pearlBurner";
import NFTUnknown from "assets/img/pearl_unknown.png";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { burnPearlConfirmation, onBurnPearlSuccess } from "../character/BurnPearl";
import { onDepositHarvestTxn, onDepositHarvestError } from "../character/OnDepositHarvest";

const InfoLine = ({ label, value }) => (
  <div className="w-full flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

const PearlInfo = ({
  pearl,
  isEligible,
  isLast,
  isNativeStaker,
  showBurn,
  updateCharacter,
  updateAccount,
}) => {
  const [inTx, setInTx] = useState(false);

  const handleBurn = () => {
    return burnPearlConfirmation(updateCharacter, pearl.bonusRewards, async () => {
      await executeBurnPearl();
    });
  };

  const executeBurnPearl = async () => {
    try {
      setInTx(true);
      onDepositHarvestTxn(updateCharacter);

      await burnPearl(pearl.pearlId, pearl.dnaDecoded.shape, pearl.dnaDecoded.color);

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
  }, []);

  return (
    <>
      <div className="w-full flex">
        <div className="w-32 mr-4 h-32 overflow-hidden">
          <img src={image} className="rounded-full" />
        </div>
        <div className="w-3/5">
          <InfoLine
            label={
              <>
                $GEM yield&nbsp;
                <button data-tip="Streamed over 30 days" className="pointer-events-auto tooltip">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={+pearl.bonusRewards}
          />

          <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
          <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
          <div className="w-full flex justify-between my-2">
            {showBurn && (
              <button
                onClick={handleBurn}
                className={classnames("mr-1", {
                  "btn btn-disabled": !isEligible,
                  "btn btn-outline btn-primary": isEligible,
                })}
                disabled={!isNativeStaker || !isEligible || inTx}
              >
                Use
              </button>
            )}
            <Link to={"/saferoom/pearl"} className="btn btn-outline btn-secondary ml-1">
              View Details&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Link>
          </div>
        </div>
      </div>
      {!isLast && <div className="bg-gray-400 py-px mx-8 my-4 rounded-xl" />}
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(PearlInfo);
