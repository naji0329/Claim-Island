import React from "react";
import { Link } from "react-router-dom";

import { SAFEROOM_TABS as TABS } from "constants/ui";
import { ClamsSorting } from "components/clamsSorting";
import { PearlsSorting } from "components/pearlsSorting";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const SaferoomNav = ({ tab, url, clamBalance, pearlBalance }) => {
  const showNumberOfAssets = (number, asset) => {
    return +number > 1 ? `${number} ${asset}s` : `${number} ${asset}`;
  };

  return (
    <div className="w-full py-2 mx-auto flex  border-b-2 border-gray-200 border-opacity-80">
      <div className="flex flex-none bg-gray-900 bg-opacity-80 p-2 rounded mr-2">
        <Link
          className={`px-5 py-2 text-2xl ${
            tab === TABS.clam ? " text-blue-700 bg-gray-200 bg-opacity-80 rounded" : "text-gray-400"
          }`}
          to={`${url}/clam`}
        >
          {showNumberOfAssets(clamBalance, TABS.clam)}
        </Link>

        <Link
          className={`px-5 py-2  text-2xl ${
            tab === TABS.pearl
              ? "text-blue-700 bg-gray-200 bg-opacity-80 rounded"
              : "text-gray-400"
          }`}
          to={`${url}/pearl`}
        >
          {showNumberOfAssets(pearlBalance, TABS.pearl)}
        </Link>
      </div>
      {tab === TABS.clam ? <ClamsSorting page="saferoom" /> : <PearlsSorting page="saferoom" />}
      <div className="flex-grow" />
      <Link to={`/saferoom/${tab.toLowerCase()}/inspect/-1`}>
        <button className="btn btn-secondary btn-lg">
          <FontAwesomeIcon icon={faSearch} className="mx-1" /> Inspector
        </button>
      </Link>
    </div>
  );
};
