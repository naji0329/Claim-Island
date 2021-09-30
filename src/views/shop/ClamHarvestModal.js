import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { formatUnits } from "@ethersproject/units";
import { Link } from "react-router-dom";
import NFTUnknown from "assets/img/clam_unknown.png";

import {
  getClamByIndex,
  getClamData,
  getClamValueInShellToken,
  harvestClamForShell,
  getClamIncubationTime,
} from "../../web3/clam";

import { getCurrentBlockTimestamp } from "../../web3";

import { getDNADecoded } from "../../web3/dnaDecoder";

import "./index.scss";

import { actions } from "../../store/redux";
import { get } from "lodash";
import { Modal, useModal } from "components/Modal";

import {
  harvestClamSpeak,
  harvestCongrats,
  harvestError,
  harvestChooseClams,
  harvestNoClamsAvailable,
} from "./character/HarvestClam";

const formatShell = (value) => (value ? formatUnits(value, 18) : "0");

const ClamItem = ({ clam, clamValueInShellToken, harvestClam }) => {
  const { dnaDecoded, tokenId, img } = clam;
  return (
    <div className="clam-details">
      <div className="w-1/2">
        <img className="w-full p-4" src={img} />
      </div>
      <div className="details">
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 flex-2">
          <div className="grid-title">$SHELL</div>
          <div className="grid-value">{formatShell(clamValueInShellToken)}</div>
          <div className="grid-title">Lifespan</div>
          <div className="grid-value">{get(dnaDecoded, "lifespan")} pearls</div>
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
            className="btn btn-info mt-4 font-montserrat font-bold"
            onClick={() => harvestClam(tokenId)}
          >
            Harvest
          </button>
        </div>
      </div>
    </div>
  );
};

const getUserClamDnaByIndex = async (account, index) => {
  const tokenId = await getClamByIndex(account, index);
  const { dna, birthTime } = await getClamData(tokenId);

  if (dna.length > 1) {
    const dnaDecoded = await getDNADecoded(dna);
    return { dna, dnaDecoded, tokenId, birthTime };
  }
};

const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return [`${hours}h`, `${minutes}m`, `${seconds}s`].filter((item) => item[0] !== "0").join(" ");
};

const ClamHarvestModal = ({
  setModalToShow,
  account: { address, clamBalance },
  updateCharacter,
  updateAccount,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clams, setClams] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [clamValueInShellToken, setClamValueInShellToken] = useState("");

  const { isShowing, toggleModal } = useModal({ show: true });

  const harvestClam = async (tokenId) => {
    toggleModal();
    // character speaks
    harvestClamSpeak({ updateCharacter, setModalToShow }, async () => {
      try {
        await harvestClamForShell(tokenId, address);
        harvestCongrats({ updateCharacter, setModalToShow }); // character speaks
        setModalToShow(null);
      } catch (e) {
        console.error(e);
        updateAccount({ error: e.message });
        harvestError({ updateCharacter }); // character speaks
      }
    });
  };

  const closeModal = () => {
    toggleModal();
    setModalToShow(null);
  };

  const addClamImg = async (clams) => {
    const cache = await caches.open("clam-island");
    const promises = await Promise.all(
      clams.map((clam) => {
        const dna = clam.dna;
        return cache.match(`/clams/${dna}`);
      })
    );
    const images = await Promise.all(
      promises.map((resp) => {
        return resp ? resp.json() : "";
      })
    );
    const clamsUptd = clams.map((clam, index) => {
      let clamImg = images[index];
      clamImg = clamImg ? clamImg.img : clamImg;
      clam.img = clamImg || NFTUnknown;
      return clam;
    });
    return clamsUptd;
  };

  useEffect(async () => {
    setIsLoading(true);
    const incubationtime = await getClamIncubationTime();

    if (+clamBalance > 0) {
      let promises = [];
      for (let index = 0; index < Number(clamBalance); index++) {
        promises.push(getUserClamDnaByIndex(address, index));
      }
      let clams = await Promise.all(promises);
      clams = await addClamImg(clams);

      const currentBlockTimestamp = await getCurrentBlockTimestamp();

      const filteredClams = clams.filter(
        ({ dnaDecoded, birthTime }) =>
          get(dnaDecoded, "lifespan") !== "0" &&
          currentBlockTimestamp > +birthTime + +incubationtime
      );

      if (filteredClams.length > 0) {
        setMessage(``);
        harvestChooseClams({ updateCharacter, setModalToShow }); // character speaks
      } else {
        const hours = formatDuration(+incubationtime);
        setMessage(
          `None of your clams are able to be harvested.
           They must be either alive or be past the ${hours} incubation period once they have been farmed.`
        );
        harvestNoClamsAvailable({ updateCharacter, setModalToShow, hours }); // character speaks
      }
      setClams(filteredClams);
      setIsLoading(false);
    } else {
      // clam balance is zero
      const hours = formatDuration(+incubationtime);
      harvestNoClamsAvailable({ updateCharacter, setModalToShow, hours }); // character speaks
      setIsLoading(false);
    }

    setClamValueInShellToken(await getClamValueInShellToken());
  }, [address, clamBalance]);

  return (
    <div className="HarvestModal">
      <Modal isShowing={isShowing} onClose={closeModal} width={"30rem"} title={"Choose a Clam"}>
        {isLoading ? (
          <div>
            <h1>Loading ...</h1>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : (
          <div>
            {clams.length && !isLoading ? (
              <div className="ClamDeposit max-h-160 overflow-y-auto p-2">
                <div>
                  <h3 className="heading">{message}</h3>
                  {clams.map((clam, i) => (
                    <ClamItem
                      key={i}
                      clam={clam}
                      harvestClam={harvestClam}
                      clamValueInShellToken={clamValueInShellToken}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
                You&#39;ve got no clams ready for harvest at the moment
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

const mapToProps = (store) => store;
export default connect(mapToProps, actions)(ClamHarvestModal);
