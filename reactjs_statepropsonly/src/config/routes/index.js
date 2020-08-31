import React from "react";
import { Redirect } from "react-router-dom";
import { Login } from "../../pages";
import { RenderRoutes } from "../../utils";

export const Routes = ({ isAuthorized }) => {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (isAuthorized === true) return <Redirect to="/app" />;
        else if (isAuthorized === false) return <Redirect to="/login" />;
        else return "Loading";
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (isAuthorized === true) return <Redirect to="/app" />;
        else if (isAuthorized === false) return <Login />;
        else return "Loading";
      },
    },
    {
      key: "APP_ROOT",
      path: "/app",
      exact: false,
      component: (props) => {
        if (isAuthorized === true) return <RenderRoutes {...props} />;
        else if (isAuthorized === false) return <Redirect to="/login" />;
        else return "Loading";
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          component: () => "Dashboard",
        },
      ],
    },
  ];
};
