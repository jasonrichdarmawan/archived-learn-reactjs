import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export const NavigationBar = (props) => (
<Navbar bg="light" expand="lg">
  <Navbar.Brand>HRS</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    {props.routesJSX}
    </Nav>
  </Navbar.Collapse>
</Navbar>
);