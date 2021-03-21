import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {
  Container, Row, Col
} from 'reactstrap';

import ROUTES from './router';

import {  getWeb3, getContract, httpProvider } from './services/web3';

import NavbarComp from './components/Navbar';

// Main App Component
const App = (props) => {
  return (
    <Router>
      <NavbarComp />

      <Container fluid={true}>
        <Row>
          <Col sm={{ size: 10, order: 2, offset: 2 }}>
            <Switch>
              {ROUTES.map((k, i) => {
                return <Route
                  key={i}
                  path={k.url}
                  exact={true}
                  component={k.component} />
              })}
            </Switch>
          </Col>
        </Row>
      </Container>
    </Router>
  );
};

export default App;
