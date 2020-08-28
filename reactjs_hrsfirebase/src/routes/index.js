import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";

// TODO
const isAuthorized = () => {
  return true;
};
const Login = () => {
  return "Login";
};
const user = {
  type: 0,
};
const Dashboard = () => {
  if (user.type === 0) return "Dashboard HRD";
  else if (user.type > 0) return "Dashboard Employee";
};
const AddPage = (props) => {
  if (props.match.params.request === "employee") {
    if (props.match.params.id) return "Add Page Employee id";
    else if (!props.match.params.id) return "Add Page Employee";
  } else if (props.match.params.request === "department") {
    if (props.match.params.id) return "Add Page Department id";
    else if (!props.match.params.id) return "Add Page Department";
  } else return <Route component={() => <h1>Not Found!</h1>} />;
};
const ListPage = (props) => {
  if (props.match.params.request === "employee") {
    if (props.match.params.id) return "List Page Employee id";
    else if (!props.match.params.id) return "List Page Employee";
  } else if (props.match.params.request === "department") {
    if (props.match.params.id) return "List Page Department id";
    else if (!props.match.params.id) return "List Page Department";
  } else return <Route component={() => <h1>Not Found!</h1>} />;
};
const PlacementPage = () => {
  return "Placement Page";
};

export const routes = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: () => {
      if (isAuthorized) return <Redirect to={"/app"} />;
      else return <Redirect to={"/login"} />;
    },
  },
  {
    path: "/login",
    key: "LOGIN",
    exact: true,
    component: () => {
      if (isAuthorized) return <Redirect to={"/app"} />;
      else return Login;
    },
  },
  {
    path: "/app",
    key: "APP",
    component: (props) => {
      if (!isAuthorized) return <Redirect to={"/"} />;
      else return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: Dashboard,
      },
      {
        path: "/app/add",
        key: "APP_ADD",
        component: (props) => {
          if (user.type === 0) return <RenderRoutes {...props} />;
          else if (user.type > 0) return <Redirect to={"/"} />;
        },
        routes: [
          {
            path: "/app/add",
            key: "APP_ADD_ROOT",
            exact: true,
            component: () => {
              return <Redirect to={"/app/add/employee"} />;
            },
          },
          {
            path: "/app/add/:request",
            key: "APP_ADD_REQUEST",
            exact: true,
            component: AddPage,
          },
          {
            path: "/app/add/:request/:id",
            key: "APP_ADD_REQUEST",
            exact: true,
            component: AddPage,
          },
        ],
      },
      {
        path: "/app/list",
        key: "APP_LIST",
        component: (props) => {
          if (user.type === 0) return <RenderRoutes {...props} />;
          else if (user.type > 0) return <Redirect to={"/"} />;
        },
        routes: [
          {
            path: "/app/list",
            key: "APP_LIST_ROOT",
            exact: true,
            component: () => {
              return <Redirect to={"/app/list/employee"} />;
            },
          },
          {
            path: "/app/list/:request",
            key: "APP_LIST_REQUEST",
            exact: true,
            component: ListPage,
          },
          {
            path: "/app/list/:request/:id",
            key: "APP_LIST_REQUEST_ID",
            exact: true,
            component: ListPage,
          },
        ],
      },
      {
        path: "/app/placement",
        key: "APP_PLACEMENT",
        exact: true,
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
          singleRoute(route)
        )
      )}
    </React.Fragment>
  );
};
