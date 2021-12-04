import { useEffect, useState } from "react";
import { Skeleton } from "@pancakeswap-libs/uikit";
import { useInterval } from "react-use";

import { getPearlDataByIds } from "web3/shared";
import { getRemainingPearlProductionTime } from "web3/pearlFarm";
import { getClamValueInShellToken, getPearlValueInShellToken, getPearlBoost } from "web3/clam";
import { color, shape, periodStart, periodInSeconds } from "web3/pearlBurner";
import { getGemPrice } from "web3/gemOracle";
import { Clam3DView } from "components/clam3DView";
import { Controls3DView } from "components/controls3DView";
import { secondsToFormattedTime } from "utils/time";
import { getPearlsMaxBoostTime } from "utils/getPearlsMaxBoostTime";
import { formatUnits } from "@ethersproject/units";

import PearlInfo from "../bank/utils/PearlInfo";

import "./index.scss";

const formatShell = (value) => (value ? formatUnits(String(value), 18) : "0");

const ClamDetails = ({ clam, updateAccount, onClickNext, onClickPrev }) => {
  const [producedPearls, setProducedPearls] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [pearlBoost, setPearlBoost] = useState(0);
  const [clamValueInShellToken, setClamValueInShellToken] = useState("0");
  const [pearlValueInShellToken, setPearlValueInShellToken] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [gemPriceUSD, setGemPriceUSD] = useState("0");
  const [producedPearlsYieldTimers, setProducedPearlsYieldTimers] = useState([]);
  const remainingFormattedTime = secondsToFormattedTime(timeLeft);
  const { clamDataValues } = clam;
  const { dna, pearlsProduced, pearlProductionCapacity } = clamDataValues;
  const harvestableShell =
    +clamValueInShellToken > 0
      ? +clamValueInShellToken + +pearlsProduced * +pearlValueInShellToken
      : "0";
  const remainingLifeSpan = +pearlProductionCapacity - +pearlsProduced;

  useInterval(() => {
    const updatedProducedPearlsYieldTimers = producedPearlsYieldTimers.map((time) => {
      const remainingTime = time - 1000;
      if (remainingTime > 0) {
        return remainingTime;
      }

      return 0;
    });
    setProducedPearlsYieldTimers(updatedProducedPearlsYieldTimers);
  }, 1000);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const pearls = await getPearlDataByIds(clam.producedPearlIds);
        setProducedPearls(pearls);

        const boost = await getPearlBoost(clam.clamId);
        boost > 0 ? setPearlBoost(boost) : setPearlBoost(clam.pearlBoost);
        const remainingPearlProductionTime = await getRemainingPearlProductionTime(clam.clamId);
        setTimeLeft(remainingPearlProductionTime);
        setClamValueInShellToken(await getClamValueInShellToken());
        setPearlValueInShellToken(await getPearlValueInShellToken());
        const [boostedColor, boostedShape, periodInSecs, startOfWeek, gemPriceUSD] =
          await Promise.all([color(), shape(), periodInSeconds(), periodStart(), getGemPrice()]);

        const pearlsYieldTimers = pearls.map((pearl) =>
          getPearlsMaxBoostTime({
            shape: pearl.dnaDecoded.shape,
            colour: pearl.dnaDecoded.color,
            currentBoostColour: boostedColor,
            currentBoostShape: boostedShape,
            period: periodInSecs,
            startOfWeek: startOfWeek,
          })
        );
        setProducedPearlsYieldTimers(pearlsYieldTimers);
        setGemPriceUSD(gemPriceUSD);
      } catch (err) {
        updateAccount({ error: err.message });
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [clam]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft, clam]);

  return (
    <div className="ClamDetails flex flex-row">
      <div className="flex flex-1 flex-col items-start">
        <p
          className="font-extrabold text-green-600 text-center text-lg font-avenir mb-2"
          style={{ width: "400px" }}
        >
          {clam.dnaDecoded?.rarity}
        </p>
        <Clam3DView
          width={400}
          height={400}
          clamDna={dna}
          decodedDna={clam.dnaDecoded}
          showTraitsTable={false}
        />

        <div className="flex flex-row justify-between my-2" style={{ width: "400px" }}>
          <p className="float-left">Remaining Time</p>
          <p className="float-right">{isLoading ? "" : remainingFormattedTime}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col clamStatsColumn">
        <div className="detail-box">
          <h1 className="heading">General Stats</h1>
          {isLoading ? (
            <Skeleton animation="pulse" variant="rect" />
          ) : (
            <>
              <div className="grid md:grid-cols-2 md:grid-rows-2 gap-1 mt-2">
                <div>Harvestable $SHELL</div>
                <div className="text-right">{formatShell(harvestableShell)}</div>
                <div>Pearls Remaining</div>
                <div className="text-right">{remainingLifeSpan}</div>
                <div>Clam boost</div>
                <div className="text-right">{pearlBoost}</div>
              </div>
            </>
          )}
        </div>

        <div className="detail-box mt-4">
          <h1 className="heading">Produced Pearls</h1>
          {isLoading ? (
            <Skeleton animation="pulse" variant="rect" />
          ) : (
            <div className="flex flex-col gap-2 overflow-y-auto" style={{ maxHeight: "18rem" }}>
              {producedPearls.map((pearl, i, a) => (
                <PearlInfo
                  key={pearl.pearlId}
                  pearl={pearl}
                  isLast={i === a.length - 1}
                  maxBoostIn={producedPearlsYieldTimers[i]}
                  gemPriceUSD={gemPriceUSD}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Controls3DView onClickPrev={onClickPrev} onClickNext={onClickNext} />
    </div>
  );
};

export default ClamDetails;
