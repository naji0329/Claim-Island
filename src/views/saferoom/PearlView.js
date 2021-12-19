import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Accordion from "components/Accordion";
import { get } from "lodash";
import { formatUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import { useInterval } from "react-use";

import { Pearl3DView } from "components/pearl3DView";
import { Controls3DView } from "components/controls3DView";
import { renderNumber } from "utils/number";
import { formatMsToDuration } from "utils/time";
import { getPearlsMaxBoostTime } from "utils/getPearlsMaxBoostTime";
import { getMaxApr, getMaxRoi } from "utils/pearlStats";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { pearlGrade, pearlSize } from "./utils/pearlSizeAndGradeValues";
import ReactTooltip from "react-tooltip";
import { formatOwnerAddress } from "utils/formatOwnerAddress";
import { pearlNFTAddress } from "constants/constants";

const CardStat = ({ label, value }) => (
  <div
    className="card card-side my-1 text-sm rounded-xl border border-secondary"
    style={{ backgroundColor: "#e8f7fd" }}
  >
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

export default (props) => {
  const {
    dna,
    dnaDecoded,
    bonusRewards,
    gemPriceUSD,
    pearlDataValues,
    pearlId,
    boostColor,
    boostShape,
    boostPeriodInSeconds,
    boostPeriodStart,
    onClickNext,
    onClickPrev,
    hideProduceButton,
    owner,
    ownerAddress,
    view,
  } = props;
  const [grade, setGrade] = useState(0);
  const [size, setSize] = useState(0);
  const [maxBoostIn, setMaxBoostIn] = useState(0);
  const isInspectorView = view === "inspector";

  useInterval(() => {
    if (maxBoostIn > 0) {
      setMaxBoostIn(Math.max(maxBoostIn - 1000, 0));
    }
  }, 1000);

  const bonusRewardFormatted = Number(formatUnits(bonusRewards, 18)).toFixed(2);
  const maxGemYield = (
    <>
      {bonusRewardFormatted + " ($" + renderNumber(+(gemPriceUSD * +bonusRewardFormatted), 2) + ")"}
    </>
  );

  const pearlPriceBN = new BigNumber(pearlDataValues.pearlPrice);
  const showApr = pearlPriceBN.gt(0);

  const maxApr = getMaxApr(pearlDataValues, maxBoostIn, bonusRewards);
  const maxRoi = getMaxRoi(pearlDataValues, bonusRewards);
  const maxAprRoiField = `${showApr ? maxRoi + "% / " + maxApr : "?% / ?"}%`;

  useEffect(() => {
    if (dnaDecoded.length) {
      const grade_ = pearlGrade(
        get(dnaDecoded, "lustre"),
        get(dnaDecoded, "surface"),
        get(dnaDecoded, "nacreQuality")
      );
      setGrade(grade_);

      const size_ = pearlSize(get(dnaDecoded, "size"));
      setSize(size_);
    }
  }, [dnaDecoded]);

  useEffect(() => {
    const calculatedMaxBoostIn = getPearlsMaxBoostTime({
      shape: dnaDecoded.shape,
      colour: dnaDecoded.color,
      currentBoostColour: boostColor,
      currentBoostShape: boostShape,
      period: boostPeriodInSeconds,
      startOfWeek: boostPeriodStart,
    });

    setMaxBoostIn(calculatedMaxBoostIn);
  }, [dnaDecoded, boostColor, boostShape, boostPeriodInSeconds, boostPeriodStart]);

  const accordionData = [
    {
      title: "Traits",
      description: (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          <CardStat label="Shape" value={get(dnaDecoded, "shape")} />
          <CardStat label="Color" value={get(dnaDecoded, "color")} />
          <CardStat label="Overtone" value={get(dnaDecoded, "overtone")} />
          <CardStat label="Size" value={size + " (" + get(dnaDecoded, "size") + ")"} />
        </div>
      ),
    },
    {
      title: "Grading",
      description: (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          <CardStat label="Grade" value={grade} />
          <CardStat label="Surface" value={get(dnaDecoded, "surface")} />
          <CardStat label="Lustre" value={get(dnaDecoded, "lustre")} />
          <CardStat label="Nacre Quality" value={get(dnaDecoded, "nacreQuality")} />
        </div>
      ),
    },
    {
      title: "Gem Yield",
      description: (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          <CardStat
            label={
              <>
                Max GEM Yield&nbsp;
                <button
                  data-tip={
                    '<p class="text-left pb-2">Streamed linearly over 30 days.</p><p class="text-left pb-2">Max GEM Yield is available when traits match with the Bank\'s requirements.</p><p class="text-left pb-2">Claiming the boost without a match will result in a 50% reduction of GEM Yield.'
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={maxGemYield}
          />
          <CardStat
            label={
              <>
                Max ROI / Max APR&nbsp;
                <button data-tip='<p class="text-left pb-2">Assumes that the Pearl is exchanged for max GEM yield.</p><p class="text-left pb-2">APR shows annualised returns where the Pearl is exchanged for max GEM yield as soon as it next becomes available.'>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={maxAprRoiField}
          />
          <CardStat
            label={
              <>
                Max yield available in&nbsp;
                <button data-tip="Shows the time until this Pearl can next be exchanged for max GEM yield">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </button>
              </>
            }
            value={owner != "N/A" ? formatMsToDuration(maxBoostIn) : "N/A"}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <ReactTooltip html={true} className="max-w-xl" />
      <div className="flex flex-col justify-between">
        <div className="flex justify-between flex-col sm:flex-row">
          <div className="grid">
            {owner && (
              <div className="flex justify-center">
                <span>Owned by <a className="" target="_blank" rel="noreferrer" href={`https://bscscan.com/token/${pearlNFTAddress}?a=${ownerAddress}#inventory`}>
                    {owner}
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
                </a></span>
              </div>
            )}
            <div className="w-[400px] h-[400px] relative">
              <div className={`absolute flex w-full h-full justify-center items-center z-20 bg-white bg-opacity-50 ${owner != "N/A" ? "hidden" : ""}`}>
                <span className="text-center text-3xl px-4">Pearl exchanged for GEM Yield</span>
              </div>
              <Pearl3DView width={"100%"} height={"100%"} pearlDna={dna} decodedDna={dnaDecoded} />
            </div>
            <div className="flex justify-between flex-row py-2">
              <div className="badge badge-success">#{pearlId}</div>
              <div className="text-green-400 text-bold">{get(dnaDecoded, "rarity")}</div>
            </div>
          </div>
          <div className="w-full px-4 md:px-6">
            <Accordion data={accordionData} defaultTab="0" />
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
          {isInspectorView ? (
            <button

              className="cursor-not-allowed opacity-50 px-4 p-3 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold"
              data-tip="Coming soon..."
            >
              Make Offer
            </button>
          ) : (
            <Link to="/bank">
              <button className="px-4 p-3 rounded-xl shadown-xl bg-blue-500 text-white hover:bg-blue-300 font-semibold">
                Boost yield&nbsp;
                <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
              </button>
            </Link>
          )}
          {!hideProduceButton && (
            <Link to="/farms">
              <button className="px-4 p-3 rounded-xl shadown-xl bg-green-500 text-white hover:bg-green-300 font-semibold">
                Produce more pearls&nbsp;
                <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
              </button>
            </Link>
          )}
        </div>

        <Controls3DView onClickNext={onClickNext} onClickPrev={onClickPrev} />
      </div>
    </>
  );
};
