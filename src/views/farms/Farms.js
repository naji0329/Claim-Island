import React, { useState } from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Container, Row, Col,
  CardColumns
} from 'reactstrap';

import './Farm.css';

const Farms = () => {
    return <div className="App"> 
        <h2 classname="headers">Farms</h2>
        <CardColumns>
            <Card>
                <CardImg top width="100%" src="https://via.placeholder.com/318" alt="Card image cap" />
                <CardBody>
                <CardTitle tag="h5">Farm 1</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Stake</Button>
                </CardBody>
            </Card>
            <Card>
                <CardImg top width="100%" src="https://via.placeholder.com/318" alt="Card image cap" />
                <CardBody>
                <CardTitle tag="h5">Farm 2</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Stake</Button>
                </CardBody>
            </Card>
        </CardColumns>
    </div>
};

export default Farms;