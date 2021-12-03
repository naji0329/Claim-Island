import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import ReactTooltip from "react-tooltip";

import {formatNumberToLocale} from "utils/formatNumberToLocale"

import { getClamIncubationTime } from "web3/clam";
import { getCurrentBlockTimestamp } from "web3/index";

import { Clam3DView } from "components/clam3DView";
import Accordion from "components/Accordion";
import { Controls3DView } from "components/controls3DView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default ({
  dna,
  dnaDecoded,
  pearlBoost,
  clamDataValues: { pearlProductionCapacity, pearlsProduced, birthTime },
  onClickNext,
  onClickPrev,
}) => {
  const [showTraits] = useState(false);
  const [isClamAvailableForHarvest, setIsClamAvailableForHarvest] = useState(false);

  const RowStat = ({ label, value }) => (
    <div className="flex flex-row justify-between my-1 text-sm">
      <div className="block">
        <p className="font-semibold text-gray-500">{label}</p>
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
          <RowStat label="Rarity" value={get(dnaDecoded, "rarity")} />
          <RowStat
            label="Pearls remaining / Lifespan"
            value={
              (+pearlProductionCapacity - +pearlsProduced).toString() +
              " / " +
              pearlProductionCapacity.toString()
            }
          />
          <RowStat label="Size" value={get(dnaDecoded, "size")} />
          <RowStat label={
            <>
              Clam boost&nbsp;
              <button data-tip='Applied as a multiplier to the GEM yield for every Pearl produced by this Clam'>
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
            </>
          }
          value={formatNumberToLocale(pearlBoost,2) + "x"} />
          <RowStat
            label={
              <>
                Indicative GEM ROI / APR&nbsp;
                <button data-tip='<p class="mb-4">Indicative ROI is calculated based on an average Pearl boost of 2x, assuming Pearl production price is fixed at 1/10 Clam price and all Pearls are exchanged for max yield. Your actual ROI will vary.</p><p>Indicative APR represents annualised returns based on the indicative ROI and the average time it would take to farm all Pearls, exchange them for GEM and receive the 30-day stream for max yield.</p>'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={
                  formatNumberToLocale((((pearlBoost * 2 - 1) * pearlProductionCapacity - 10) /
                  (10 + +pearlProductionCapacity)) *
                  100, 2)
               +
              "% / " +
                  formatNumberToLocale((((((pearlBoost * 2 - 1) * pearlProductionCapacity - 10) /
                  (10 + +pearlProductionCapacity)) *
                  100) /
                  ((40 * +pearlProductionCapacity) / 24 + 18 + 30)) *
                  365, 2)
               + "%"
            }
          />
        </div>
      ),
    },
    {
      title: "Body",
      description: (
        <div>
          <RowStat label="Shape" value={get(dnaDecoded, "shellShape")} />
          <RowStat label="Shell Color" value={get(dnaDecoded, "shellColor")} />
          <RowStat label="Inner Color" value={get(dnaDecoded, "innerColor")} />
          <RowStat label="Lip Color" value={get(dnaDecoded, "lipColor")} />
          <RowStat label="Pattern" value={get(dnaDecoded, "pattern")} />
        </div>
      ),
    },
    {
      title: "Tongue",
      description: (
        <div>
          <RowStat label="Shape" value={get(dnaDecoded, "tongueShape")} />
          <RowStat label="Color" value={get(dnaDecoded, "tongueColor")} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const initClamView = async () => {
      const incubationTime = await getClamIncubationTime();
      const currentBlockTimestamp = await getCurrentBlockTimestamp();

      const isClamAvailableForHarvest =
        +pearlsProduced < +pearlProductionCapacity &&
        birthTime &&
        currentBlockTimestamp > +birthTime + +incubationTime;
      setIsClamAvailableForHarvest(isClamAvailableForHarvest);
    };

    initClamView();
  }, [birthTime, pearlsProduced, pearlProductionCapacity]);
  return (
    <>
      <ReactTooltip html={true} className="max-w-xl"/>
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between flex-col sm:flex-row">
          {/** 3D Clam with react three fiber */}
          <Clam3DView
            width={400}
            height={400}
            clamDna={dna}
            decodedDna={dnaDecoded}
            // clamTraits={clamTraits}
            showTraitsTable={showTraits}
          />
          <div className="w-full md:w-1/2 px-4 md:px-6">
            <Accordion data={accordionData} />
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
          <Link to="/farms">
            <button className="px-4 p-3 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold">
              Stake in Farm
            </button>
          </Link>
          <Link
            className={isClamAvailableForHarvest ? "" : "cursor-not-allowed"}
            to={isClamAvailableForHarvest ? "/shop?view=harvest" : "#"}
          >
            <button
              disabled={!isClamAvailableForHarvest}
              className="disabled:opacity-50 disabled:cursor-not-allowed px-4 p-3 rounded-xl shadown-xl bg-blue-500 text-white hover:opacity-50 font-semibold"
            >
              Harvest for $SHELL
            </button>
          </Link>
          <button
            disabled
            className="disabled:opacity-50 cursor-not-allowed px-4 p-3 shadown-xl   text-red-700 font-semibold border-2 border-red-500 rounded-xl hover:text-white hover:bg-red-500 bg-transparent"
          >
            Sell
          </button>
        </div>
        <Controls3DView onClickNext={onClickNext} onClickPrev={onClickPrev} />
      </div>
    </>
  );
};
