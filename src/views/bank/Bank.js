import React, { useState } from "react";

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   NavLink as RRNavLink,
// } from "react-router-dom";

// import logo from "../../assets/logo.svg";
import "./Bank.css";

const Bank = () => {
  return (
    <div className="App">
      <h2 className="header">Bank</h2>
      <div>
        <div>
          {/* <img top style={{width: '200px', height: '200px'}} src={src} alt="div image cap" /> */}
          <div tag="h5" style={{ marginTop: "10px" }}>
            Exchange
          </div>
          <div style={{ fontSize: "8px" }}>Trade $PEARL</div>
          <br />
          <div style={{ height: "200px" }}>
            <div>
              <div style={{ fontSize: "8px" }}>Currency</div>
              {/* <DropdownButton title="Coin"></DropdownButton> */}

              <div aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </div>
            {/* icon goes here */}
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontSize: "8px" }}>$PEARL</div>
              <div aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </div>
            <button style={{ marginTop: "10px", backgroundColor: "#38DCDC" }}>
              Unlock Wallet
            </button>
          </div>
        </div>

        <div>
          {/* <img top style={{width: '200px', height: '200px'}} src={src} alt="div image cap" /> */}
          <div tag="h5" style={{ marginTop: "10px" }}>
            Buy clams
          </div>
          <div style={{ fontSize: "8px" }}>Trade $PEARL</div>
          <br />
          <div style={{ height: "200px" }}>
            <div>
              <div style={{ fontSize: "8px" }}>Clams to purchase</div>
              {/* <DropdownButton title="Coin"></DropdownButton> */}

              <div aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
            </div>
            {/* icon goes here */}
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontSize: "8px" }}>Cost: </div>
              <div aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              <img
                top
                style={{ width: "40px", height: "40px" }}
                src={require(`../../assets/img/transparent/cs2-03.png`).default}
                alt="div image cap"
              />
              <div style={{ fontSize: "8px" }}>$PEARL</div>
            </div>
            <button style={{ marginTop: "10px", backgroundColor: "#38DCDC" }}>
              Unlock Wallet
            </button>
          </div>
        </div>

        <div>
          {/* <img top style={{width: '200px', height: '200px'}} src={src} alt="div image cap" /> */}
          <div tag="h5" style={{ marginTop: "10px" }}>
            Invest Pearls
          </div>
          <div style={{ fontSize: "8px" }}>Trade $PEARL</div>
          <div style={{ height: "250px" }}>
            <div>
              <img
                top
                style={{ width: "40px", height: "40px" }}
                src={require(`../../assets/img/transparent/cs2-03.png`).default}
                alt="div image cap"
              />
              <div style={{ fontSize: "14px" }}>$PEARL {"->"} $PEARL</div>
            </div>
            <div style={{ fontSize: "14px" }}>
              APR: <b>84.5%</b>
            </div>
            <div style={{ fontSize: "14px" }}>
              Deposit Fee: <b>0%</b>
            </div>
            <button style={{ backgroundColor: "#0072E3" }}>Harvest</button>

            {/* <div>
                <button style={{backgroundColor: "#0072E3"}}>Harvest</button>
                <div style={{fontSize: '14px'}}>$PEARL Earned: <p>0</p></div>
              </div> */}
            <br />
            {/* icon goes here */}
            <button style={{ marginTop: "10px", backgroundColor: "#38DCDC" }}>
              Approve contract
            </button>
          </div>
        </div>
        <div>
          {/* <img top style={{width: '200px', height: '200px'}} src={src} alt="div image cap" /> */}
          <div tag="h5" style={{ marginTop: "10px" }}>
            Invest Pearls
          </div>
          <div style={{ fontSize: "8px" }}>Trade $PEARL</div>
          <div style={{ height: "250px" }}>
            <div>
              <img
                top
                style={{ width: "40px", height: "40px" }}
                src={require(`../../assets/img/transparent/cs2-03.png`).default}
                alt="div image cap"
              />
              <div style={{ fontSize: "14px" }}>$CLAM {"->"} $PEARL</div>
            </div>
            <div style={{ fontSize: "14px" }}>
              APR: <b>82.3%</b>
            </div>
            <div style={{ fontSize: "14px" }}>
              Deposit Fee: <b>0%</b>
            </div>
            <button style={{ backgroundColor: "#0072E3" }}>Harvest</button>
            <br />
            {/* icon goes here */}
            <button style={{ marginTop: "10px", backgroundColor: "#38DCDC" }}>
              Approve contract
            </button>
          </div>
        </div>
      </div>
      <div className="exchange"></div>
    </div>
  );
};

export default Bank;
