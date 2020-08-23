import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthDataContext } from "../../providers/authdata";
import { Link } from "react-router-dom";
import firebase from "../../providers/firebase";

export const NavBar = () => {
  const user = useContext(AuthDataContext);
  const logOut = () => {
    firebase.auth().signOut()
  }
  if (user) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>HRS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/list" className="nav-link">List</Link>
          </Nav>
          <Button variant="danger" size="sm" onClick={logOut}>Log Out</Button>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return null;
  }
};
