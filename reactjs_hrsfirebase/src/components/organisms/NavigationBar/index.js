import React from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import { firebase } from "../../../providers";

const handleSubmit = () => {
  firebase.auth().signOut()
}

export const NavigationBar = (props) => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand>HRS</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">{props.routesJSX}</Nav>
      <Form inline>
        <Button variant="danger" size="sm" onClick={handleSubmit}>
          Log Out
        </Button>
      </Form>
    </Navbar.Collapse>
  </Navbar>
);
