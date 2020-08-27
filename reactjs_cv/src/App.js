import React from "react";
import { Link, useHistory } from "react-router-dom";
import { routes, RenderRoutes } from "./routes";

function App() {
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <React.Fragment>
      {displayRouteMenu(routes)}
      <button onClick={logout}>Log Out</button>
      <RenderRoutes routes={routes} />
    </React.Fragment>
  );
}

export default App;

const displayRouteMenu = (routes) => {
  const singleRoute = (route) => (
    <li key={route.key}>
      <Link to={route.path}>
        {route.key} {route.path}
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
