import React from "react";
import { Link } from "react-router-dom";
import { routes, RenderRoutes } from "./routes";

const App = () => (
  <React.Fragment>
    {displayRouteMenu(routes)}
    <RenderRoutes routes={routes} />
  </React.Fragment>
);

export default App;

const displayRouteMenu = (routes) => {
  const singleRoute = (route) => (
    <li key={route.key}>
      <Link to={route.path}>
        {route.key}
      </Link>
    </li>
  );

  return (
    <ul>
      {routes.map((route) =>
        route.routes ? (
          <React.Fragment key={route.key}>
            {singleRoute(route)}
            {displayRouteMenu(route.routes)}
          </React.Fragment>
        ) : (
          singleRoute(route)
        )
      )}
    </ul>
  );
};
