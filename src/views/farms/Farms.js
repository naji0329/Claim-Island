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

import './Farm.css';

import { FARMS, CLAMS } from '../../constants';

const Farms = () => {
    const [clams, setClams] = useState([]);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const popovers = [];


    const addClamToFarm = (clam) => {
        // clams.push(clam);
        setClams(k => [...k, clam]);
        
        // const [popoverOpen, setPopoverOpen] = useState(false);
        // const toggle = () => setPopoverOpen(!popoverOpen);

    };

    return <div className="Farm"> 
        <h2 className="headers">Clam Farm</h2>
        <CardColumns>
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

            {clams.map((clam, index) => {
                const src = require(`../../assets/img/clamjam/${clam.src}`).default;
                return <Card key={index}>
                    <CardImg top style={{width: '200px', height: '200px'}} src={src} alt="Card image cap" />
                    <CardBody style={{height: '200px'}}>
                        <CardTitle tag="h5">{clam.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">This clam is in the farm</CardSubtitle>
                        <CardText>This Clam has been selected for farming.</CardText>
                        <Button>Withdraw</Button>

                        <Button id={clam.value} type="button" style={{backgroundColor: '#0072E3', marginLeft: "10px"}}>
                            Info
                        </Button>
                        {/* <Popover placement="bottom" isOpen={popoverOpen} target={clam.value} toggle={togglePop}>
                            <PopoverHeader>
                                <h4 style={{fontFamily: "AristotelicaBold", fontSize: "16px"}}>{clam.title}</h4>
                            </PopoverHeader>
                            <PopoverBody>
                                <img style={{width: "50px", height: "50px"}} src={src}/>
                                <p>{clam.description}</p>
                            </PopoverBody>
                        </Popover> */}
                    </CardBody>
                </Card>
            })}
        </CardColumns>
    </div>
};

export default Farms;