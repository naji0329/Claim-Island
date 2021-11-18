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
import { useTimer } from "hooks/useTimer";
import PearlInfo from "./PearlInfo";

const BurnPearlModal = (props) => {
  const {
    account: { address, pearlBalance },
    updateAccount,
    isNativeStaker,
    chainId,
  } = props;
  const [pearls, setPearls] = useState([]);
  const [boostedShape, setBoostedShape] = useState("");
  const [boostedColor, setBoostedColor] = useState("");
  const [startOfWeek, setStartOfWeek] = useState("");
  const [periodInSecs, setPeriodInSecs] = useState("");

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
      const tokenIdsResult = await aggregate(tokenIdsCalls, chainId);
      const tokenIdsDecoded = decodeTokenOfOwnerByIndexFromMulticall(tokenIdsResult.returnData);

      const ownedPearls = await getPearlDataByIds(tokenIdsDecoded, chainId);
      setPearls(ownedPearls);

      const elShape = await shape();
      const elColor = await color();
      setBoostedShape(elShape);
      setBoostedColor(elColor);

      const start = await periodStart();
      setStartOfWeek(start);

      const periodInSecs = await periodInSeconds();
      setPeriodInSecs(periodInSecs);
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
    />
  );

  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-4 text-3xl text-center text-gray-500 font-aristotelica-bold">
        Choose a pearl
      </h1>
      <div className="flex justify-between w-full p-4 mb-6 bg-gray-200 rounded-lg">
        <div className="flex flex-col w-3/5">
          <span className="font-bold">Pearls with these traits are available:</span>
          <div>
            <span className="inline-block w-16 text-gray-500">Shape:</span>
            <span className="text-gray-500">{boostedShape}</span>
          </div>
          <div>
            <span className="inline-block w-16 text-gray-500">Color:</span>
            <span className="text-gray-500">{boostedColor}</span>
          </div>
        </div>
        {timeLeft.includes("-") ? (
          <div className="flex flex-col items-end w-2/5">
            <button onClick={handlePeriodCheckpoint} className="btn btn-outline btn-primary">
              Update Pearl Boost Traits
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-end w-2/5">
            <span className="font-bold">Changes in</span>
            <span className="text-gray-500">{timeLeft}</span>
          </div>
        )}
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-1/2 p-4 mr-8 overflow-y-auto bg-gray-200 rounded-lg max-h-160">
          <p className="mb-4 font-bold">Available for boost</p>
          {boostedPearls.length ? boostedPearls.map(renderPearl) : <p>No pearls available</p>}
        </div>
        <div className="flex flex-col w-1/2 p-4 bg-gray-200 rounded-lg max-h-160">
          <div className="overflow-y-auto">
            <p className="mb-4 font-bold">Not available this week</p>
            {regularPearls.length ? regularPearls.map(renderPearl) : <p>No pearls available</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(BurnPearlModal);
