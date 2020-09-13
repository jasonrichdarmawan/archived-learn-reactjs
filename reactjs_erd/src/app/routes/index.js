import { Loading } from "components";
import { Login, Dashboard, Employee } from "features";
import { fetchAuthState } from "features/AuthState/AuthStateSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

export function Routes(props = {}) {
  const { authState } = props;
  // console.log("Routes()", authState);
  const dispatch = useDispatch();

  return [
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      display: false,
      component: () => {
        if (authState.isAuthorized === true)
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false) return <Login />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
    },
    {
      key: "Dashboard",
      path: "/app/dashboard",
      exact: true,
      display: true,
      component: (props) => {
        if (authState.isAuthorized === true && authState.document)
          return <Dashboard />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
    },
    {
      key: "Employee",
      path: "/app/employee",
      display: "administration_role",
      component: (props) => {
        if (
          authState.isAuthorized === true &&
          authState.document.administration_role
        )
          return <RenderRoutes {...props} />;
        else if (
          authState.isAuthorized === true &&
          !authState.document.administration_role
        )
          return <Redirect to="/app/dashboard" />;
        else if (authState.isAuthorized === false)
          return <Redirect to="/login" />;
        else {
          dispatch(fetchAuthState());
          return <Loading />;
        }
      },
      routes: [
        {
          key: "List Employee",
          path: "/app/employee/:req(list)",
          exact: true,
          navpath: "/app/employee/list",
          display: true,
          component: () => <Employee />,
        },
        {
          key: "VIEW_EMPLOYEE",
          path: "/app/employee/:req(view)/:id",
          exact: true,
          display: false,
          component: () => <Employee />,
        },
        {
          key: "Add Employee",
          path: "/app/employee/:req(add)",
          exact: true,
          navpath: "/app/employee/add",
          display: "administration_role",
          component: () => <Employee />,
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
