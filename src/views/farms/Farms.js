import React, { useState } from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Container, Row, Col,
  CardColumns
} from 'reactstrap';

import './Farm.css';

import { FARMS } from '../../constants';

const Farms = () => {
    return <div className="App"> 
        <h2 className="headers">Farms</h2>
        <CardColumns>
            {FARMS.map((farm, index) => {
                return <Card key={index}>
                    <CardImg top style={{width: '200px', height: '200px'}} src={farm.src} alt="Card image cap" />
                    <CardBody>
                        <CardTitle tag="h5">{farm.title}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                        <Button>Stake</Button>
                    </CardBody>
                </Card>
            })}
        </CardColumns>
    </div>
};

export default Farms;