import { RouteConfigProps } from "app/routes/config";
import { RenderRoutes } from "app/routes/RenderRoutes";
import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"

import { Link } from "react-router-dom";

const Home: React.FC<{routes: RouteConfigProps[]}> = ({ routes }) => {
  console.log("Home routes: ", routes)
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/home">Hi!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/motivation">Motivation</Nav.Link>
            <Nav.Link as={Link} to="/values">Values</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <RenderRoutes routes={routes} />
    </div>
  );
};

export default Home;
