import React from "react";
import { Redirect } from "react-router-dom";
import { LoginPage, DashboardPage, RegisterPage } from "pages";

function routesConfig({ authenticated, userData }) {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authenticated === true) return <Redirect to="/app" />;
        else if (authenticated === false) return <Redirect to="/login" />;
        else return "Loading";
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authenticated === true) return <Redirect to="/app" />;
        else if (authenticated === false) return <LoginPage />;
        else return "Loading";
      },
    },
    {
      key: "REGISTER",
      path: "/register",
      exact: true,
      component: () => {
        if (authenticated === true) return <Redirect to="/app" />;
        else if (authenticated === false) return <RegisterPage />;
        else return "Loading";
      }
    },
    {
      key: "APP_ROOT",
      path: "/app",
      exact: false,
      component: () => {
        if (authenticated === true)
          return (
            <DashboardPage
              userData={userData}
              routesConfig={routesConfig({ authenticated })}
            />
          );
        else if (authenticated === false) return <Redirect to="/login" />;
        else return "Loading";
      },
    },
  ];
}

export { RenderRoutes } from "./RenderRoutes";

export default routesConfig;
