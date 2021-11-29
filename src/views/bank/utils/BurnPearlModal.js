import { useState, useMemo } from "react";
import { useAsync } from "react-use";
import { connect } from "redux-zero/react";
import moment from "moment";
import { actions } from "store/redux";
import { formatMsToDuration } from "utils/time";
import { getPearlDataByIds } from "web3/shared";
import { aggregate } from "web3/multicall";
import {
  prepTokenOfOwnerByIndexMulticall,
  decodeTokenOfOwnerByIndexFromMulticall,
} from "web3/pearl";
import { color, shape, periodStart, periodInSeconds, periodCheckpoint } from "web3/pearlBurner";
import { getGemPrice } from "web3/pancakeRouter";
import { useTimer } from "hooks/useTimer";
import { getPearlsMaxBoostTime } from "utils/getPearlsMaxBoostTime";
import PearlInfo from "./PearlInfo";

const BurnPearlModal = (props) => {
  const {
    account: { address, pearlBalance },
    updateAccount,
    isNativeStaker,
  } = props;
  const [pearls, setPearls] = useState([]);
  const [boostedShape, setBoostedShape] = useState("");
  const [boostedColor, setBoostedColor] = useState("");
  const [startOfWeek, setStartOfWeek] = useState("");
  const [periodInSecs, setPeriodInSecs] = useState("");
  const [gemPriceUSD, setGemPriceUSD] = useState(1);

  const calculateTimeLeft = () => {
    if (startOfWeek === "") return "calculating...";

    const startOfWeekMs = +startOfWeek * 1000;
    const nextWeek = moment(startOfWeekMs).add(periodInSecs, "s");
    const remainingMs = nextWeek.diff(moment());

    const duration = formatMsToDuration(remainingMs);

    return duration;
  };

  const { timeLeft } = useTimer(calculateTimeLeft);
  const handlePeriodCheckpoint = async () => {
    await periodCheckpoint();
  };

  useAsync(async () => {
    try {
      const tokenIdsCalls = prepTokenOfOwnerByIndexMulticall(address, +pearlBalance);
      const tokenIdsResult = await aggregate(tokenIdsCalls);
      const tokenIdsDecoded = decodeTokenOfOwnerByIndexFromMulticall(tokenIdsResult.returnData);

      const ownedPearls = await getPearlDataByIds(tokenIdsDecoded);
      setPearls(ownedPearls);

      const _shape = await shape();
      const _color = await color();
      setBoostedShape(_shape);
      setBoostedColor(_color);

      const start = await periodStart();
      setStartOfWeek(start);

      const periodInSecs = await periodInSeconds();
      setPeriodInSecs(periodInSecs);

      const gemPrice = await getGemPrice();
      setGemPriceUSD(gemPrice);
    } catch (err) {
      console.error(err);
      updateAccount({ error: err.message });
    }
  });

  const boostedPearls = useMemo(
    () =>
      pearls.filter(
        ({ dnaDecoded }) => dnaDecoded.shape === boostedShape && dnaDecoded.color === boostedColor
      ),
    [pearls, boostedShape, boostedColor]
  );
  const regularPearls = useMemo(
    () =>
      pearls.filter(
        ({ dnaDecoded }) => dnaDecoded.shape !== boostedShape || dnaDecoded.color !== boostedColor
      ),
    [pearls, boostedShape, boostedColor]
  );

  const renderPearl = (pearl, i, a) => (
    <PearlInfo
      key={pearl.pearlId}
      pearl={pearl}
      isLast={i === a.length - 1}
      isNativeStaker={isNativeStaker}
      showBurn
      maxBoostIn={getPearlsMaxBoostTime({
        shape: pearl.dnaDecoded.shape,
        colour: pearl.dnaDecoded.color,
        currentBoostColour: boostedColor,
        currentBoostShape: boostedShape,
        period: periodInSecs,
        startOfWeek,
      })}
      gemPriceUSD={gemPriceUSD}
    />
  );

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl font-aristotelica-bold text-gray-500 text-center mb-4">
        Choose a pearl
      </h1>
      <div className="w-full bg-gray-200 rounded-lg mb-6 p-4 flex justify-between">
        <div className="flex flex-col w-3/5">
          <span className="font-bold">Pearls with these traits are boosted:</span>
          <div>
            <span className="text-gray-500 inline-block w-16">Shape:</span>
            <span className="text-gray-500">{boostedShape}</span>
          </div>
          <div>
            <span className="text-gray-500 inline-block w-16">Color:</span>
            <span className="text-gray-500">{boostedColor}</span>
          </div>
        </div>
        {timeLeft.includes("-") ? (
          <div className="flex flex-col w-2/5 items-end">
            <button onClick={handlePeriodCheckpoint} className="btn btn-outline btn-primary">
              Update Pearl Boost Traits
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-2/5 items-end">
            <span className="font-bold">Changes in</span>
            <span className="text-gray-500">{timeLeft}</span>
          </div>
        )}
      </div>
      <div className="w-full flex justify-between">
        <div className="w-1/2 mr-8 bg-gray-200 rounded-lg p-4 flex flex-col max-h-160 overflow-y-auto">
          <p className="font-bold mb-4">Available for boost</p>
          {boostedPearls.length ? boostedPearls.map(renderPearl) : <p>No pearls available</p>}
        </div>
        <div className="w-1/2 bg-gray-200 rounded-lg p-4 flex flex-col max-h-160">
          <div className="overflow-y-auto">
            <p className="font-bold mb-4">Not boosted this week &nbsp;</p>
            {regularPearls.length ? regularPearls.map(renderPearl) : <p>No pearls available</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(BurnPearlModal);
