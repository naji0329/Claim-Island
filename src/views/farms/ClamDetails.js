import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Skeleton } from "@pancakeswap-libs/uikit";

import { getPearlDataByIds } from "web3/shared";
import { clamHasGeneratedBoost } from "web3/gemLocker";
import { getRemainingPearlProductionTime } from "web3/pearlFarm";
import { Clam3DView } from "components/clam3DView";
import { Controls3DView } from "components/controls3DView";
import { secondsToFormattedTime } from "utils/time";

import PearlInfo from "../bank/utils/PearlInfo";

const ClamDetails = ({ clam, updateAccount, onClickNext, onClickPrev }) => {
  const [producedPearls, setProducedPearls] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [clamHasGeneratedBonus, setClamHasGeneratedBonus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const remainingFormattedTime = secondsToFormattedTime(timeLeft);
  const { chainId } = useEthers();
  const { clamDataValues } = clam;
  const { dna, pearlsProduced, pearlProductionCapacity } = clamDataValues;
  const harvestableShell = 1 + pearlsProduced * 0.1;
  const remainingLifeSpan = pearlProductionCapacity - pearlsProduced;

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const pearls = await getPearlDataByIds(clam.producedPearlIds, chainId);
        setProducedPearls(pearls);

        const hasGeneratedBonus = await clamHasGeneratedBoost(clam.clamId);
        setClamHasGeneratedBonus(hasGeneratedBonus);

        const remainingPearlProductionTime = await getRemainingPearlProductionTime(clam.clamId);
        setTimeLeft(remainingPearlProductionTime);
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
      <div className="flex flex-1 flex-col">
        <div className="detail-box">
          <h1 className="heading">General Stats</h1>
          {isLoading ? (
            <Skeleton animation="pulse" variant="rect" />
          ) : (
            <>
              <div className="grid md:grid-cols-2 md:grid-rows-2 gap-1 mt-2">
                <div>Harvestable $SHELL</div>
                <div className="text-right">{harvestableShell}</div>
                <div>Pearls Remaining</div>
                <div className="text-right">{remainingLifeSpan}</div>
                <div>$GEM boost</div>
                <div className="text-right">{clamHasGeneratedBonus ? clam.clamBonus : 0}</div>
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
                <PearlInfo key={pearl.pearlId} pearl={pearl} isLast={i === a.length - 1} />
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
