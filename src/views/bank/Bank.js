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
  Container, Row, Col,
  Button,
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, CardColumns
} from 'reactstrap';

import logo from '../../assets/logo.svg';
import './Bank.css';

const Bank = () => {

  return(
    <Router>
      <div className="App">
        <h2 className='header'>Bank</h2>
        <CardColumns>
            <Card className='Card'>
                <CardImg top width="100%" src="src\assets\clams.jpg" alt="Your clam or pearl" />
                <CardBody>
                    <CardTitle tag="h5">Name of the NFT</CardTitle>
                    {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Balance:</CardSubtitle> */}
                </CardBody>
            </Card>
            <Card className='Card'>
                <CardImg top width="100%" src="src\assets\clams.jpg" alt="Your clam or pearl" />
                <CardBody>
                    <CardTitle tag="h5">Name of the NFT</CardTitle>
                    {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Balance:</CardSubtitle> */}
                </CardBody>
            </Card>
            <Card className='Card'>
                <CardImg top width="100%" src="src\assets\clams.jpg" alt="Your clam or pearl" />
                <CardBody>
                    <CardTitle tag="h5">Name of the NFT</CardTitle>
                    {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Balance:</CardSubtitle> */}
                </CardBody>
            </Card>
        </CardColumns>
      </div>
    </Router>
  );
};

export default Bank;