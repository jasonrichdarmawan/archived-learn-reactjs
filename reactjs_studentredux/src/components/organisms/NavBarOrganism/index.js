import React from "react";
import { Routes } from "../../../config";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import { displayRouteNavbar } from "../../../utils";

export const NavBarOrganism = ({ authData, setAuthData }) => {
  const routes = Routes({ authData: authData });

  const handleLogout = () => {
    setAuthData({ isAuthorized: false });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>HRS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {displayRouteNavbar({ authData, routes })}
        </Nav>
        {authData.isAuthorized && (
          <Form inline>
            <Button variant="danger" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </Form>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};
