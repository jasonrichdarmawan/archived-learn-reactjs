import React, { useContext } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { handleLogout, displayRouteNavbar } from "../../../utils";

import { AuthDataContext } from "../../../providers";

// TODO: displayRouteNavbar to dynamically only display child routes.
export const NavigationBar = ({ routes }) => {
  const { authData, setAuthData } = useContext(AuthDataContext);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>HRS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {displayRouteNavbar({ authData, routes })}
        </Nav>
        <Form inline>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleLogout({ authData, setAuthData })}
          >
            Log Out
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};
