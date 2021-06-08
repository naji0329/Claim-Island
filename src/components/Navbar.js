import React, { useState } from "react";

import { NavLink as RRNavLink } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Form,
  Button,
} from "reactstrap";

import ROUTES from "../router";

import UnlockButton from "./UnlockButton";

const NavbarComp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar
      className="navbar"
      dark
      expand="md"
      style={{ backgroundColor: "#0073E5" }}
    >
      <NavbarBrand href="/">
        <img
          alt=""
          src={require("../assets/img/transparent/white.png").default}
          style={{ width: "200px", height: "60px" }}
          className="d-inline-block align-top"
        />
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          {ROUTES.map((k, i) => {
            return (
              <NavItem key={i}>
                <NavLink
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "AristotelicaBold",
                    fontSize: "20px",
                    marginTop: "10px",
                  }}
                  tag={RRNavLink}
                  key={i}
                  to={k.url}
                >
                  {k.title}
                </NavLink>
              </NavItem>
            );
          })}
        </Nav>
        <Form inline>
          {/* <Button onClick={toggle} style={{backgroundColor: "#38DCDC"}}>Connect</Button> */}
          <UnlockButton />
        </Form>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComp;
