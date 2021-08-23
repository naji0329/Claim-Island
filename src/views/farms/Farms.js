import React, { useState } from "react";

import AddClam from "../../assets/img/add_clam.png";

import "./Farm.css";

import { FARMS, CLAMS } from "../../constants";

const Farms = () => {
  const [clams, setClams] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const popovers = [];

  const addClamToFarm = (clam) => {
    // clams.push(clam);
    setClams((k) => [...k, clam]);

    // const [popoverOpen, setPopoverOpen] = useState(false);
    // const toggle = () => setPopoverOpen(!popoverOpen);
  };

  return (
    <div className="Farm">
      <h2 className="headers">Clam Farm</h2>
      <div>
        <div>
          <img top style={{ width: "200px", height: "200px" }} src={AddClam} alt="div image cap" />
          <div style={{ height: "200px" }}>
            <div tag="h5">Deposit Clams</div>
            <div tag="h6" className="mb-2 text-muted">
              A place to select and deposit Clams
            </div>
            <div>Choose Clams from your Vault to deposit into the Farm</div>

            <div isOpen={dropdownOpen} toggle={toggle} style={{ marginTop: "10px" }}>
              <div caret style={{ backgroundColor: "#0072E3" }}>
                Select Clams
              </div>
              <div>
                {CLAMS.map((k, i) => {
                  return (
                    <div key={i} onClick={() => addClamToFarm(k)}>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={require(`../../assets/img/clamjam/${k.src}`).default}
                      />
                      <span
                        style={{
                          fontFamily: "AristotelicaBold",
                          fontSize: "16px",
                        }}
                      >
                        {k.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {clams.map((clam, index) => {
          const src = require(`../../assets/img/clamjam/${clam.src}`).default;
          return (
            <div key={index}>
              <img top style={{ width: "200px", height: "200px" }} src={src} alt="div image cap" />
              <div style={{ height: "200px" }}>
                <div tag="h5">{clam.title}</div>
                <div tag="h6" className="mb-2 text-muted">
                  This clam is in the farm
                </div>
                <div>This Clam has been selected for farming.</div>
                <button style={{ marginTop: "10px" }}>Withdraw</button>

                <button
                  id={clam.value}
                  type="button"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#0072E3",
                    marginLeft: "10px",
                  }}
                >
                  Info
                </button>
                {/* <Popover placement="bottom" isOpen={popoverOpen} target={clam.value} toggle={togglePop}>
                            <PopoverHeader>
                                <h4 style={{fontFamily: "AristotelicaBold", fontSize: "16px"}}>{clam.title}</h4>
                            </PopoverHeader>
                            <PopoverBody>
                                <img style={{width: "50px", height: "50px"}} src={src}/>
                                <p>{clam.description}</p>
                            </PopoverBody>
                        </Popover> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Farms;
