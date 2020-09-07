import React from "react";
import { Link } from "react-router-dom";

export const displayRoutesInNavbar = ({ routes, userData }) => {
  const singleRoute = (route) => (
    <Link to={route.path} key={route.key} className="nav-link">
      {route.key}
    </Link>
  );

  return (
    <>
      {routes.map((route) =>
        route.routes ? (
          <React.Fragment key={route.key}>
            {displayRoutesInNavbar({ userData, routes: route.routes })}
          </React.Fragment>
        ) : route.display === true ? (
          singleRoute(route)
        ) : (
          typeof route.display === "number" &&
          route.display >= userData.access &&
          singleRoute(route)
        )
      )}
    </>
  );
};
