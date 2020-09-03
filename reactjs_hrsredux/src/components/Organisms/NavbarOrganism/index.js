import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { displayRoutesInNavbar } from "../../../utils/displayRoutesInNavbar";
import { useDispatch } from "react-redux";
import { logout } from "../../../providers/authDataSlice";

export const NavbarOrganism = ({ authData, routesConfig }) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>HRS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {displayRoutesInNavbar({ authData, routesConfig })}
        </Nav>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
};
