import { Link } from "react-router-dom";
import FarmPearl from "../../assets/img/farm_pearl.png";

const ClamDeposit = ({ setSelectedClam, clams }) => {
  return (
    <div className="ClamDeposit max-h-160">
      <h3 className="heading">Choose a Clam</h3>
      {clams.map((clam, i) => {
        const { birthTime, pearlProductionDelay, pearlProductionStart } =
          clam.clamDataValues;
        const etaSeconds =
          +pearlProductionDelay +
          (+pearlProductionStart > 0 ? +pearlProductionStart : +birthTime) -
          new Date().getTime() / 1000;

        return (
          <div key={i} className="clam-details">
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
                <div className="grid-value">
                  {clam.dnaDecoded.lifespan} pearls
                </div>
              </div>
              <div className="flex flex-col">
                <Link
                  to={"/saferoom"}
                  className="font-montserrat underline"
                  style={{ color: "#757575" }}
                >
                  View in saferoom
                </Link>
                <a
                  className="btn btn-info mt-4 font-montserrat font-bold"
                  onClick={() => {
                    setSelectedClam(clam);
                  }}
                >
                  Deposit
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ClamDeposit;
