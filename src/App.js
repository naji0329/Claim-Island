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
  Form, Button, 
  Modal, ModalHeader, ModalBody, ModalFooter
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

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

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
            <Button variant="primary" onClick={toggle}>Connect</Button>
          </Form> 
        </Collapse>
      </Navbar>

      {/* Modal window */}
      {/* <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>  
      </div> */}

      {/* Sidebar navigation */}
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
