import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import ClamUnknown from "../../assets/img/clam_unknown.png";

export default ({ dna, dnaDecoded }) => {
  //   const [showTraits, setShowTraits] = useState(false);
  console.log({ dnaDecoded });
  const clam = {
    lifespan: get(dnaDecoded, "[0].lifespan"),
    rarity: get(dnaDecoded, "[0].rarity"),
    shellShape: get(dnaDecoded, "[0].shellShape"),
  };
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 flex flex-col justify-between hover:cursor-pointer">
        {/*  */}
        {/* <Clams3D
            width={270}
            height={300}
            clamDna={dna}
            decodedDna={dnaDecoded}
            showTraitsTable={showTraits}
          /> */}

        <div className="bg-white flex-1 justify-center  md:flex items-center p-5">
          <img src={ClamUnknown} />
        </div>

        {/* <img
            src={ClamUnknown}
            alt="ClamUnknown"
            className="w-full object-cover h-32 sm:h-48 md:h-64"
          /> */}

        <div className="px-4 md:px-6 py-2">
          <div className="text-sm flex flex-row justify-between">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Lifespan
              </p>
              <p className="font-bold leading-none">{clam.lifespan}</p>
            </div>

            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Rarity
              </p>
              <p className="font-bold leading-none">{clam.rarity}</p>
            </div>
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Shape
              </p>
              <p className="font-bold leading-none">{clam.shellShape}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
