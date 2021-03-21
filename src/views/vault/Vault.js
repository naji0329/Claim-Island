import React, { useState } from 'react';

import AddClam from '../../assets/img/add_clam.png';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Container, Row, Col,
  CardColumns
} from 'reactstrap';

import logo from '../../assets/logo.svg';
import './Vault.css';

import { PEARLS, CLAMS } from '../../constants';

const Vault = () => {

  const [clams, setClams] = useState([]);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);


  const addClamToFarm = (clam) => {
      // clams.push(clam);
      setClams(k => [...k, clam]);
      
      // const [popoverOpen, setPopoverOpen] = useState(false);
      // const toggle = () => setPopoverOpen(!popoverOpen);

  };

  const renderClamCard  = (clam) => {
    return(
      <Card>
        <CardImg top style={{width: '200px', height: '200px'}} src={AddClam} alt="Card image cap" />
        <CardBody style={{height: '200px'}}>
            <CardTitle tag="h5">Deposit Clams</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">A place to select and deposit Clams</CardSubtitle>
            <CardText>Choose Clams from your Vault to deposit into the Farm</CardText>

            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret  style={{backgroundColor: '#0072E3'}}>
                    Select Clams
                </DropdownToggle>
                <DropdownMenu>
                    {CLAMS.map((k, i) => {
                        return <DropdownItem key={i} onClick={() => addClamToFarm(k)}>
                            <img style={{width: "50px", height: "50px"}} src={require(`../../assets/img/clamjam/${k.src}`).default}/>
                            <span style={{fontFamily: "AristotelicaBold", fontSize: "16px"}}>{k.title}</span>
                        </DropdownItem>;
                    })}
                    
                  </DropdownMenu>
              </Dropdown>
          </CardBody>
      </Card>
    );
  }

  return(
      <div className="App">
        <h2 className='header'>Your Vault</h2>
        <div style={{textAlign: "#left"}}>
          <h3>Clams</h3>
          <CardColumns>
              {CLAMS.map((k, i) => {
                  const src = require(`../../assets/img/clamjam/${k.src}`).default;
                  return <Card key={i}>
                      <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" />
                      <CardBody style={{height: '200px'}}>
                          <CardTitle tag="h5">{k.title}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">This clam is in the farm</CardSubtitle>
                          <CardText>This Clam has been selected for farming.</CardText>
                      </CardBody>
                  </Card>
              })}
            </CardColumns>
          </div>
          <div style={{textAlign: "#left"}}>
            <h3>Pearls</h3>
            <CardColumns>
              {PEARLS.map((p, i) => {
                  const src = require(`../../assets/img/clamjam/${p.src}`).default;
                  return <Card key={i}>
                      <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" />
                      <CardBody style={{height: '200px'}}>
                          <CardTitle tag="h5">{p.title}</CardTitle>
                          <CardSubtitle tag="h6" className="mb-2 text-muted">This clam is in the farm</CardSubtitle>
                          <CardText>This Clam has been selected for farming.</CardText>
                      </CardBody>
                  </Card>
              })}
            </CardColumns>
          </div>
      </div>
  );
};

export default Vault;