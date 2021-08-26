import { get } from "lodash";
import { useState } from "react";
import FarmPearl from "../../assets/img/farm_pearl.png";

const FarmItem = ({
  clamId,
  dnaDecoded,
  clamDataValues,
  onViewPearlDetails,
  onWithdrawPearl,
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
  const clamStartTime =
    +pearlProductionStart > 0 ? +pearlProductionStart : +birthTime;
  const currentTimeInSeconds = new Date().getTime() / 1000;
  const clamNextPearlTime = clamStartTime + +pearlProductionDelay;
  const etaSeconds = clamNextPearlTime - currentTimeInSeconds;

  const clam = {
    remainingTime: new Date(+etaSeconds * 1000).toISOString().substr(11, 8),
    progress: +(
      ((currentTimeInSeconds - clamStartTime) /
        (clamNextPearlTime - clamStartTime)) *
      100
    ).toFixed(2),
    processing: true, // to see the 2 views... processed and processing TODO: implement logic for this
    dnaDecoded,
    heading: dnaDecoded.rarity,
    harvestableShell: pearlProductionCapacity,
    remainingLifeSpan: pearlProductionCapacity - pearlsProduced,
  };

  const onClickViewPearl = () => {
    console.log("##########");
    setViewPearltext("Hold On ...");
    onViewPearl(clam);
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
            <div className="base-bar">
              <div
                style={{ width: clam.progress }}
                className="completion-bar"
              ></div>
              <span>Processing</span>
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
                <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                  Progress
                </p>
                <p className="font-bold text-black">{clam.progress}</p>
              </div>
            </div>
          </div>

          <div className="px-4 py-2">
            <button
              className="withdraw-btn"
              onClick={() => {
                onWithdrawPearl(clam);
              }}
            >
              Withdraw
            </button>
          </div>

          <div className="px-4 py-2 text-center">
            <button
              className="view-details"
              onClick={() => onViewPearlDetails(clam)}
            >
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
