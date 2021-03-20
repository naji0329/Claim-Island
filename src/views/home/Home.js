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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="blackColor">
            Map will go here
          </p>
        </header>
      </div>
    </Router>
  );
};

export default Home;