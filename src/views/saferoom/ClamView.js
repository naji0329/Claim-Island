import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import ReactTooltip from "react-tooltip";
import { useInterval } from "react-use";

import { formatNumberToLocale } from "utils/formatNumberToLocale";
import { formatShell } from "utils/clams";

import { getClamIncubationTime } from "web3/clam";
import { getCurrentBlockTimestamp } from "web3/index";
import { getPearlDataByIds } from "web3/shared";

import { Clam3DView } from "components/clam3DView";
import Accordion from "components/Accordion";
import { Controls3DView } from "components/controls3DView";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { pearlSize } from "./utils/pearlSizeAndGradeValues";
import { getPearlsMaxBoostTime } from "utils/getPearlsMaxBoostTime";

import PearlInfo from "../bank/utils/PearlInfo";

export default ({
  dna,
  dnaDecoded,
  pearlBoost,
  clamDataValues: { pearlProductionCapacity, pearlsProduced, birthTime },
  clamValueInShellToken,
  pearlValueInShellToken,
  onClickNext,
  onClickPrev,
  clamId,
  producedPearlIds,
  gemPriceUSD,
  boostColor,
  boostShape,
  boostPeriodInSeconds,
  boostPeriodStart,
}) => {
  const [showTraits] = useState(false);
  const [isClamAvailableForHarvest, setIsClamAvailableForHarvest] = useState(false);
  const [producedPearls, setProducedPearls] = useState([]);
  const [producedPearlsYieldTimers, setProducedPearlsYieldTimers] = useState([]);
/*
  useInterval(() => {
    const updatedProducedPearlsYieldTimers = producedPearlsYieldTimers.map((time) => {
      const remainingTime = time - 1000;
      if (remainingTime > 0) {
        return remainingTime;
      }

      return 0;
    });
    setProducedPearlsYieldTimers(updatedProducedPearlsYieldTimers);
    ReactTooltip.rebuild();
  }, 1000);
*/
  const harvestableShell =
    get(dnaDecoded, "shellShape") == "maxima"
      ? "N/A"
      : +clamValueInShellToken > 0
      ? +clamValueInShellToken + +pearlsProduced * +pearlValueInShellToken
      : "0";
  const formattedHarvestableShell =
    harvestableShell != "N/A" ? formatShell(harvestableShell) : "N/A";

  const RowStat = ({ label, value }) => (
    <div className="flex flex-row justify-between my-1 text-sm">
      <div className="block">
        <p className="font-semibold text-gray-500">{label}</p>
      </div>

      <div className="block">
        <p className="font-bold capitalize">{value}</p>
      </div>
    </div>
  );

  const CardStat = ({ label, value }) => (
    <div className="card card-side my-1 text-sm rounded-xl border border-secondary" style={{ backgroundColor: "#e8f7fd" }}>
      <div className="card-body px-2 py-3 text-center">
        <div className="block pb-1">
          <p className="font-semibold text-xs uppercase text-blue-400">{label}</p>
        </div>
        <div className="block">
          <p className="font-bold capitalize text-base">{value}</p>
        </div>
      </div>
    </div>
  );

  const accordionData = [
    {
      title: "General Stats",
      scroll: true,
      description: (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          <CardStat label="Rarity" value={get(dnaDecoded, "rarity")} />
          <CardStat
            label="Pearls remaining / Lifespan"
            value={
              (+pearlProductionCapacity - +pearlsProduced).toString() +
              " / " +
              pearlProductionCapacity.toString()
            }
          />
          <CardStat
            label={
              <>
                Clam boost&nbsp;
                <button data-tip="Applied as a multiplier to the GEM yield for every Pearl produced by this Clam">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={formatNumberToLocale(pearlBoost, 2) + "x"}
          />
          <CardStat
            label={
              <>
                Indicative GEM ROI / APR&nbsp;
                <button data-tip='<p class="mb-4">Indicative ROI is calculated based on an average Pearl boost of 2x, assuming Pearl production price is fixed at 1/10 Clam price and all Pearls are exchanged for max yield. Your actual ROI will vary.</p><p>Indicative APR represents annualised returns based on the indicative ROI and the average time it would take to farm all Pearls, exchange them for GEM and receive the 30-day stream for max yield.</p>'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={
              formatNumberToLocale(
                (((pearlBoost * 2 - 1) * pearlProductionCapacity - 10) /
                  (10 + +pearlProductionCapacity)) *
                  100,
                2
              ) +
              "% / " +
              formatNumberToLocale(
                (((((pearlBoost * 2 - 1) * pearlProductionCapacity - 10) /
                  (10 + +pearlProductionCapacity)) *
                  100) /
                  ((40 * +pearlProductionCapacity) / 24 + 18 + 30)) *
                  365,
                2
              ) +
              "%"
            }
          />
          <CardStat
            label={
              <>
                Harvestable $SHELL&nbsp;
                <button data-tip="Amount of $SHELL you will receive if you harvest this Clam in the Shop">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={formattedHarvestableShell}
          />
        </div>
      ),
    },

    {
      title: "Traits",
      description: (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">


          <CardStat label="Shell Shape" value={get(dnaDecoded, "shellShape")} />
          <CardStat label="Shell Colour" value={get(dnaDecoded, "shellColor")} />
          <CardStat label="Shell Pattern" value={get(dnaDecoded, "pattern")} />
          <CardStat label="Inner Color" value={get(dnaDecoded, "innerColor")} />
          <CardStat label="Lip Color" value={get(dnaDecoded, "lipColor")} />
          <CardStat label="Tongue Shape" value={get(dnaDecoded, "tongueShape")} />
          <CardStat label="Tongue Colour" value={get(dnaDecoded, "tongueColor")} />
          <CardStat
            label="Size"
            value={pearlSize(get(dnaDecoded, "size")) + " (" + get(dnaDecoded, "size") + ")"}
          />
        </div>
      ),
      scroll: true,
    },
    {
      title: "Produced pearls",
      description: (
        <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: "220px" }}>
          {producedPearls.length > 0 ?
            producedPearls.map((pearl, i, a) => (
            <PearlInfo
              key={pearl.pearlId}
              pearl={pearl}
              isLast={i === a.length - 1}
              maxBoostIn={producedPearlsYieldTimers[i]}
              gemPriceUSD={gemPriceUSD}
              hideViewDetails={true}
            />
          )) : "This Clam has not yet produced any Pearls."}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const initClamView = async () => {
      const [incubationTime, currentBlockTimestamp, pearls] = await Promise.all([
        getClamIncubationTime(),
        getCurrentBlockTimestamp(),
        getPearlDataByIds(producedPearlIds),
      ]);

      const isClamAvailableForHarvest =
        +pearlsProduced < +pearlProductionCapacity &&
        birthTime &&
        currentBlockTimestamp > +birthTime + +incubationTime;
      setIsClamAvailableForHarvest(isClamAvailableForHarvest);

      setProducedPearls(pearls);

      const pearlsYieldTimers = pearls.map((pearl) =>
        getPearlsMaxBoostTime({
          shape: pearl.dnaDecoded.shape,
          colour: pearl.dnaDecoded.color,
          currentBoostColour: boostColor,
          currentBoostShape: boostShape,
          period: boostPeriodInSeconds,
          startOfWeek: boostPeriodStart,
        })
      );
      setProducedPearlsYieldTimers(pearlsYieldTimers);
    };

    initClamView();
  }, [clamId]);

  return (
    <>
      <ReactTooltip html={true} className="max-w-xl" />
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between flex-col sm:flex-row">
        <div className="grid">
          <div className="w-96 h-96">
          <Clam3DView
            width={"100%"}
            height={"100%"}
            clamDna={dna}
            decodedDna={dnaDecoded}
            // clamTraits={clamTraits}
            showTraitsTable={showTraits}
          />
          </div>
          <div className="flex justify-between flex-row py-2">
            <div className="badge badge-success">#{clamId}</div>
            <div className="text-green-400 text-bold">{get(dnaDecoded, "rarity")}</div>
          </div>
        </div>
          {/** 3D Clam with react three fiber */}

          <div className="w-full px-4 md:px-6">
            <Accordion data={accordionData} defaultTab="0" />
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
