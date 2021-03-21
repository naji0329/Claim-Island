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
              <Button style={{marginTop: '10px', backgroundColor: "#38DCDC"}}>Unlock Wallet</Button>
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
              <Button style={{marginTop: '10px', backgroundColor: "#38DCDC"}}>Unlock Wallet</Button>
            </CardBody>
          </Card>

          <Card>
            {/* <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" /> */}
            <CardTitle tag="h5" style={{marginTop: '10px'}}>Invest Pearls</CardTitle>
            <CardSubtitle style={{fontSize: '8px'}}>Trade $PEARL</CardSubtitle>
            <CardBody style={{height: '250px'}}>
              <Row>
                <CardImg top style={{width: '40px', height: '40px'}} src={require(`../../assets/img/transparent/cs2-03.png`).default} alt="Card image cap" />
                <CardText style={{fontSize: '14px'}}>$PEARL -> $PEARL</CardText>
              </Row>
              <CardText style={{fontSize: '14px'}}>APR: <b>84.5%</b></CardText>
              <CardText style={{fontSize: '14px'}}>Deposit Fee: <b>0%</b></CardText>
              <Button style={{backgroundColor: "#0072E3"}}>Harvest</Button>
            
              {/* <Row>
                <Button style={{backgroundColor: "#0072E3"}}>Harvest</Button>
                <CardText style={{fontSize: '14px'}}>$PEARL Earned: <p>0</p></CardText>
              </Row> */}
              <br/> 
              {/* icon goes here */}
              <Button style={{marginTop: '10px', backgroundColor: "#38DCDC"}}>Approve contract</Button>
            </CardBody>
          </Card>
          <Card>
            {/* <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" /> */}
            <CardTitle tag="h5" style={{marginTop: '10px'}}>Invest Pearls</CardTitle>
            <CardSubtitle style={{fontSize: '8px'}}>Trade $PEARL</CardSubtitle>
            <CardBody style={{height: '250px'}}>
              <Row>
                <CardImg top style={{width: '40px', height: '40px'}} src={require(`../../assets/img/transparent/cs2-03.png`).default} alt="Card image cap" />
                <CardText style={{fontSize: '14px'}}>$CLAM -> $PEARL</CardText>
              </Row>
              <CardText style={{fontSize: '14px'}}>APR: <b>82.3%</b></CardText>
              <CardText style={{fontSize: '14px'}}>Deposit Fee: <b>0%</b></CardText>
              <Button style={{backgroundColor: "#0072E3"}}>Harvest</Button>
              <br/>
              {/* icon goes here */}
              <Button style={{marginTop: '10px', backgroundColor: "#38DCDC"}}>Approve contract</Button>
            </CardBody>
          </Card>
        </CardColumns>
        <div className="exchange">
          
        </div>
      
      </div>
  );
};

export default Bank;