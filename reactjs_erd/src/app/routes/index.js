import { Login, Dashboard } from "features";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

export const routes = [
  {
    key: "LOGIN",
    path: "/login",
    exact: true,
    component: () => {
      // TODO
      if (localStorage.getItem("user")) return <Redirect to="/app" />;
      return <Login />;
    },
  },
  {
    key: "APP_ROOT",
    path: "/app",
    component: (props) => {
      // TODO
      if (!localStorage.getItem("user")) return <Redirect to="/login" />;
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        key: "Dashboard",
        path: "/app",
        exact: true,
        component: Dashboard,
      },
    ],
  },
];

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
