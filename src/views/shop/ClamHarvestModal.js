import React, { useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import { formatUnits } from "@ethersproject/units";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import {
  getClamValueInShellToken,
  getPearlValueInShellToken,
  harvestClamForShell,
  getClamIncubationTime,
} from "../../web3/clam";

import { getCurrentBlockTimestamp } from "../../web3";

import "./index.scss";

import { actions } from "../../store/redux";
import { Modal, useModal } from "components/Modal";
import { ClamsSorting } from "components/clamsSorting";
import { getSortedClams } from "utils/clamsSort";

import { formatNumberToLocale } from "utils/formatNumberToLocale";

import {
  harvestClamProcessing,
  harvestClamSpeak,
  harvestCongrats,
  harvestError,
  harvestChooseClams,
  harvestNoClamsAvailable,
} from "./character/HarvestClam";

const formatShell = (value) => (value ? formatUnits(String(value), 18) : "0");

const ClamItem = ({ clam, clamValueInShellToken, pearlValueInShellToken, harvestClam }) => {
  const { tokenId, img } = clam;
  const { pearlProductionCapacity, pearlsProduced } = clam.clamDataValues;
  const harvestableShell =
    +clamValueInShellToken > 0
      ? +clamValueInShellToken + +pearlsProduced * +pearlValueInShellToken
      : "0";

  return (
    <div>
      <div className="card bg-white shadow-lg overflow-visible w-full border-4 border-gray-50 hover:border-4 hover:border-blue-200 ">
        <div className="flex-shrink-0">
          <img className="h-64 w-full object-fill" src={img} alt="" />
        </div>
        <div className="flex-1 bg-white p-6 flex flex-col justify-between">
          <div className="flex-1">
            <div className="flex justify-between px-4 py-2">
              <div className=" badge badge-success">#{tokenId}</div>
              <div className="text-green-400 text-bold">{clam.dnaDecoded.rarity}</div>
            </div>

            <div className="block mt-2">
              <div className="border rounded border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                    <div className="flex flex-row w-full justify-between">
                      <dt className="text-sm font-medium text-gray-500">$SHELL</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                        {formatShell(harvestableShell)}
                      </dd>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                    <div className="flex flex-row w-full justify-between">
                      <dt className="text-sm font-medium text-gray-500">Lifespan</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                        {+pearlProductionCapacity - +pearlsProduced} / {+pearlProductionCapacity}{" "}
                        pearls
                      </dd>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:gap-4 sm:px-6">
                    <div className="flex flex-row w-full justify-between">
                      <dt className="text-sm font-medium text-gray-500">Clam Boost</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                        {formatNumberToLocale(clam.pearlBoost, 2) + "x"}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="flex items-center flex-col">
            <Link
              to={`/saferoom/clam?id=${tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-neutral mt-4 font-montserrat font-bold w-full"
            >
              View in saferoom&nbsp;
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </Link>
            <div className="w-full">
              <button
                className="btn btn-secondary mt-4 font-montserrat font-bold w-full"
                onClick={() =>
                  harvestClam(tokenId, formatNumberToLocale(harvestableShell, 1, true))
                }
              >
                Harvest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const formatDuration = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return [`${hours}h`, `${minutes}m`, `${seconds}s`].filter((item) => item[0] !== "0").join(" ");
};

const ClamHarvestModal = ({
  setModalToShow,
  account: { address, clamBalance, ...stateAccount },
  updateCharacter,
  updateAccount,
  updateClams,
  sorting: {
    shop: { clams: clamsSortOrder },
  },
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [clams, setClams] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [clamValueInShellToken, setClamValueInShellToken] = useState("0");
  const [pearlValueInShellToken, setPearlValueInShellToken] = useState("0");

  const { isShowing, toggleModal } = useModal({ show: true });

  const harvestClam = async (tokenId, shell) => {
    toggleModal();
    // character speaks
    console.log(shell);
    harvestClamSpeak({ updateCharacter, setModalToShow, shell: shell }, async () => {
      try {
        harvestClamProcessing({ updateCharacter });
        await harvestClamForShell(tokenId, address);
        await updateClams();
        harvestCongrats({ updateCharacter, setModalToShow, shell: shell }); // character speaks
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

  useEffect(async () => {
    try {
      setIsLoading(true);
      const incubationtime = await getClamIncubationTime();

      if (+clamBalance > 0) {
        const currentBlockTimestamp = await getCurrentBlockTimestamp();

        const filteredClams = stateAccount.clams.filter(
          ({ clamDataValues: { pearlProductionCapacity, pearlsProduced, birthTime } }) => {
            return (
              +pearlsProduced < +pearlProductionCapacity &&
              currentBlockTimestamp > +birthTime + +incubationtime
            );
          }
        );

        setClams(filteredClams);

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

        setIsLoading(false);
      } else {
        // clam balance is zero
        const hours = formatDuration(+incubationtime);
        harvestNoClamsAvailable({ updateCharacter, setModalToShow, hours }); // character speaks
        setIsLoading(false);
      }

      setClamValueInShellToken(await getClamValueInShellToken());
      setPearlValueInShellToken(await getPearlValueInShellToken());
    } catch (error) {
      console.log({ error });
    }
  }, [address, clamBalance]);

  return (
    <div className="HarvestModal">
      <Modal isShowing={isShowing} onClose={closeModal} width={"90rem"}>
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
              <div className="ClamDeposit p-2">
                <div>
                  <h3 className="heading">{message}</h3>
                  <div className="flex flex-row justify-center text-center gap-6 mb-3">
                    <h1 className="text-gray-600 font-aristotelica-bold text-3xl pt-3">Choose a Clam</h1>
                    <ClamsSorting page="shop" textSize="sm" />
                  </div>
                  <div className="max-h-160 overflow-y-auto grid md:grid-cols-4 grid-cols-1 gap-4 flex-2 pt-3">
                    {getSortedClams(clams, clamsSortOrder.value, clamsSortOrder.order).map(
                      (clam, i) => (
                        <ClamItem
                          key={i}
                          clam={clam}
                          harvestClam={harvestClam}
                          clamValueInShellToken={clamValueInShellToken}
                          pearlValueInShellToken={pearlValueInShellToken}
                        />
                      )
                    )}
                  </div>
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
