import React from "react";

import "./Home.scss";
import Map from "../../components/Map";
import Map3D from "../../components/three/3DMap";
import CharacterSpeak from "../../components/characters";
import { Container, Row, Col } from "reactstrap";


import ClamIsland from "../../assets/img/clam_island_sign.png";
import TgIcon from "../../assets/img/tg-icon.png";
import TwitterIcon from "../../assets/img/twitter-icon.png";

// Main Home Component
const Home = () => {
  return (
    <>
        <Row className="no-gutters">
          <Col sm={{ size: 12 }}>
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
          </Col>
        </Row>
    <div className="Home" style={{ height: "95.5vh" }}>
      {/* <Map></Map> */}
      <Map3D></Map3D>
      <CharacterSpeak character={"nacre"} speech={"welcome"} />
    </div>
  </>
  );
};

export default Home;
