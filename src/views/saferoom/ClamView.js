import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import ReactTooltip from "react-tooltip";
import { useInterval } from "react-use";
import { Skeleton } from "@pancakeswap-libs/uikit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faExternalLinkAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { Clam3DView } from "components/clam3DView";
import { Controls3DView } from "components/controls3DView";
import { Accordion2, Accordion2Item } from "components/accordion2";
import { clamNFTAddress, pearlFarmAddress } from "constants/constants";
import { formatNumberToLocale } from "utils/formatNumberToLocale";
import { formatShell } from "utils/clams";
import { getPearlsMaxBoostTime } from "utils/getPearlsMaxBoostTime";
import { secondsToFormattedTime } from "utils/time";
import { takeSnapshot } from "utils/takeSnapshot";
import { getClamIncubationTime } from "web3/clam";
import { getCurrentBlockTimestamp } from "web3/index";
import { getPearlDataByIds } from "web3/shared";

import { SocialMediaButtons } from "components/socialMediaButtons";

import { getRemainingPearlProductionTime } from "web3/pearlFarm";

import { pearlSize } from "./utils/pearlSizeAndGradeValues";
import PearlInfo from "../bank/utils/PearlInfo";

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
  view,
  owner,
  ownerAddress,
}) => {
  const [isClamAvailableForHarvest, setIsClamAvailableForHarvest] = useState(false);
  const [producedPearls, setProducedPearls] = useState([]);
  const [producedPearlsYieldTimers, setProducedPearlsYieldTimers] = useState([]);
  const [remainingPearlProductionTime, setRemainingPearlProductionTime] = useState(0);
  const [isTakingSnapshot, setIsTakingSnapshot] = useState(false);
  const remainingFormattedTime = secondsToFormattedTime(remainingPearlProductionTime);
  useInterval(() => {
    const updatedProducedPearlsYieldTimers = producedPearlsYieldTimers.map((time) => {
      const remainingTime = time - 1000;
      if (remainingTime > 0) {
        return remainingTime;
      }

      return 0;
    });
    setProducedPearlsYieldTimers(updatedProducedPearlsYieldTimers);
    if (remainingPearlProductionTime > 0) {
      setRemainingPearlProductionTime(remainingPearlProductionTime - 1);
    }
  }, 1000);
  const harvestableShell =
    get(dnaDecoded, "shellShape") === "maxima"
      ? "N/A"
      : +clamValueInShellToken > 0
      ? +clamValueInShellToken + +pearlsProduced * +pearlValueInShellToken
      : "0";
  const formattedHarvestableShell =
    harvestableShell !== "N/A" ? formatShell(harvestableShell) : "N/A";
  const isFarmView = view === "farm";
  const isInspectorView = view === "inspector";

  const handleTakeSnapshot = () => {
    setIsTakingSnapshot(true);
  };

  useEffect(() => {
    if (isTakingSnapshot) {
      setTimeout(() => {
        const cb = () => setIsTakingSnapshot(false);
        takeSnapshot("clam-view", cb);
      }, 500);
    }
  }, [isTakingSnapshot]);

  useEffect(() => {
    const initClamView = async () => {
      const [incubationTime, currentBlockTimestamp, pearls, remainingPearlProductionTime] =
        await Promise.all([
          getClamIncubationTime(),
          getCurrentBlockTimestamp(),
          getPearlDataByIds(producedPearlIds),
          getRemainingPearlProductionTime(clamId),
        ]);
      if (isFarmView) {
        setRemainingPearlProductionTime(remainingPearlProductionTime);
      }

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
      <div className="flex flex-col justify-between w-full relative">
        {isTakingSnapshot && (
          <div className="absolute w-full h-full z-10 min-w-[1024px]">
            <Skeleton animation="waves" variant="rect" height="100%" />
          </div>
        )}
        <div
          id="clam-view"
          className={
            isTakingSnapshot
              ? "flex justify-between flex-row pt-4 pl-4"
              : "flex justify-between flex-col sm:flex-row"
          }
        >
          <div className="grid">
            {owner &&
              (ownerAddress != pearlFarmAddress ? (
                <div className="flex justify-center">
                  <span>
                    Owned by{" "}
                    <a
                      className=""
                      target="_blank"
                      rel="noreferrer"
                      href={`https://bscscan.com/token/${clamNFTAddress}?a=${ownerAddress}#inventory`}
                    >
                      {owner} <FontAwesomeIcon icon={faExternalLinkAlt} className="ml-1" />
                    </a>
                  </span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <span>Currently in Clam Farm</span>
                </div>
              ))}
            <div className="w-[400px] h-[400px] relative">
              <div
                className={`absolute flex w-full h-full justify-center items-center z-20 bg-white bg-opacity-50 ${
                  owner != "N/A" ? "hidden" : ""
                }`}
              >
                <span className="text-3xl">Clam Harvested</span>
              </div>
              <Clam3DView
                width={"100%"}
                height={"100%"}
                clamDna={dna}
                decodedDna={dnaDecoded}
                // clamTraits={clamTraits}
              />
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center">
                <div className="badge badge-success mr-2">#{clamId}</div>
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
                <SocialMediaButtons assetId={clamId} assetName="Clam" />
              </div>
            </div>
            {isFarmView && (
              <div className="flex flex-row justify-between my-2" style={{ width: "400px" }}>
                <p className="float-left">Remaining Time</p>
                <p className="float-right">{remainingFormattedTime}</p>
              </div>
            )}
          </div>
          <div className="w-full px-4 md:px-6">
            <Accordion2 defaultTab="GeneralStats" isOpened={isTakingSnapshot}>
              <Accordion2Item title="General Stats" id="GeneralStats" scroll={true}>
                <div
                  className={
                    isTakingSnapshot
                      ? "grid grid-cols-4 grid-rows-1 gap-3"
                      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                  }
                >
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
              </Accordion2Item>
              <Accordion2Item title="Traits" id="Traits" scroll={true}>
                <div
                  className={
                    isTakingSnapshot
                      ? "grid grid-cols-4 grid-rows-1 gap-3"
                      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3"
                  }
                >
                  <CardStat label="Shell Shape" value={get(dnaDecoded, "shellShape")} />
                  <CardStat label="Shell Colour" value={get(dnaDecoded, "shellColor")} />
                  <CardStat label="Shell Pattern" value={get(dnaDecoded, "pattern")} />
                  <CardStat label="Inner Color" value={get(dnaDecoded, "innerColor")} />
                  <CardStat label="Lip Color" value={get(dnaDecoded, "lipColor")} />
                  <CardStat label="Tongue Shape" value={get(dnaDecoded, "tongueShape")} />
                  <CardStat label="Tongue Colour" value={get(dnaDecoded, "tongueColor")} />
                  <CardStat
                    label="Size"
                    value={
                      pearlSize(get(dnaDecoded, "size")) + " (" + get(dnaDecoded, "size") + ")"
                    }
                  />
                </div>
              </Accordion2Item>
              {!isTakingSnapshot && (
                <Accordion2Item title="Produced pearls" id="ProducedPearls" scroll={false}>
                  <div
                    className="flex flex-col gap-2 overflow-y-auto"
                    style={{ maxHeight: "220px" }}
                  >
                    {producedPearls.length > 0
                      ? producedPearls.map((pearl, i, a) => (
                          <PearlInfo
                            key={pearl.pearlId}
                            pearl={pearl}
                            isLast={i === a.length - 1}
                            maxBoostIn={producedPearlsYieldTimers[i]}
                            gemPriceUSD={gemPriceUSD}
                            hideViewDetails={true}
                          />
                        ))
                      : "This Clam has not yet produced any Pearls."}
                  </div>
                </Accordion2Item>
              )}
            </Accordion2>
          </div>
        </div>
        {!isFarmView &&
          (isInspectorView ? (
            <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
              <button
                className="cursor-not-allowed opacity-50 btn btn-secondary"
                data-tip="Coming soon..."
              >
                Make Offer
              </button>

              <Link to="/shop">
                <button className="disabled:opacity-50 disabled:cursor-not-allowed btn btn-secondary">
                  Clam Shop
                </button>
              </Link>
            </div>
          ) : (
            <div className="flex justify-between mt-4 pt-4 space-x-14 border-t">
              <Link to="/farms">
                <button className="btn btn-secondary">Stake in Farm</button>
              </Link>
              <Link
                className={isClamAvailableForHarvest ? "" : "cursor-not-allowed"}
                to={isClamAvailableForHarvest ? "/shop?view=harvest" : "#"}
              >
                <button
                  disabled={!isClamAvailableForHarvest}
                  className="disabled:opacity-50 disabled:cursor-not-allowed btn btn-secondary"
                >
                  Harvest for $SHELL
                </button>
              </Link>
              <button disabled className="disabled:opacity-50 cursor-not-allowed btn btn-warning">
                Sell
              </button>
            </div>
          ))}
      </div>
      <Controls3DView onClickNext={onClickNext} onClickPrev={onClickPrev} />
    </>
  );
};
