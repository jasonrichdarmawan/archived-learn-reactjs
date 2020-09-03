import React from "react";
import { Redirect } from "react-router-dom";
import FetchAuthData from "../../utils/FetchAuthData";
import RenderRoutes from "../../utils/RenderRoutes";
import { LoginPage, DashboardPage } from "../../pages";

const routesConfig = ({ authData }) => {
  // console.log("routesConfig", isAuthorized);

  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <Redirect to="/login" />;
        else return <FetchAuthData isAuthorized={authData.isAuthorized} />;
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        // TODO LoginPage
        else if (authData.isAuthorized === false) return <LoginPage />;
        else return <FetchAuthData isAuthorized={authData.isAuthorized} />;
      },
    },
    {
      key: "APP_ROOT",
      path: "/app",
      exact: false,
      component: (props) => {
        if (authData.isAuthorized === true) return <RenderRoutes {...props} />;
        else if (authData.isAuthorized === false) return <Redirect to="/login" />;
        else return <FetchAuthData isAuthorized={authData.isAuthorized} />;
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          display: 0,
          component: () => {
            return (
              <DashboardPage
                authData={authData}
                routesConfig={routesConfig({ authData })}
              />
            );
          },
        },
      ],
    },
  ];
};

export default routesConfig;
