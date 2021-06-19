import React, { useState, useEffect } from "react";

import Clams3D from "../../components/three/3DClams/3DClams";

import { useParams } from "react-router-dom";
import { getClamData } from "../../web3/clam";
import { getDNADecoded } from "../../web3/dnaDecoder";

// import AddClam from "../../assets/img/add_clam.png";

// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import { Popover, PopoverHeader, PopoverBody } from "reactstrap";

import {
  Card,
  // CardImg,
  CardText,
  // CardBody,
  // CardTitle,
  // CardSubtitle,
  // Button,
  // Container,
  // Row,
  // Col,
  // CardColumns,
} from "reactstrap";

// import logo from "../../assets/logo.svg";
import "./Vault.scss";

// import { PEARLS, CLAMS } from "../../constants";

const Vault = () => {
  const [clamDna, setClamDna] = useState("");
  const [clamDnaDecoded, setClamDnaDecoded] = useState(null);
  // const [clams, setClams] = useState([]);

  // const [dropdownOpen, setDropdownOpen] = useState(false);
  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  // const addClamToFarm = (clam) => {
  //   // clams.push(clam);
  //   setClams((k) => [...k, clam]);

  //   // const [popoverOpen, setPopoverOpen] = useState(false);
  //   // const toggle = () => setPopoverOpen(!popoverOpen);
  // };

  let { tokenId } = useParams();
  useEffect(() => {
    if (tokenId) {
      async function getClamDna() {
        const clamData = await getClamData(tokenId);
        const dna = clamData.dna;
        if (dna.length > 1 && dna !== clamDna) {
          setClamDna(dna);

          const decodedDna = await getDNADecoded(dna)
          setClamDnaDecoded(decodedDna);
        }
      }

      getClamDna();
    }
  }, [clamDna]);

  return (
    <div className="App">
      <h2 className="header">Your Vault</h2>
      <div className="min-w-screen min-h-screen flex space-x-4 items-center relative">
        {clamDna && <Clams3D width={500} height={500} clamDna={clamDna} decodedDna={clamDnaDecoded} />}
        {!clamDna && (
          <Card>
            <CardText tag="h5">There is no Clam to see :-(</CardText>
          </Card>
        )}
      </div>
      {/* <div style={{ textAlign: "#left" }}>
        <h3>Clams</h3>
        <CardColumns>
          {CLAMS.map((k, i) => {
            const src = require(`../../assets/img/clamjam/${k.src}`).default;
            return (
              <Card key={i}>
                <CardImg
                  top
                  style={{ width: "200px", height: "200px" }}
                  src={src}
                  alt="Card image cap"
                />
                <CardBody style={{ height: "200px" }}>
                  <CardTitle tag="h5">{k.title}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    This clam is in the farm
                  </CardSubtitle>
                  <CardText>This Clam has been selected for farming.</CardText>
                </CardBody>
              </Card>
            );
          })}
        </CardColumns>
      </div>
      <div style={{ textAlign: "#left" }}>
        <h3>Pearls</h3>
        <CardColumns>
          {PEARLS.map((p, i) => {
            const src = require(`../../assets/img/clamjam/${p.src}`).default;
            return (
              <Card key={i}>
                <CardImg
                  top
                  style={{ width: "200px", height: "200px" }}
                  src={src}
                  alt="Card image cap"
                />
                <CardBody style={{ height: "200px" }}>
                  <CardTitle tag="h5">{p.title}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">
                    This clam is in the farm
                  </CardSubtitle>
                  <CardText>This Clam has been selected for farming.</CardText>
                </CardBody>
              </Card>
            );
          })}
        </CardColumns>
      </div> */}
    </div>
  );
};

export default Vault;
