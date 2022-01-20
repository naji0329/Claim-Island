import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

export const InspectorControls = ({ tokenId: defaultTokenId, view }) => {
  const [tokenId, setTokenId] = useState(defaultTokenId >= 0 ? defaultTokenId : "");
  const isClamView = view === "clam";

  const history = useHistory();

  const handleChange = (e) => {
    if (e.target.value < 0) {
      return;
    }
    setTokenId(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      history.push(`/saferoom/${view}/inspect/${tokenId}`);
    }
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <span className="mr-2">{`Enter ${isClamView ? "Clam" : "Pearl"} ID: #`}</span>
      <input
        type="number"
        placeholder="ID"
        className="input input-bordered w-32 mr-2 text-2xl"
        value={tokenId}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Link
        className="btn btn-primary btn-md text-lg mr-2"
        role="button"
        aria-pressed="true"
        to={`/saferoom/${view}/inspect/${tokenId}`}
      >
        Inspect
      </Link>
      <div className="flex flex-none bg-gray-900 bg-opacity-80 p-2 rounded mr-2">
        <Link
          className={`px-5 py-1 text-xl ${
            isClamView ? " text-blue-700 bg-gray-200 bg-opacity-80 rounded" : "text-gray-400"
          }`}
          to="/saferoom/clam/inspect/-1"
        >
          Clams
        </Link>

        <Link
          className={`px-5 py-1  text-xl ${
            !isClamView ? "text-blue-700  bg-gray-200 bg-opacity-80 rounded" : "text-gray-400"
          }`}
          to="/saferoom/pearl/inspect/-1"
        >
          Pearls
        </Link>
      </div>
    </div>
  );
};
