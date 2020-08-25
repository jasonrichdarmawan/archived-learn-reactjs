import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { AuthDataContext, UserDataContext } from "../../providers/authdata";
import { Link } from "react-router-dom";
import firebase from "../../providers/firebase";
import { Loading } from "../loading";

export const NavBar = () => {
  const auth = useContext(AuthDataContext);
  const user = useContext(UserDataContext);
  const logOut = () => {
    firebase.auth().signOut();
  };
  // this is intentional. to speed up dev in case of new feature based on user.type
  if (user === "await") return <Loading />;
  else if (auth !== null && auth !== "await" && user.type === "0") {
    return (
      <Navbar bg="light" expand="lg">
        <Link to="/dashboard" className="navbar-brand">
          HRS
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/list" className="nav-link">
              List
            </Link>
          </Nav>
          <Button variant="danger" size="sm" onClick={logOut}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (auth !== null && auth !== "await" && user.type === "1") {
    return (
      <Navbar bg="light" expand="lg">
        <Link to="/dashboard" className="navbar-brand">
          HRS
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/list" className="nav-link">
              Ticket
            </Link>
          </Nav>
          <Button variant="danger" size="sm" onClick={logOut}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
};
