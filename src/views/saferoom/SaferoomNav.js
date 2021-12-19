import React from "react";
import { Link } from "react-router-dom";

import { SAFEROOM_TABS as TABS } from "constants/ui";
import { ClamsSorting } from "components/clamsSorting";
import { PearlsSorting } from "components/pearlsSorting";

export const SaferoomNav = ({ setTab, tab, url, clamBalance, pearlBalance }) => {
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
          onClick={() => setTab(TABS.clam)}
        >
          {showNumberOfAssets(clamBalance, TABS.clam)}
        </Link>

        <Link
          className={`px-5 py-2  text-2xl ${
            tab === TABS.pearl
              ? "text-blue-700  bg-gray-200 bg-opacity-80 rounded"
              : "text-gray-400"
          }`}
          to={`${url}/pearl`}
          onClick={() => setTab(TABS.pearl)}
        >
          {showNumberOfAssets(pearlBalance, TABS.pearl)}
        </Link>
      </div>
      {tab === TABS.clam ? <ClamsSorting page="saferoom" /> : <PearlsSorting page="saferoom" />}
      <div className="flex-grow" />
      <Link to={`/saferoom/${tab}/inspect/-1`}>
        <div className="flex-none text-2xl bg-blue-700 hover:bg-blue-500 text-white rounded-xl align-middle shadow-md px-8 py-2 mx-2">
          Inspector
        </div>
      </Link>
    </div>
  );
};
