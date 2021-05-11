import React, { useEffect } from 'react';
import { useWallet } from '@binance-chain/bsc-use-wallet'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// import { ResetCSS } from '@pancakeswap-libs/uikit'

import {
  Container, Row, Col
} from 'reactstrap';

import ROUTES from './router';

import ClamIsland from './assets/img/clam_island_sign.png';
import TgIcon from './assets/img/tg-icon.png';
import TwitterIcon from './assets/img/twitter-icon.png';

// import {  getClamTokenContract, getContract, httpProvider } from './services/web3';
// import {  getContract, httpProvider } from './services/web3';

// import NavbarComp from './components/Navbar';


// Main App Component
const App = (props) => {
  const { account, connect } = useWallet()

  // const contract = getClamTokenContract();
  // console.log(contract);

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  return (
    <Router>
      {/* <ResetCSS /> */}
      {/* <NavbarComp /> */}
      <div class="opening-soon">

        <a class="social-link" href="https://t.me/clamislandann" target="_blank" class="social-icon" style={{
          right: '110px'
      }}>
          <img src={TgIcon} />
        </a>

        <a href="https://twitter.com/clam_island" target="_blank" class="social-icon" style={{
          right: '70px'
      }}>
        <img src={TwitterIcon} />
        </a>

      </div>
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
