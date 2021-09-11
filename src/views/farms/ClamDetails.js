import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { Clam3DView } from "components/clam3DView";
import { getPearlDataByIds } from "web3/shared";
import PearlInfo from "../bank/utils/PearlInfo";
import { secondsToFormattedTime } from "../../utils/time";

const ClamDetails = ({ clam, clamProcessing, updateAccount }) => {
  const [producedPearls, setProducedPearls] = useState([]);
  const [timeLeft, setTimeLeft] = useState(clamProcessing.remainingTime || 0);
  const remainingFormattedTime = secondsToFormattedTime(timeLeft);
  const { chainId } = useEthers();

  useEffect(() => {
    const init = async () => {
      try {
        const pearls = await getPearlDataByIds(clam.producedPearlIds, chainId);
        setProducedPearls(pearls);
      } catch (err) {
        updateAccount({ error: err.message });
      }
    };

    init();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="ClamDetails flex flex-row">
      <div className="flex flex-1 flex-col items-center">
        <p className="font-extrabold text-green-600 text-center text-lg font-avenir mb-2">
          {clamProcessing.heading}
        </p>
        <Clam3DView
          width={400}
          height={400}
          clamDna={clam.clamDataValues.dna}
          decodedDna={clam.dnaDecoded}
          showTraitsTable={false}
        />

        <div className="flex flex-row justify-between my-2" style={{ width: "400px" }}>
          <p className="float-left">Remaining Time</p>
          <p className="float-right">{remainingFormattedTime}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="detail-box">
          <h1 className="heading">General Stats</h1>
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-1 mt-2">
            <div>Harvestable $SHELL</div>
            <div className="text-right">{clamProcessing.harvestableShell}</div>
            <div>Lifespan Remaining</div>
            <div className="text-right">{clamProcessing.remainingLifeSpan}</div>
          </div>
        </div>

        <div className="detail-box mt-4 overflow-y-auto" style={{ maxHeight: "20rem" }}>
          <h1 className="heading">Produced Pearls</h1>
          <div className="flex flex-col gap-2">
            {producedPearls.map((pearl, i, a) => (
              <PearlInfo key={i} pearl={pearl} isLast={i === a.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClamDetails;
