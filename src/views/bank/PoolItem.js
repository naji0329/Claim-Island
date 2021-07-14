import React, { useState, useEffect, useRef } from "react";
import { get } from "lodash";
import ClamUnknown from "../../assets/img/clam_unknown.png";

export default (pool) => {
  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 flex flex-col justify-between">
        <div className="flex-1 justify-between  md:flex items-center p-1">
          <div className="w-2/5 avatar-group -space-x-6">
            {pool.images &&
              pool.images.map((image, i) => (
                <div className="avatar" key={i}>
                  <div className="w-12 h-12">
                    <img src={image} />
                  </div>
                </div>
              ))}
          </div>
          <div className="w-3/5 mx-2">{pool.name}</div>
        </div>

        <div className="px-4 md:px-6 py-2">
          <div className="text-sm flex flex-row justify-between">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                APY
              </p>
              <p className="font-bold text-black">{pool.apy}</p>
            </div>
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                Multiplier
              </p>
              <p className="font-bold text-black text-center">
                {pool.multiplier}
              </p>
            </div>
          </div>

          <div className="text-sm flex flex-row justify-between my-2">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                $GEM Earned
              </p>
              <p className="font-bold text-gray-300">{pool.gemEarned}</p>
            </div>
            <div className="text-sm block">
              <button className="bg-gray-300 hover:bg-gray-500 px-2 text-white font-semibold text-xs rounded-xl">
                Harvest
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <button className="btn btn-info btn-outline">Enable Pool</button>
          </div>

          <div className="flex flex-col items-center mt-4">
            <button className="w-1/2 btn btn-ghost btn-xs">Details</button>
          </div>
        </div>
      </div>
    </>
  );
};
