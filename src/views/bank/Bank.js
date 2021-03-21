import React, { useState } from 'react';
import { FormControl } from 'react-bootstrap';

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
  Container, Row, Col,
  Button,
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, CardColumns, InputGroupText, InputGroup
} from 'reactstrap';

import logo from '../../assets/logo.svg';
import './Bank.css';

const Bank = () => {

  return(
    <Router>
      <div className="App">
        <h2 className='header'>Bank</h2>
        <div className="exchange">
          <InputGroup>
            <InputGroupText>Exchange</InputGroupText> 
            {/* <DropdownButton title="Coin"></DropdownButton> */}

            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
          </InputGroup>
          <InputGroup>
            <InputGroupText>To</InputGroupText> 
            {/* <DropdownButton title="Coin"></DropdownButton> */}

            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
          </InputGroup>
        </div>
      
      </div>
    </Router>
  );
};

export default Bank;