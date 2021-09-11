import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clam3DView } from "../../components/clam3DView";
import FarmPearl from "../../assets/img/farm_pearl.png";
import { secondsToFormattedTime } from "../../utils/time";

const PearlDetails = ({ clam, clamProcessing }) => {
  console.log(clamProcessing);
  const [timeLeft, setTimeLeft] = useState(clamProcessing.remainingTime || 0);
  const remainingFormattedTime = secondsToFormattedTime(timeLeft);
  const pearls = [
    {
      gemHr: "13",
      duration: 24,
      shape: "round",
      bodyColor: "Blue",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <div className="PearlDetails flex flex-row">
      <div className="flex flex-1 flex-col">
        <p className="font-extrabold text-green-600 text-center font-avenir">{clam.heading}</p>
        <Clam3DView
          width={400}
          height={400}
          clamDna={clam.clamDataValues.dna}
          decodedDna={clam.dnaDecoded}
          showTraitsTable={false}
        />

        <div className="flex flex-row justify-between my-2" style={{ maxWidth: "400px" }}>
          <p className="float-left">Remaining Time</p>
          <p className="float-right">{remainingFormattedTime}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="detail-box general-stats">
          <h1 className="heading">General Stats</h1>
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-1 mt-2">
            <div>Harvestable $SHELL</div>
            <div className="text-right">{clamProcessing.harvestableShell}</div>
            <div>Lifespan Remaining</div>
            <div className="text-right">{clamProcessing.remainingLifeSpan}</div>
          </div>
        </div>

        <div className="detail-box produced-pearls">
          <h1 className="heading">Produced Pearls</h1>
          <div className="flex flex-col gap-2">
            {pearls.map((k, i) => (
              <div key={i} className="flex flex-row">
                <div className="w-1/2">
                  <img className="w-full p-4" src={FarmPearl} />
                </div>

                <div className="details flex flex-1 flex-col">
                  <div className="grid md:grid-cols-2 md:grid-rows-4 gap-1 items-center">
                    <div className="grid-title">$GEM/hr</div>
                    <div className="grid-value">{k.gemHr}</div>
                    <div className="grid-title">Duration (hrs):</div>
                    <div className="grid-value">{k.duration}</div>
                    <div className="grid-title">Shape:</div>
                    <div className="grid-value">{k.shape}</div>
                    <div className="grid-title">Body color:</div>
                    <div className="grid-value">{k.bodyColor}</div>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to={"/saferoom/pearl"}
                      className="font-montserrat underline"
                      style={{ color: "#757575" }}
                    >
                      View in saferoom
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PearlDetails;
