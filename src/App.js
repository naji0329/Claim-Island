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
  Container, Row, Col
} from 'reactstrap';

import Farms from './views/farms/Farms';
import Nest from './views/nest/Nest';
import Home from './views/home/Home';
import {  getWeb3, getContract, httpProvider } from './web3';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const App = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/farms">Farms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/nest">Nest</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>

      <ProSidebar
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
      </ProSidebar>

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
