import { Link } from "react-router-dom";
import FarmPearl from "../../assets/img/farm_pearl.png";

const ClamDeposit = ({ setSelectedClam, clams }) => {
  return (
    <div className="ClamDeposit">
      <h3 className="heading">Choose a Clam</h3>
      {clams.map((clam, i) => (
        <div key={i} className="clam-details">
          <div className="clam-img">
            <img src={FarmPearl} />
          </div>
          <div className="details">
            <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 flex-2">
              <div className="grid-title">Pearl ETA</div>
              <div className="grid-value">{clam.pearlETA || "13h 11min"}</div>
              <div className="grid-title">Lifespan</div>
              <div className="grid-value">{clam.lifespan || "24h 15min"}</div>
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
                className="font-montserrat underline font-bold"
                style={{ color: "#0072E3" }}
                onClick={() => {
                  setSelectedClam(clam);
                }}
              >
                Deposit
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClamDeposit;
