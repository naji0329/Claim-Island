import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";

import NFTUnknown from "assets/img/pearl_unknown.png";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { enterPearlHuntCompetition } from "web3/pearlHunt";

import { pbkdf2Sync } from "crypto";

const InfoLine = ({ label, value }) => (
  <div className="w-full flex justify-between">
    <span className="text-gray-500">{label}</span>
    <span className="text-gray-500">{value}</span>
  </div>
);

const PearlInfo = ({
  account: { address },
  pearl,
  isEligible,
  isLast,
  updateCharacter,
  updateAccount,
  tgHandle,
}) => {
  const [inTx, setInTx] = useState(false);

  const executePearlHunt = async () => {
    try {
      setInTx(true);

      if (tgHandle === "") {
        throw Error("Please add Telegram handle before submitting.");
      }
      const salt = "clamIslandPearlHunt";
      const rounds = 2;
      const tgHandleHash = await pbkdf2Sync(tgHandle, salt, rounds, 32, "sha512").toString("hex");

      updateCharacter({
        name: "diego",
        action: "pearl_hunt.processing.text",
        button: {
          text: undefined,
        },
      });

      await enterPearlHuntCompetition(address, pearl.pearlId, tgHandleHash);

      toast.success("Your pearl has been entered in contest!");
      updateCharacter({
        name: "diego",
        action: "pearl_hunt.congrats.text",
        button: {
          text: "Ok",
        },
      });
    } catch (err) {
      updateCharacter({
        name: "diego",
        action: "pearl_hunt.error.text",
        button: {
          text: undefined,
        },
      });
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
      <div className="w-full flex">
        <div className="w-32 mr-4 h-32 overflow-hidden">
          <img src={image} className="rounded-full" />
        </div>
        <div className="w-3/5">
          <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
          <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
          <div className="w-full flex justify-between my-2">
            <button
              onClick={executePearlHunt}
              className={classnames("mr-1", {
                "btn btn-disabled": !isEligible,
                "btn btn-outline btn-primary": isEligible,
              })}
              disabled={inTx}
            >
              Use
            </button>
            <Link
              to={`/saferoom/pearl?id=${pearl.pearlId}`}
              className="btn btn-outline btn-secondary ml-1"
            >
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
