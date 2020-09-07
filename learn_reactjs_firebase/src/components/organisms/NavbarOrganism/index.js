import React from "react";
import firebase from "api/firebase";
import { Navbar, Nav, Button } from "react-bootstrap";

export function NavbarOrganism() {
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>LMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* {displayRoutesInNavbar({ authData, routesConfig })} */}
        </Nav>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
