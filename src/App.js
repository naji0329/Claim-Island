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
      <img src={ClamIsland}
        style={{
          position: 'absolute',
          top: 0,
          left: 'calc(50% - 260px)',
          zIndex: 9999,
          width: '520px'
      }}/>

      <a href="https://telegram.com" target="_blank">
        <img src={TgIcon}
          style={{
            position: 'absolute',
            top: '170px',
            left: 'calc(50% - 35px)',
            zIndex: 9999,
            cursor: 'pointer',
            width: '28px'
        }}/>
      </a>

      <a href="https://twitter.com/clam_island" target="_blank">
      <img src={TwitterIcon}
        style={{
          position: 'absolute',
          top: '170px',
          left: 'calc(50% + 7px)',
          zIndex: 9999,
          cursor: 'pointer',
          width: '28px'
      }}/>
      </a>

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
