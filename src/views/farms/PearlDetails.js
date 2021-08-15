import { Link } from "react-router-dom";
import { Clam3DView } from "../../components/clam3DView";
import FarmPearl from "../../assets/img/farm_pearl.png";

const PearlDetails = ({ pearl, onWithdrawPearl }) => {
  const pearls = [
    {
      gemHr: '13',
      duration: 24,
      shape: 'round',
      bodyColor: 'Blue'
    }
  ];
  return (
    <div className="PearlDetails flex flex-row">
      <div className="flex flex-1 flex-col">
        <p className="heading">{pearl.heading}</p>
        <Clam3DView
          width={400}
          height={400}
          clamDna={pearl.dna}
          decodedDna={pearl.dnaDecoded}
          showTraitsTable={false}
        />
        <div className="flex flex-row justify-between">
          <p className="float-left">Remaining Time</p>
          <p className="float-right">{pearl.remainingTime}</p>
        </div>
        <div className="px-4 md:px-6 py-2">
          <button className="withdraw-btn" onClick={() => { onWithdrawPearl(pearl) }}>
            Withdraw
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="detail-box general-stats">
          <h1 className="heading">General Stats</h1>
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4">
            <div>Harvestable $SHELL</div>
            <div>{pearl.harvestableShell}</div>
            <div>Lifespan Remaining</div>
            <div>{pearl.remainingLifeSpan}</div>
          </div>
        </div>

        <div className="detail-box produced-pearls">
          <h1 className="heading">Produced Pearls</h1>
          <div className="flex flex-col gap-2">
            {pearls.map((k, i) => (
              <div key={i} className="flex flex-row">
                <div className="clam-img flex flex-1">
                    <img src={FarmPearl} className="w-1/2"/>
                </div>
                <div className="details flex flex-1 flex-col">
                    <div className="grid md:grid-cols-2 md:grid-rows-4 gap-4 flex-2">
                        <div className="grid-title">$GEM/hr</div>
                        <div className="grid-value">{k.gemHr}</div>
                        <div className="grid-title">Duration (hrs):</div>
                        <div className="grid-value">{k.duration}</div>
                        <div className="grid-title">Shape:</div>
                        <div className="grid-value">{k.shape}</div>
                        <div className="grid-title">Body color:</div>
                        <div className="grid-value">{k.bodyColor}</div>
                    </div>
                    <div className="flex flex-col">
                        <Link to={'/saferoom'}  className="font-montserrat underline" style={{ color: '#757575'}}>View in saferoom</Link>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PearlDetails;
