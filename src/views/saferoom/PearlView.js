import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { get } from "lodash";
import { formatUnits } from "@ethersproject/units";
import BigNumber from "bignumber.js";
import { useInterval } from "react-use";
import { Skeleton } from "@pancakeswap-libs/uikit";

import { Pearl3DView } from "components/pearl3DView";
import { Controls3DView } from "components/controls3DView";
import { Accordion2, Accordion2Item } from "components/accordion2";
import { SocialMediaButtons } from "components/socialMediaButtons";
import { pearlNFTAddress } from "constants/constants";
import { renderNumber } from "utils/number";
import { formatMsToDuration } from "utils/time";
import { getPearlsMaxBoostTime } from "utils/getPearlsMaxBoostTime";
import { getMaxApr, getMaxRoi } from "utils/pearlStats";
import { takeSnapshot } from "utils/takeSnapshot";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faInfoCircle, faCamera } from "@fortawesome/free-solid-svg-icons";

import { pearlGrade, pearlSize } from "./utils/pearlSizeAndGradeValues";

const CardStat = ({ label, value }) => (
  <div
    className="card card-side my-1 text-sm rounded-xl border border-secondary items-center"
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
  const [isTakingSnapshot, setIsTakingSnapshot] = useState(false);
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

  const handleTakeSnapshot = () => {
    setIsTakingSnapshot(true);
  };

  useEffect(() => {
    if (isTakingSnapshot) {
      setTimeout(() => {
        const cb = () => setIsTakingSnapshot(false);
        takeSnapshot("pearl-view", cb);
      }, 500);
    }
  }, [isTakingSnapshot]);

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

  return (
    <>
      <ReactTooltip html={true} className="max-w-xl" />
      <div className="flex flex-col justify-between relative">
        {isTakingSnapshot && (
          <div className="absolute w-full h-full z-10 min-w-[1024px]">
            <Skeleton animation="waves" variant="rect" height="100%" />
          </div>
        )}
        <div
          id="pearl-view"
          className={
            isTakingSnapshot
              ? "flex justify-between flex-row pt-4 pl-4"
              : "flex justify-between flex-col sm:flex-row"
          }
        >
          <div className="grid">
            {owner && (
              <div className="flex justify-center">
                <span>
                  Owned by{" "}
                  <a
                    className=""
                    target="_blank"
                    rel="noreferrer"
                    href={`https://bscscan.com/token/${pearlNFTAddress}?a=${ownerAddress}#inventory`}
                  >
                    {owner}
                    <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
                  </a>
                </span>
              </div>
            )}
            <div className="w-[400px] h-[400px] relative">
              <div
                className={`absolute flex w-full h-full justify-center items-center z-20 bg-white bg-opacity-50 ${
                  owner != "N/A" ? "hidden" : ""
                }`}
              >
                <span className="text-center text-3xl px-4">Pearl exchanged for GEM Yield</span>
              </div>
              <Pearl3DView width={"100%"} height={"100%"} pearlDna={dna} decodedDna={dnaDecoded} />
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <div className="badge badge-success mr-2">#{pearlId}</div>
                <div className="text-green-400 text-bold">{get(dnaDecoded, "rarity")}</div>
              </div>
              <div className="flex gap-2">
                <FontAwesomeIcon
                  data-tip="Take a shareable snapshot"
                  className="cursor-pointer"
                  icon={faCamera}
                  onClick={handleTakeSnapshot}
                  size="lg"
                />
                <SocialMediaButtons assetId={pearlId} assetName="Pearl" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:px-6">
            <Accordion2 defaultTab="Traits" isOpened={isTakingSnapshot}>
              <Accordion2Item title="Traits" id="Traits">
                <div
                  className={
                    isTakingSnapshot
                      ? "grid grid-cols-4 grid-rows-1 gap-3"
                      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                  }
                >
                  <CardStat label="Shape" value={get(dnaDecoded, "shape")} />
                  <CardStat label="Color" value={get(dnaDecoded, "color")} />
                  <CardStat label="Overtone" value={get(dnaDecoded, "overtone")} />
                  <CardStat label="Size" value={size + " (" + get(dnaDecoded, "size") + ")"} />
                </div>
              </Accordion2Item>
              <Accordion2Item title="Grading" id="Grading">
                <div
                  className={
                    isTakingSnapshot
                      ? "grid grid-cols-4 grid-rows-1 gap-3"
                      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                  }
                >
                  <CardStat label="Grade" value={grade} />
                  <CardStat label="Surface" value={get(dnaDecoded, "surface")} />
                  <CardStat label="Lustre" value={get(dnaDecoded, "lustre")} />
                  <CardStat label="Nacre Quality" value={get(dnaDecoded, "nacreQuality")} />
                </div>
              </Accordion2Item>
              <Accordion2Item title="Gem Yield" id="GemYield">
                <div
                  className={
                    isTakingSnapshot
                      ? "grid grid-cols-4 grid-rows-1 gap-3"
                      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                  }
                >
                  <CardStat
                    label={
                      <>
                        Max GEM Yield&nbsp;
                        <button
                          data-tip={
                            '<p class="text-left pb-2">Streamed linearly over 30 days.</p><p class="text-left pb-2">Max GEM Yield is available when traits match with the Bank\'s requirements.</p><p class="text-left pb-2">Claiming the boost without a match will result in a 50% reduction of GEM Yield.'
                          }
                        >
                          {!isTakingSnapshot && <FontAwesomeIcon icon={faInfoCircle} />}
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
                          {!isTakingSnapshot && <FontAwesomeIcon icon={faInfoCircle} />}
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
                          {!isTakingSnapshot && <FontAwesomeIcon icon={faInfoCircle} />}
                        </button>
                      </>
                    }
                    value={owner != "N/A" ? formatMsToDuration(maxBoostIn) : "N/A"}
                  />
                </div>
              </Accordion2Item>
            </Accordion2>
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
          {isInspectorView ? (
            <button
              className="cursor-not-allowed opacity-50 btn btn-secondary"
              data-tip="Coming soon..."
            >
              Make Offer
            </button>
          ) : (
            <Link to="/bank">
              <button className="btn btn-secondary">
                Boost yield&nbsp;
                <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
              </button>
            </Link>
          )}
          {!hideProduceButton && (
            <Link to="/farms">
              <button className="btn btn-secondary">
                Produce more pearls&nbsp;
                <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
              </button>
            </Link>
          )}
        </div>
      </div>
      <Controls3DView onClickNext={onClickNext} onClickPrev={onClickPrev} />
    </>
  );
};
