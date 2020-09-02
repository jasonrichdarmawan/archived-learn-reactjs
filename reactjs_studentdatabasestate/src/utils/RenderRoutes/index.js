import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";

import { AuthDataContext } from "../../providers";
import { Routes } from "../../config";

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export const RenderRoutes = ({ routes }) => {
  const { authData } = useContext(AuthDataContext);

  routes = routes ? routes : Routes({ authData: authData });

  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found</h1>} />
    </Switch>
  );
};
