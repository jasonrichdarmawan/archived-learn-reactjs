import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { handleLogout } from "../../../utils";

export const NavigationBar = ({ authData, setAuthData }) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>HRS</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto"></Nav>
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
