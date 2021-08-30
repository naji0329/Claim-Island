import { Link } from "react-router-dom";
import { Pearl3DView } from "../../../components/pearl3DView";
import { burnPearl } from "../../../web3/pearlBurner";

const PearlInfo = ({ pearl, isEligible, isLast, isNativeStaker }) => {
  const hours = 720; // hours in 30 days
  const gemPerHour = (+pearl.bonusRewards / hours).toFixed(2);
  const handleBurn = async () => {
    try {
      await burnPearl(pearl.pearlId, pearl.dnaDecoded.shape, pearl.dnaDecoded.color);
    } catch (err) {
      updateAccount({ error: err.message });
    }
  };

  const InfoLine = ({ label, value }) => (
    <div className="w-full flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-500">{value}</span>
    </div>
  );

  return (
    <>
      <div className="w-full flex">
        <div className="w-2/5 mr-4">
          <Pearl3DView
            pearlDna={pearl.pearlDataValues.dna}
            decodedDna={pearl.dnaDecoded}
            height="8rem"
          />
        </div>
        <div className="w-3/5">
          <InfoLine label="$Gem/hr" value={gemPerHour} />
          <InfoLine label="Duration (hrs):" value={hours} />
          <InfoLine label="Shape:" value={pearl.dnaDecoded.shape} />
          <InfoLine label="Color:" value={pearl.dnaDecoded.color} />
          <div className="w-full flex justify-between">
            <button
              onClick={handleBurn}
              className={
                "font-montserrat underline font-bold " +
                (isEligible ? "text-blue-700" : "text-gray-500")
              }
              disabled={!isNativeStaker || !isEligible}
            >
              Use
            </button>
            <Link to={"/saferoom/pearl"} className="font-montserrat underline text-gray-500">
              View in saferoom
            </Link>
          </div>
        </div>
      </div>
      {!isLast && <div className="bg-gray-400 py-px mx-8 my-4 rounded-xl" />}
    </>
  );
};

export default PearlInfo;
