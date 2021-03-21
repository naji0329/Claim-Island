import React, { useState } from 'react';

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
  Form, Button
} from 'reactstrap';

import Farms from './views/farms/Farms';
import Nest from './views/nest/Nest';
import Home from './views/home/Home';
import Vault from './views/vault/Vault';
import Bank from './views/bank/Bank';
import {  getWeb3, getContract, httpProvider } from './web3';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar className="navbar" color="light" light expand="md">
        <NavbarBrand href="/">
          <img
            alt=""
            src="/logo.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/farms">Farms</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink tag={RRNavLink} to="/nest">Nest</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink tag={RRNavLink} to="/vault">Vault</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/bank">Bank</NavLink>
            </NavItem>
          </Nav>
          <Form inline>
            <Button as="input" variant="primary" type="button" value="Input">Connect</Button>
          </Form>   
        </Collapse>
      </Navbar>

      {/* <ProSidebar
        image={false}
        rtl={true}
        collapsed={false}
        toggled={false}
        breakPoint="md"
        width="15%"
        style={{position: "absolute"}}
      >
        <Menu iconShape="square">
          <MenuItem icon={<FontAwesomeIcon icon={faCoffee} />}>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faCoffee} />}>
            <Link to="/farms">Farms</Link>
          </MenuItem>
          <MenuItem icon={<FontAwesomeIcon icon={faCoffee} />}>
            <Link to="/nest">Nest</Link>
          </MenuItem>
        </Menu>
      </ProSidebar> */}

      <Container fluid={true}>
        <Row>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Col sm={{ size: 10, order: 2, offset: 2 }}>
          <Switch>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/nest">
              <Nest />
            </Route>
            <Route path="/vault">
              <Vault />
            </Route>
            <Route path="/bank">
              <Bank />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Col>
      </Row>
      </Container>
    </Router>
  );
}

export default App;
