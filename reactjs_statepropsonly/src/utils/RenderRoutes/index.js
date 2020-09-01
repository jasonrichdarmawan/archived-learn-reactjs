import React from "react";
import { Switch, Route } from "react-router-dom";
import { RoutesContext } from "../../providers";

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export const RenderRoutes = ({ routes }) => {
  return (
    <RoutesContext.Provider value={routes}>
      <Switch>
        {routes.map((route) => (
          <RouteWithSubRoutes key={route.key} {...route} />
        ))}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    </RoutesContext.Provider>
  );
};
