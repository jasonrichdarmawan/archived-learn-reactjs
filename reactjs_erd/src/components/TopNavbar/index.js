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
  function singleRoute(route, options) {
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
      {routes.map((route) =>
        // TODO: refactor this otherwise this will be in r/programminghorror
        route.routes ? (
          has(authState.document.access_rights, route.display) ? (
            authState.document.access_rights[route.display] ===
            null ? undefined : (
              <NavDropdown key={route.key} title={route.key} id={route.key}>
                {generateTopNav({
                  authState,
                  routes: route.routes,
                  options: "dropdown",
                })}
              </NavDropdown>
            )
          ) : undefined
        ) : route.display === true ? (
          singleRoute(route, options)
        ) : route.display === false ? undefined : has(
            authState.document.access_rights,
            route.display
          ) ? (
          authState.document.access_rights[route.display] ===
          null ? undefined : (
            (console.log("has()", route.display), singleRoute(route, options))
          )
        ) : (
          isMatch(authState.document.access_rights, route.display) &&
          (console.log("isMatch()", route.display), singleRoute(route, options))
        )
      )}
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
