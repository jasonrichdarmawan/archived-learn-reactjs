import React from "react";

import { signOut } from "features/AuthState/AuthStateSlice";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { Routes } from "app/routes";

import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import has from "lodash/has";
import isMatch from "lodash/isMatch";

function generateTopNav({ authState, routes, options }) {
  // console.log("generateTopNav()", authState);
  function singleRoute(route) {
    return (
      <Link
        key={route.key}
        to={route.navpath || route.path}
        className={options === "dropdown" ? "dropdown-item" : "nav-link"}
      >
        {route.key}
      </Link>
    );
  }

  return (
    <>
      {routes.map((route) => {
        if (route.routes) {
          if (
            has(authState.document.access_rights, route.display) &&
            authState.document.access_rights[route.display] !== null
          ) {
            return (
              <NavDropdown key={route.key} title={route.key} id={route.key}>
                {generateTopNav({
                  authState,
                  routes: route.routes,
                  options: "dropdown",
                })}
              </NavDropdown>
            );
          }
        } else if (
          route.display === true ||
          (has(authState.document.access_rights, route.display) &&
            authState.document.access_rights[route.display] !== null) ||
          (isMatch(authState.document.access_rights, route.display) &&
            route.display !== false)
        ) {
          return singleRoute(route);
        }
        return null;
      })}
    </>
  );
}

export function TopNavbar({ authState }) {
  const dispatch = useDispatch();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>ERP</Navbar.Brand>
      <Navbar.Toggle aria-controls="topNavbar" />
      <Navbar.Collapse id="topNavbar">
        <Nav className="mr-auto">
          {generateTopNav({ authState, routes: Routes() })}
        </Nav>
        <Button variant="danger" size="sm" onClick={() => dispatch(signOut())}>
          Sign Out
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}
