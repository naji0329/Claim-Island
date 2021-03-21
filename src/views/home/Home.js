import React, { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink as RRNavLink
} from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container, Row, Col
} from 'reactstrap';

import logo from '../../assets/logo.svg';
import './Home.css';

const Home = () => {

  return(
    <Router>
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" usemap="#mapname"/>
        <map name="mapname">
            <area shape="rect" coords="48,48,300,300" href="https://www.google.com/" alt="alttext"/>
        </map>
        <header className="App-header">
          <p className="blackColor">
            Map will go here
          </p>
        </header>
      </div>
    </Router>
  );
};

export default Home;