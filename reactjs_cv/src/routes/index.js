import React from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import { Home, About } from "../pages";

export const routes = [
  { path: "/", key: "Home", exact: true, component: Home },
  { path: "/about", key: "About", exact: true, component: About },
  {
    path: "/contact",
    key: "Contact",
    exact: true,
    component: () => "TODO: Contact",
  },
  {
    path: "/motivation",
    key: "Motivation Letter",
    exact: true,
    component: () => "TODO: Motivation Letter",
  },
  {
    path: "/corevalues",
    key: "IT Core Values",
    exact: true,
    component: () => "TODO: IT Core Value",
  },
];

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export const displayRouteMenu = (routes) => {
  const singleRoute = (route) => (
    <Link to={route.path} className="nav-link" key={route.key}>
      {route.key}
    </Link>
  );

  return (
    <React.Fragment>
      {routes.map((route) =>
        route.routes ? (
          <React.Fragment key={route.key}>
            {displayRouteMenu(route.routes)}
          </React.Fragment>
        ) : (
          singleRoute(route)
        )
      )}
    </React.Fragment>
  );
};
