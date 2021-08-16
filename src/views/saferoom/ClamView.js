import React, { useState } from "react";
import Accordion from "../../components/Accordion";
import { get } from "lodash";

import { Clam3DView } from "../../components/clam3DView";
import { Pearl3DView } from "../../components/pearl3DView";

export default ({ dna, dnaDecoded }) => {
  const [showTraits, setShowTraits] = useState(false);

  console.log({ dnaDecoded });

  const RowStat = ({ label, value }) => (
    <div className="text-sm flex flex-row justify-between my-1">
      <div className="block">
        <p className="text-gray-500 font-semibold">{label}</p>
      </div>

      <div className="block">
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );

  const accordionData = [
    {
      title: "General Stats",
      description: (
        <div>
          <RowStat label="Rarity" value={get(dnaDecoded, "[0].rarity")} />
          <RowStat label="Lifespan" value={get(dnaDecoded, "[0].lifespan")} />
          <RowStat label="Size" value={get(dnaDecoded, "[0].size")} />
        </div>
      ),
    },
    {
      title: "Body",
      description: (
        <div>
          <RowStat label="Shape" value={get(dnaDecoded, "[0].shellShape")} />
          <RowStat
            label="Shell Color"
            value={get(dnaDecoded, "[0].shellColor")}
          />
          <RowStat
            label="Inner Color"
            value={get(dnaDecoded, "[0].innerColor")}
          />
          <RowStat label="Lip Color" value={get(dnaDecoded, "[0].lipColor")} />
          <RowStat label="Pattern" value={get(dnaDecoded, "[0].pattern")} />
        </div>
      ),
    },
    {
      title: "Tongue",
      description: (
        <div>
          <RowStat label="Shape" value={get(dnaDecoded, "[0].tongueShape")} />
          <RowStat label="Color" value={get(dnaDecoded, "[0].tongueColor")} />
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex flex-col justify-between">
        <div className="flex justify-between flex-col sm:flex-row">
          {/** 3D Clam with react three fiber */}
          <Clam3DView
            width={400}
            height={400}
            clamDna={dna}
            decodedDna={dnaDecoded}
            showTraitsTable={showTraits}
          />
          {/** 3D Clam with react three fiber */}
          {/*<Pearl3DView />*/}
          <div className="w-full md:w-1/2 px-4 md:px-6">
            <Accordion data={accordionData} />
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
          <button
            disabled
            className="disabled:opacity-50 cursor-not-allowed px-4 p-3 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold"
          >
            Stake in Farm
          </button>
          <button
            disabled
            className="disabled:opacity-50 cursor-not-allowed px-4 p-3 shadown-xl   text-red-700 font-semibold border-2 border-red-500 rounded-xl hover:text-white hover:bg-red-500 bg-transparent"
          >
            Sell
          </button>
        </div>
      </div>
    </>
  );
};
