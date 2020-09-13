import { Loading } from "components";
import { Login, Dashboard } from "features";
import { fetchAuthState } from "features/AuthState/AuthStateSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

export function Routes({ authState }) {
  // console.log("Routes()", authState);
  const dispatch = useDispatch();

  return [
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authState.isAuthorized === true) return <Redirect to="/app" />;
        else if (authState.isAuthorized === false) return <Login />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
    },
    {
      key: "APP_ROOT",
      path: "/app",
      component: (props) => {
        if (authState.isAuthorized === true) return <RenderRoutes {...props} />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          component: () => {
            if (authState.document) {
              return <Dashboard />;
            } else {
              return <Loading />;
            }
          },
        },
      ],
    },
  ];
}

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
