import React from "react";
import { Switch, Route } from "react-router-dom";

export const routes = [
  {
    key: "ROOT",
    path: "/",
    exact: true,
    component: () => "App",
  },
];

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} exact={route.exact} render={(props) => <route.component {...props} routes={route.routes} />} />
)

export const RenderRoutes = ({ routes }) => (
  <Switch>
    {routes.map((route) => (
      <RouteWithSubRoutes key={route.key} {...route} />
    ))}
    <Route component={() => <h1>Not Found!</h1>} />
  </Switch>
);
