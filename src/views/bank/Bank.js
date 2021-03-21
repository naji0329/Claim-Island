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
      <div className="App">
        <h2 className='header'>Bank</h2>
        <CardColumns>
          <Card>
            {/* <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" /> */}
            <CardTitle tag="h5" style={{marginTop: '10px'}}>Exchange</CardTitle>
            <CardSubtitle style={{fontSize: '8px'}}>Trade $PEARL</CardSubtitle>
            <br/>
            <CardBody style={{height: '200px'}}>
              <InputGroup>
                <InputGroupText style={{fontSize: '8px'}}>Currency</InputGroupText> 
                {/* <DropdownButton title="Coin"></DropdownButton> */}

                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
              </InputGroup>
              {/* icon goes here */}
              <InputGroup style={{marginTop: '10px'}}>
                <InputGroupText style={{fontSize: '8px'}}>$PEARL</InputGroupText> 
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
              </InputGroup>
              <Button style={{marginTop: '10px'}}>Unlock Wallet</Button>
            </CardBody>
          </Card>

          <Card>
            {/* <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" /> */}
            <CardTitle tag="h5" style={{marginTop: '10px'}}>Buy clams</CardTitle>
            <CardSubtitle style={{fontSize: '8px'}}>Trade $PEARL</CardSubtitle>
            <br/>
            <CardBody style={{height: '200px'}}>
              <InputGroup>
                <InputGroupText style={{fontSize: '8px'}}>Clams to purchase</InputGroupText> 
                {/* <DropdownButton title="Coin"></DropdownButton> */}

                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
              </InputGroup>
              {/* icon goes here */}
              <InputGroup style={{marginTop: '10px'}}>
                <InputGroupText style={{fontSize: '8px'}}>Cost: </InputGroupText> 
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
                <CardImg top style={{width: '40px', height: '40px'}} src={require(`../../assets/img/transparent/cs2-03.png`).default} alt="Card image cap" />
                <CardText style={{fontSize: '8px'}}>$PEARL</CardText>
              </InputGroup>
              <Button style={{marginTop: '10px'}}>Unlock Wallet</Button>
            </CardBody>
          </Card>

          <Card>
            {/* <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" /> */}
            <CardTitle tag="h5" style={{marginTop: '10px'}}>Invest Pearls</CardTitle>
            <CardSubtitle style={{fontSize: '8px'}}>Trade $PEARL</CardSubtitle>
            <CardBody style={{height: '250px'}}>
              <Row>
                <CardImg top style={{width: '40px', height: '40px'}} src={require(`../../assets/img/transparent/cs2-03.png`).default} alt="Card image cap" />
                <CardText style={{fontSize: '20px'}}>$PEARL -> $PEARL</CardText>
              </Row>
              <InputGroup>
                <InputGroupText style={{fontSize: '8px'}}>APR</InputGroupText> 
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
              </InputGroup>
              <CardText style={{fontSize: '20px'}}>Deposit Fee: <b>0%</b></CardText>
              <Button>Harvest</Button>
              <br/> 
              {/* icon goes here */}
              <Button style={{marginTop: '10px'}}>Approve contract</Button>
            </CardBody>
          </Card>
          <Card>
            {/* <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" /> */}
            <CardTitle tag="h5" style={{marginTop: '10px'}}>Invest Pearls</CardTitle>
            <CardSubtitle style={{fontSize: '8px'}}>Trade $PEARL</CardSubtitle>
            <CardBody style={{height: '250px'}}>
              <Row>
                <CardImg top style={{width: '40px', height: '40px'}} src={require(`../../assets/img/transparent/cs2-03.png`).default} alt="Card image cap" />
                <CardText style={{fontSize: '20px'}}>$CLAM -> $PEARL</CardText>
              </Row>
              <InputGroup>
                <InputGroupText style={{fontSize: '8px'}}>APR</InputGroupText> 
                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>      
              </InputGroup>
              <CardText style={{fontSize: '20px'}}>Deposit Fee: <b>0%</b></CardText>
              <Button>Harvest</Button>
              <br/>
              {/* icon goes here */}
              <Button style={{marginTop: '10px'}}>Approve contract</Button>
            </CardBody>
          </Card>
        </CardColumns>
        <div className="exchange">
          
        </div>
      
      </div>
  );
};

export default Bank;