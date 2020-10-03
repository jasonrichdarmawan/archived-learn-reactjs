import React from "react";
import { Switch } from "react-router-dom";
import { RouteConfigProps } from "./config";
import { RouteWithSubRoutes } from "./RouteWithSubRoutes";

export const RenderRoutes: React.FC<{ routes: RouteConfigProps[] }> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes {...route} key={route.path} />
      ))}
    </Switch>
  );
};
