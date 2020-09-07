import React from "react";
import firebase from "api/firebase";
import { Navbar, Nav, Button } from "react-bootstrap";
import { displayRoutesInNavbar } from "utils/routes/displayRoutesInNavbar";

export function NavbarOrganism({ userData, routes }) {
  const handleLogout = () => {
    localStorage.removeItem("userData");
    firebase.auth().signOut();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>LMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {displayRoutesInNavbar({ userData, routes })}
        </Nav>
        <Button variant="danger" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
