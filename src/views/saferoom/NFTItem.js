import React from "react";

export default ({ rarity, shape, img, tokenId }) => {
  return (
    <>
      <div className="bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden border-b-4 border-blue-500 hover:border-black flex flex-col justify-between cursor-pointer">
        <div className="w-1/4 m-2 mx-auto text-center px-4 py-2 badge badge-success">
          #{tokenId}
        </div>
        <div className=" flex-1 justify-center  md:flex items-center p-5">
          <img src={img} />
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
