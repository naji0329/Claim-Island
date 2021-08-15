import { get } from "lodash";
import { useState } from "react";
import FarmPearl from "../../assets/img/farm_pearl.png";

const FarmItem = ({ dna, dnaDecoded, onViewPearlDetails, onWithdrawPearl, onViewPearl }) => {
  const [viewPearlText, setViewPearltext] = useState('View Pearl')
  const pearl = {
    remainingTime: "24h 13min",
    progress: "71%",
    processing: false, // to see the 2 views... processed and processing
    dna,
    dnaDecoded,
    heading: "Somewhat Rare",
    harvestableShell: "15",
    remainingLifeSpan: "15h 13min"
  };

  const onClickViewPearl = () => {
    console.log("##########");
    setViewPearltext('Hold On ...');
    onViewPearl(pearl);
  };

  return (
    <div className="FarmItem">
      <div className="flex-1 justify-center md:flex items-center p-5">
        <img className="w-auto" src={FarmPearl} />
      </div>

      {pearl.processing ? (
        <>
          {/* Progress Bar */}
          <div className="progress-bar">
            <div className="base-bar">
              <div
                style={{ width: pearl.progress }}
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
                <p className="font-bold text-black">{pearl.remainingTime}</p>
              </div>
              <div className="text-sm block">
                <p className="text-gray-500 font-semibold text-xs mb-1 leading-none">
                  Progress
                </p>
                <p className="font-bold text-black">{pearl.progress}</p>
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 py-2">
            <button className="withdraw-btn" onClick={() => { onWithdrawPearl(pearl) }}>
              Withdraw
            </button>
          </div>

          <div className="px-4 md:px-6 py-2 justify-center flex">
            <a className="view-details" onClick={() => { onViewPearlDetails(pearl) }}>
              View Details
            </a>
          </div>
        </>
      ) : (
        <div className="px-4 md:px-6 py-2">
          <p className="text-center mb-2">Pearl is ready!</p>
          <div className="px-4 md:px-6 py-2">
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
