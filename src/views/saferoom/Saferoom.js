import React, { useState } from "react";

import logo from "../../assets/logo.svg";

import { PEARLS, CLAMS } from "../../constants";

const Vault = () => {
  return (
    <div className="App">
      <h2 className="header">Your Vault</h2>
      <div style={{ textAlign: "#left" }}>
        <h3>Clams</h3>

        {CLAMS.map((k, i) => {
          const src = require(`../../assets/img/clamjam/${k.src}`).default;
          return (
            <div key={i}>
              <img
                top
                style={{ width: "200px", height: "200px" }}
                src={src}
                alt="Card image cap"
              />
              <div style={{ height: "200px" }}>
                <div tag="h5">{k.title}</div>
                <div tag="h6" className="mb-2 text-muted">
                  This clam is in the farm
                </div>
                <div>This Clam has been selected for farming.</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "#left" }}>
        <h3>Pearls</h3>

        {PEARLS.map((p, i) => {
          const src = require(`../../assets/img/clamjam/${p.src}`).default;
          return (
            <div key={i}>
              <img
                top
                style={{ width: "200px", height: "200px" }}
                src={src}
                alt="Card image cap"
              />
              <div style={{ height: "200px" }}>
                <div tag="h5">{p.title}</div>
                <div tag="h6" className="mb-2 text-muted">
                  This clam is in the farm
                </div>
                <div>This Clam has been selected for farming.</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Vault;
