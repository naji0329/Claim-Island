import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
// import clam from '../../assets/img/clamjam/clam_bigmouth_pink_nopearl.png';
import './Home.css';

const Home = () => {
  return  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {/* <img src={clam} className="clam" alt="logo" /> */}
      <img src={require('../../assets/img/clamjam/clam_bigmouth_pink_nopearl.png').default} className="clam" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>;
};

export default Home;