import React, { useEffect } from 'react';
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ResetCSS } from '@pancakeswap-libs/uikit'

import {
  Container, Row, Col
} from 'reactstrap';

import ROUTES from './router';

import {  getWeb3, getContract, httpProvider } from './services/web3';

import NavbarComp from './components/Navbar';

// Main App Component
const App = (props) => {
  const { account, connect } = useWallet()

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  return (
    <Router>
      <ResetCSS />
      <NavbarComp />

      <Container fluid={true} className="p-0">
        <Row className="no-gutters">
          <Col sm={{ size: 12 }}>
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
