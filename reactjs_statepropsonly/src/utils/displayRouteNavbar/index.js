import React from "react";
import { Link } from "react-router-dom";

export const displayRouteNavbar = ({ authData, routes }) => {
  console.log(routes);
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
            {displayRouteNavbar({ authData: authData, routes: route.routes })}
          </React.Fragment>
        ) : route.display ? (
          singleRoute(route)
        ) : route.display !== false && route.display >= authData.type ? (
          singleRoute(route)
        ) : null
      )}
    </React.Fragment>
  );
};
