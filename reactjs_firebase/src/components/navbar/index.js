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
  if ((auth !== null && user === "await") || auth === "await") return <Loading />;
  else if (auth !== null) {
    return (
      <Navbar bg="light" expand="lg">
        <Link to="/dashboard" className="navbar-brand">
          PMS
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {user.type === "0" ? (
              <Link to="/list/operator" className="nav-link">
                Operator
              </Link>
            ) : null}
            <Link to="/list/ticket" className="nav-link">
              Ticket
            </Link>
          </Nav>
          <Button variant="danger" size="sm" onClick={logOut}>
            Log Out
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  } else if (auth === null || user === "await") return null;
};
