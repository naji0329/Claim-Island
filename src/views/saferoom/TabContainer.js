import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "lodash";

import NFTItem from "./NFTItem";

export const TabContainer = ({ clams, openDetailedInfo, pearls }) => {
  const { tabId } = useParams();

  return (
    <>
      {tabId === "clam" && clams && clams.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
          {clams &&
            clams.map((clam, i) => {
              const rarity = get(clam.dnaDecoded, "rarity");

              let shape = get(clam.dnaDecoded, "shellShape");
              shape = shape.charAt(0).toUpperCase() + shape.slice(1);
              return (
                <div
                  onClick={() => {
                    openDetailedInfo(clam);
                  }}
                  key={i}
                >
                  <NFTItem rarity={rarity} shape={shape} img={clam.img} tokenId={clam.tokenId} />
                </div>
              );
            })}
        </div>
      )}

      {tabId === "pearl" && pearls && pearls.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
          {pearls &&
            pearls.map((pearl, i) => {
              const rarity = get(pearl.dnaDecoded, "rarity");
              let shape = get(pearl.dnaDecoded, "shape");
              shape = shape.charAt(0).toUpperCase() + shape.slice(1);
              return (
                <div
                  onClick={() => {
                    openDetailedInfo(pearl);
                  }}
                  key={i}
                >
                  <NFTItem rarity={rarity} shape={shape} img={pearl.img} tokenId={pearl.tokenId} />
                </div>
              );
            })}
        </div>
      )}
      {!pearls.length && tabId === "pearl" && (
        <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
          You&#39;ve got no pearls &#128542;
        </div>
      )}
      {!clams.length && tabId === "clam" && (
        <div className="w-full bg-white shadow-md rounded-xl text-center text-2xl p-5 text-black">
          You&#39;ve got no clams &#128542;
        </div>
      )}
    </>
  );
};
