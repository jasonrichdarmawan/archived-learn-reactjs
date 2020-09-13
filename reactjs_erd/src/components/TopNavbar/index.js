import React from "react";
import { signOut } from "features/AuthState/AuthStateSlice";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Routes } from "app/routes";
import has from "lodash/has";
import { isMatch } from "lodash";

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
        route.routes ? (
          <NavDropdown key={route.key} title={route.key} id={route.key}>
            {generateTopNav({
              authState,
              routes: route.routes,
              options: "dropdown",
            })}
          </NavDropdown>
        ) : route.display === true ? (
          singleRoute(route, options)
        ) : route.display === false ? undefined : has(
            authState.document,
            route.display
          ) ? (
          singleRoute(route, options)
        ) : (
          isMatch(authState.document, route.display) &&
          singleRoute(route, options)
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
