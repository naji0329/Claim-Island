import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "redux-zero/react";
import moment from "moment";
import { actions } from "../../../store/redux";
import { aggregate } from "../../../web3/multicall";
import {
  prepTokenOfOwnerByIndexMulticall,
  decodeTokenOfOwnerByIndexFromMulticall,
  prepPearlDataMulticall,
  decodePearlDataFromMulticall,
} from "../../../web3/pearl";
import {
  prepGetDnaDecodedMulticall,
  decodeGetDnaDecodedFromMulticall,
} from "../../../web3/pearlDnaDecoder";
import {
  color,
  shape,
  weekStart,
  prepBonusRewardsMulticall,
  decodeBonusRewardsFromMulticall,
  burnPearl,
} from "../../../web3/pearlBurner";

const BurnPearlModal = (props) => {
  const {
    account: { address, pearlBalance },
    updateAccount,
    isNativeStaker,
  } = props;
  const [pearls, setPearls] = useState([]);
  const [eligibleShape, setEligibleShape] = useState("");
  const [eligibleColor, setEligibleColor] = useState("");
  const [startOfWeek, setStartOfWeek] = useState("");
  const startOfWeekMs = +startOfWeek * 1000;
  const nextWeek = moment(startOfWeekMs).add(7, "days");
  const remainingTime = nextWeek.diff(moment());
  const duration = moment(moment.duration(remainingTime)._data).format(
    "DD[d], HH[h], mm[m], ss[s]"
  );

  const getPearlDataByIds = async (tokenIds) => {
    const pearlDataCalls = prepPearlDataMulticall(tokenIds);
    const pearlDataResult = await aggregate(pearlDataCalls);
    const pearlDataDecoded = decodePearlDataFromMulticall(pearlDataResult.returnData, tokenIds);
    const pearlDnas = pearlDataDecoded.map((data) => data.pearlDataValues.dna);

    const dnaDecodedCalls = prepGetDnaDecodedMulticall(pearlDnas);
    const dnaDecodedResult = await aggregate(dnaDecodedCalls);
    const dnaDecodedDecoded = decodeGetDnaDecodedFromMulticall(
      dnaDecodedResult.returnData,
      tokenIds
    );

    const traits = dnaDecodedDecoded.map(
      ({ dnaDecodedValues: { size, lustre, nacreQuality, surface, rarityValue } }) => ({
        size,
        lustre,
        nacreQuality,
        surface,
        rarityValue,
      })
    );

    const bonusRewardsCalls = prepBonusRewardsMulticall(traits);
    const bonusRewardsResult = await aggregate(bonusRewardsCalls);
    const bonusRewardsDecoded = decodeBonusRewardsFromMulticall(
      bonusRewardsResult.returnData,
      tokenIds
    );

    const pearls = pearlDataDecoded.map((pearl) => {
      const samePearl = dnaDecodedDecoded.find(({ pearlId }) => pearlId === pearl.pearlId);
      const sameBonus = bonusRewardsDecoded.find(({ pearlId }) => pearlId === pearl.pearlId);

      if (samePearl && sameBonus) {
        const dnaDecoded = samePearl.dnaDecodedValues;
        const { bonusRewards } = sameBonus;
        return { ...pearl, dnaDecoded, bonusRewards };
      }
      console.error(`Pearl ${pearl.pearlId} from ${address} not found`);
    });

    const pearlsFiltered = pearls.filter((c) => c);

    return pearlsFiltered;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const tokenIdsCalls = prepTokenOfOwnerByIndexMulticall(address, +pearlBalance);
        const tokenIdsResult = await aggregate(tokenIdsCalls);
        const tokenIdsDecoded = decodeTokenOfOwnerByIndexFromMulticall(tokenIdsResult.returnData);

        const ownedPearls = await getPearlDataByIds(tokenIdsDecoded);
        setPearls(ownedPearls);

        const elShape = await shape();
        const elColor = await color();
        setEligibleShape(elShape);
        setEligibleColor(elColor);

        const start = await weekStart();
        setStartOfWeek(start);
      } catch (err) {
        updateAccount({ error: err.message });
      }
    };

    init();
  }, []);

  const eligiblePearls = pearls.filter(
    ({ dnaDecoded }) => dnaDecoded.shape === eligibleShape && dnaDecoded.color === eligibleColor
  );
  const notEligiblePearls = pearls.filter(
    ({ dnaDecoded }) => dnaDecoded.shape !== eligibleShape || dnaDecoded.color !== eligibleColor
  );

  const PearlInfo = ({ pearl, isEligible, isLast }) => {
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
          <div className="w-1/4">pearl img</div>
          <div className="w-3/4">
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

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl font-aristotelica-bold text-gray-500 text-center mb-4">
        Choose a pearl
      </h1>
      <div className="w-full bg-gray-200 rounded-lg mb-6 p-4 flex justify-between">
        <div className="flex flex-col w-3/5">
          <span className="font-bold">Pearls with these traits are available:</span>
          <div>
            <span className="text-gray-500 inline-block w-16">Shape:</span>
            <span className="text-gray-500">{eligibleShape}</span>
          </div>
          <div>
            <span className="text-gray-500 inline-block w-16">Color:</span>
            <span className="text-gray-500">{eligibleColor}</span>
          </div>
        </div>
        <div className="flex flex-col w-2/5 items-end">
          <span className="font-bold">Changes in</span>
          <span className="text-gray-500">{duration !== "Invalid date" && duration}</span>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="w-1/2 mr-8 bg-gray-200 rounded-lg p-4 flex flex-col max-h-160 overflow-y-auto">
          <p className="font-bold mb-4">Available for boost</p>
          {eligiblePearls.length ? (
            eligiblePearls.map((pearl, i, a) => (
              <PearlInfo key={i} pearl={pearl} isLast={i === a.length - 1} isEligible />
            ))
          ) : (
            <p>No pearls available</p>
          )}
        </div>
        <div className="w-1/2 bg-gray-200 rounded-lg p-4 flex flex-col max-h-160 overflow-y-auto">
          <p className="font-bold mb-4">Not available this week</p>
          {notEligiblePearls.length ? (
            notEligiblePearls.map((pearl, i, a) => (
              <PearlInfo key={i} pearl={pearl} isLast={i === a.length - 1} />
            ))
          ) : (
            <p>No pearls available</p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(BurnPearlModal);
