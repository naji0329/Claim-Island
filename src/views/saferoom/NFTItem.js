import React from "react";
import NFTUnknown from "../../assets/img/clam_unknown.png";

export default ({ rarity, shape }) => {
  return (
    <>
      <div className="bg-white hover:border hover:border-blue-200 rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 flex flex-col justify-between cursor-pointer">
        <div className=" flex-1 justify-center  md:flex items-center p-5">
          <img src={NFTUnknown} />
        </div>

        <div className="px-4 md:px-6 py-2">
          <div className="text-sm flex flex-row justify-between">
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">Rarity</p>
              <p className="font-bold text-black">{rarity}</p>
            </div>
            <div className="text-sm block">
              <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">Shape</p>
              <p className="font-bold text-black">{shape}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
