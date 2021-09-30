import React from "react";
import { useAsync, useLocalStorage } from "react-use";
import { connect } from "redux-zero/react";
import { actions } from "store/redux";
import classnames from "classnames";
import "./Home.scss";
// import Map from "../../components/Map";
import Map3D from "components/three/3DMap";
import Character from "components/characters/CharacterWrapper";
import { Map2D } from "components/Map2D";
import { IS_LITE_VERSION } from "constants/ui";

import {
  speechWelcome,
  speechWelcomeOpen,
  speechLaunchCountdown,
  speechLaunchTwo,
  speechDismiss,
} from "./character/home";

// import ClamIsland from "../../assets/img/clam_island_sign.png";
// import TgIcon from "../../assets/img/tg-icon.png";
// import TwitterIcon from "../../assets/img/twitter-icon.png";

// Main Home Component
const Home = ({ updateCharacter }) => {
  const [isLiteVersion] = useLocalStorage(IS_LITE_VERSION);

  const launchDate = "September 30 2021 14:00:00 GMT+0000";

  const launchCountdown = (date) => {
    const total = Date.parse(date) - Date.parse(String(new Date()));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    let minutes = Math.floor((total / 1000 / 60) % 60);
    minutes > 9 ? minutes : "0" + minutes.toString();

    return `${days} days, ${hours} hours and ${minutes} minutes`;
  };

  const isOpen = (date) => {
    const now = Date.parse(String(new Date()));
    const launch = Date.parse(date);
    return now >= launch;
  };

  const wait = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

  useAsync(async () => {
    if (isOpen(launchDate)) {
      speechWelcomeOpen({ updateCharacter });
    } else {
      speechWelcome({ updateCharacter, date: launchCountdown(launchDate) }, async () => {
        return speechLaunchCountdown({ updateCharacter }, async () => {
          speechLaunchTwo({ updateCharacter });

          await wait(1000);
          speechDismiss({ updateCharacter, date: launchCountdown(launchDate) });
        });
      });

      //
    }
  });

  return (
    <>
      {console.log({ isOpen: isOpen(launchDate) })}
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
      <div
        className={classnames("Home", {
          "cursor-not-allowed pointer-events-none": !isOpen(launchDate),
        })}
        style={{ height: "95.5vh" }}
      >
        {/* <Map></Map> */}
        {isLiteVersion ? <Map2D /> : <Map3D />}
        <Character name="nacre" />
      </div>
    </>
  );
};

const mapToProps = (state) => state;
export default connect(mapToProps, actions)(Home);
