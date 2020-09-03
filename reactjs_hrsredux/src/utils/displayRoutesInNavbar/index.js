import React from "react";
import { Link } from "react-router-dom";

export const displayRoutesInNavbar = ({ authData, routesConfig }) => {
  const singleRoute = (route) => (
    <Link to={route.path} key={route.key} className="nav-link">
      {route.key}
    </Link>
  );

  return (
    <>
      {routesConfig.map((route) =>
        route.routes ? (
          <React.Fragment key={route.key}>
            {displayRoutesInNavbar({ authData, routesConfig: route.routes })}
          </React.Fragment>
        ) : route.display === true ? (
          singleRoute(route)
        ) : (
          typeof route.display === "number" &&
          route.display >= authData.access &&
          singleRoute(route)
        )
      )}
    </>
  );
};