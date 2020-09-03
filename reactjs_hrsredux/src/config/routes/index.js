import React from "react";
import { Redirect } from "react-router-dom";
import FetchAuthData from "../../utils/FetchAuthData";
import RenderRoutes from "../../utils/RenderRoutes";
import { LoginPage } from "../../pages";

const routesConfig = ({ isAuthorized }) => {
  // console.log("routesConfig", isAuthorized);

  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (isAuthorized === true) return <Redirect to="/app" />;
        else if (isAuthorized === false) return <Redirect to="/login" />;
        else return <FetchAuthData isAuthorized={isAuthorized} />;
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (isAuthorized === true) return <Redirect to="/app" />;
        // TODO LoginPage
        else if (isAuthorized === false) return <LoginPage />;
        else return <FetchAuthData isAuthorized={isAuthorized} />;
      },
    },
    {
      key: "APP_ROOT",
      path: "/app",
      exact: false,
      component: (props) => {
        if (isAuthorized === true) return <RenderRoutes {...props} />;
        else if (isAuthorized === false) return <Redirect to="/login" />;
        else return <FetchAuthData isAuthorized={isAuthorized} />;
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          // TODO DashboardPage
          component: () => {
            return "Dashboard";
          },
        },
      ],
    },
  ];
};

export default routesConfig;
