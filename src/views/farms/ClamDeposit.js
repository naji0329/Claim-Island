import { connect } from "redux-zero/react";

import { Link } from "react-router-dom";
import FarmPearl from "../../assets/img/farm_pearl.png";
import { actions } from "../../store/redux";
import { stakeClam, hasClamBeenStakedBeforeByUser, stakeClamAgain } from "../../web3/pearlFarm";

const ClamItem = ({ clamDataValues, clamId, dnaDecoded, updateAccount }) => {
  const { birthTime, pearlProductionDelay, pearlProductionStart } = clamDataValues;

  const etaSeconds =
    +pearlProductionDelay +
    (+pearlProductionStart > 0 ? +pearlProductionStart : +birthTime) -
    new Date().getTime() / 1000;

  const handleDeposit = async (clamId) => {
    try {
      const hasClamBeenStakeByUserBefore = await hasClamBeenStakedBeforeByUser(clamId);
      if (hasClamBeenStakeByUserBefore) {
        await stakeClamAgain(clamId);
      } else {
        await stakeClam(clamId);
      }
    } catch (err) {
      updateAccount({ error: err.message });
    }
  };

  return (
    <div className="clam-details">
      <div className="w-1/2">
        <img className="w-full p-4" src={FarmPearl} />
      </div>
      <div className="details">
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 flex-2">
          <div className="grid-title">Pearl ETA</div>
          <div className="grid-value">
            {new Date(etaSeconds * 1000).toISOString().substr(11, 8)}
          </div>
          <div className="grid-title">Lifespan</div>
          <div className="grid-value">{dnaDecoded.lifespan} pearls</div>
        </div>
        <div className="flex flex-col">
          <Link to={"/saferoom"} className="font-montserrat underline" style={{ color: "#757575" }}>
            View in saferoom
          </Link>
          <a
            className="btn btn-info mt-4 font-montserrat font-bold"
            onClick={() => handleDeposit(clamId)}
          >
            Deposit
          </a>
        </div>
      </div>
    </div>
  );
};

const ClamDeposit = ({ clams, updateAccount }) => {
  return (
    <div className="ClamDeposit max-h-160">
      <h3 className="heading">Choose a Clam</h3>
      {clams.map((clam, i) => (
        <ClamItem key={i} updateAccount={updateAccount} {...clam} />
      ))}
    </div>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(ClamDeposit);
