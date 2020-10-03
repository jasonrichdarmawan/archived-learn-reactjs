import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { RouteConfigProps } from "./config";

export const RouteWithSubRoutes = (route: RouteConfigProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Route path={route.path}>
        <route.component {...route} routes={route.routes} />
      </Route>
    </Suspense>
  );
};
