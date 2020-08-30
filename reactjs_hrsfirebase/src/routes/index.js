import React, { useContext } from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Login, PasswordReset, Dashboard, AddPage, ListPage } from "../pages";
import { AuthDataContext, UserDataContext } from "../App";

const PlacementPage = () => {
  return "Placement Page";
};

let isAuthorized = "await";
let userData = "await";
export const routes = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    display: false,
    component: () => {
      if (isAuthorized === true) return <Redirect to={"/app"} />;
      else if (isAuthorized === false) return <Redirect to={"/login"} />;
      else return "Loading";
    },
  },
  {
    path: "/login",
    key: "LOGIN",
    exact: true,
    display: !isAuthorized,
    component: () => {
      if (isAuthorized === true) return <Redirect to={"/app"} />;
      else if (isAuthorized === false) return <Login />;
      else return "Loading";
    },
  },
  {
    path: "/passwordreset",
    key: "PASSWORDRESET",
    eaxct: true,
    display: !isAuthorized,
    component: () => {
      if (isAuthorized === true) return <Redirect to={"/app"} />;
      else if (isAuthorized === false) return <PasswordReset />;
      else return "Loading";
    },
  },
  {
    path: "/app",
    key: "APP",
    component: (props) => {
      if (isAuthorized === true) return <RenderRoutes {...props} />;
      else if (isAuthorized === false) return <Redirect to={"/"} />;
      else return "Loading";
    },
    routes: [
      {
        path: "/app",
        key: "Dashboard",
        exact: true,
        display: isAuthorized,
        component: Dashboard,
      },
      {
        path: "/app/add",
        key: "APP_ADD",
        component: (props) => {
          if (userData.type === 0) return <RenderRoutes {...props} />;
          else if (userData.type > 0) return <Redirect to={"/"} />;
          else return "Loading";
        },
        routes: [
          {
            path: "/app/add",
            key: "Add",
            exact: true,
            display: 0,
            component: () => {
              return <Redirect to={"/app/add/employee"} />;
            },
          },
          {
            path: "/app/add/:request",
            key: "APP_ADD_REQUEST",
            exact: true,
            display: false,
            component: AddPage,
          },
        ],
      },
      {
        path: "/app/list",
        key: "APP_LIST",
        component: (props) => {
          if (userData.type === 0) return <RenderRoutes {...props} />;
          else if (userData.type > 0) return <Redirect to={"/"} />;
          else return "Loading";
        },
        routes: [
          {
            path: "/app/list",
            key: "List",
            exact: true,
            display: 0,
            component: () => {
              return <Redirect to={"/app/list/employee"} />;
            },
          },
          {
            path: "/app/list/:request",
            key: "APP_LIST_REQUEST",
            exact: true,
            display: false,
            component: ListPage,
          },
          {
            path: "/app/list/:request/:id",
            key: "APP_LIST_REQUEST_ID",
            exact: true,
            display: false,
            component: ListPage,
          },
        ],
      },
      {
        path: "/app/placement",
        key: "Placement",
        exact: true,
        display: 0,
        component: PlacementPage,
      },
    ],
  },
];

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export function RenderRoutes({ routes }) {
  const auth = useContext(AuthDataContext);
  if (auth && auth !== "await") isAuthorized = true;
  else if (auth !== "await") isAuthorized = false;

  userData = useContext(UserDataContext);

  return (
    <Switch>
      {routes.map((route) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export const displayRouteMenu = (routes) => {
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
            {displayRouteMenu(route.routes)}
          </React.Fragment>
        ) : (
          route.display ? singleRoute(route) : route.display !== false && route.display >= userData.type ? singleRoute(route) : null
        )
      )}
    </React.Fragment>
  );
};
