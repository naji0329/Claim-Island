import React, { useState, useEffect } from "react";
import { useLocalStorage } from "react-use";

import "./Home.scss";
// import Map from "../../components/Map";
import Map3D from "../../components/three/3DMap";
import CharacterSpeak from "../../components/characters";
import { Map2D } from "components/Map2D";
import { IS_GUIDED_TOUR_PASSED, IS_LITE_VERSION } from "constants/ui";

// import ClamIsland from "../../assets/img/clam_island_sign.png";
// import TgIcon from "../../assets/img/tg-icon.png";
// import TwitterIcon from "../../assets/img/twitter-icon.png";

// Main Home Component
const Home = () => {
  const [isLiteVersion] = useLocalStorage(IS_LITE_VERSION);
  const [isGuidedTourPassed, setIsGuidedTourPassed] = useLocalStorage(IS_GUIDED_TOUR_PASSED);
  const [isUserVisitedTourThisSession, setIsUserVisitedTourThisSession] = useState(false);

  useEffect(() => {
    if (!isGuidedTourPassed) {
      setIsUserVisitedTourThisSession(true);
    }
  }, [isGuidedTourPassed]);

  return (
    <>
      {/* <div>
        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <div className="opening-soon">
            <a
              className="social-link social-icon"
              href="https://t.me/clamisland"
              target="_blank"
              style={{ right: "110px" }}
              rel="noreferrer"
            >
              <img src={TgIcon} />
            </a>

            <a
              href="https://twitter.com/clam_island"
              target="_blank"
              className="social-icon"
              style={{ right: "70px" }}
              rel="noreferrer"
            >
              <img src={TwitterIcon} />
            </a>
          </div>
        </div>
      </div> */}
      <div className="Home" style={{ height: "95.5vh" }}>
        {/* <Map></Map> */}
        {isLiteVersion ? (
          <Map2D />
        ) : (
          <Map3D
            isGuidedTourPassed={isGuidedTourPassed}
            setIsGuidedTourPassed={setIsGuidedTourPassed}
          />
        )}
        {isGuidedTourPassed && (
          <CharacterSpeak
            character={"nacre"}
            speech={"welcome"}
            isNeedSkipFirstWelcome={isUserVisitedTourThisSession}
          />
        )}
      </div>
    </>
  );
};

export default Home;
