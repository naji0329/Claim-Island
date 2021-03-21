import React, { useState } from 'react';

import {
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
  Form, Button, 
} from 'reactstrap';

import ROUTES from '../router';

const NavbarComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar className="navbar" color="light" light expand="md">
      <NavbarBrand href="/">
        <img
            alt=""
            src={require("../assets/logo.png").default}
            style={{width: "100px", height: "30px"}}
            className="d-inline-block align-top"
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {ROUTES.map((k, i) => {
            return <NavItem>
              <NavLink tag={RRNavLink} key={i} to={k.url}>{k.title}</NavLink>
            </NavItem>
          })}
        </Nav>
        <Form inline>
            <Button variant="primary" onClick={toggle}>Connect</Button>
        </Form> 
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;