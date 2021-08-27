import { get } from "lodash";
import { useState } from "react";
import FarmPearl from "../../assets/img/farm_pearl.png";

const FarmItem = ({
  clamId,
  dnaDecoded,
  clamDataValues,
  onViewDetails,
  onWithdrawClam,
  onViewPearl,
}) => {
  const [viewPearlText, setViewPearltext] = useState("View Pearl");

  const {
    pearlProductionDelay,
    pearlProductionStart,
    birthTime,
    pearlProductionCapacity,
    pearlsProduced,
  } = clamDataValues;
  const clamStartTime = +pearlProductionStart > 0 ? +pearlProductionStart : +birthTime;
  const currentTimeInSeconds = new Date().getTime() / 1000;
  const clamNextPearlTime = clamStartTime + +pearlProductionDelay;
  const etaSeconds = clamNextPearlTime - currentTimeInSeconds;

  const clam = {
    remainingTime: new Date(+etaSeconds * 1000).toISOString().substr(11, 8),
    progress: +(
      ((currentTimeInSeconds - clamStartTime) / (clamNextPearlTime - clamStartTime)) *
      100
    ).toFixed(2),
    processing: true, // to see the 2 views... processed and processing TODO: implement logic for this
    dnaDecoded,
    heading: dnaDecoded.rarity,
    harvestableShell: pearlProductionCapacity,
    remainingLifeSpan: pearlProductionCapacity - pearlsProduced,
  };
  clam.processing = clam.progress < 100;

  const onClickViewPearl = async () => {
    setViewPearltext("Hold On ...");
    const success = await onViewPearl(clamId);
    if(!success) {
      setViewPearltext("View Pearl");
    }
  };

  return (
    <div className="FarmItem">
      <div className="flex-1 justify-center md:flex items-center p-4">
        <img className="w-auto" src={FarmPearl} />
      </div>

      {clam.processing ? (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className={"base-bar " + (clam.progress < 100 ? "base-bar-animated" : "")}>
              <div style={{ width: clam.progress + '%' }} className="completion-bar"></div>
              <span>Processing {clam.progress}%</span>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 md:px-6 py-2">
            <div className="text-sm flex flex-row justify-between">
              <div className="text-sm block">
                <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                  Remaining Time
                </p>
                <p className="font-bold text-black">{clam.remainingTime}</p>
              </div>
              <div className="text-sm block">
                <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">Lifespan Remaining</p>
                <p className="font-bold text-black text-right">{clam.remainingLifeSpan}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-2">
            <button className="withdraw-btn" onClick={onWithdrawClam}>
              Withdraw
            </button>
          </div>

          <div className="px-4 py-2 text-center">
            <button className="view-details" onClick={(e) => onViewDetails(e, clam)}>
              View Details
            </button>
          </div>
        </>
      ) : (
        <div className="px-4 py-2">
          <p className="text-center mb-2">Pearl is ready!</p>
          <div>
            <button className="view-pearl-btn" onClick={onClickViewPearl}>
              {viewPearlText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmItem;
