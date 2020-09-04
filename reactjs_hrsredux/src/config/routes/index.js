import React from "react";
import { Redirect } from "react-router-dom";
import { FetchAuthData, RenderRoutes } from "../../utils";
import { LoginPage, DashboardPage, AddPage, ListPage } from "../../pages";

const routesConfig = ({ authData }) => {
  console.log("routesConfig", authData);

  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false)
          return <Redirect to="/login" />;
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
        else if (authData.isAuthorized === false)
          return <Redirect to="/login" />;
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
        {
          key: "ADD_ROOT",
          path: "/app/add",
          exact: false,
          component: (props) => {
            if (authData.access === 0) return <RenderRoutes {...props} />;
            else if (authData.access > 0) return <Redirect to="/app" />;
          },
          routes: [
            {
              key: "Add",
              path: "/app/add",
              exact: true,
              display: 0,
              component: () => {
                return <Redirect to="/app/add/employee" />;
              },
            },
            {
              key: "APP_ADD_REQUEST",
              path: "/app/add/:request(employee|department)",
              exact: true,
              component: () => {
                return (
                  <AddPage
                    authData={authData}
                    routesConfig={routesConfig({ authData })}
                  />
                );
              },
            },
          ],
        },
        {
          key: "LIST_ROOT",
          path: "/app/list",
          exact: false,
          component: (props) => {
            if (authData.access === 0) return <RenderRoutes {...props} />;
            else if (authData.access > 0) return <Redirect to="/app" />;
          },
          routes: [
            {
              key: "List",
              path: "/app/list",
              exact: true,
              display: 0,
              component: () => {
                return <Redirect to="/app/list/employee" />;
              },
            },
            {
              key: "APP_LIST_REQUEST",
              path: "/app/list/:request(employee|department)?/:id?",
              exact: true,
              component: () => {
                return (
                  <ListPage
                    authData={authData}
                    routesConfig={routesConfig({ authData })}
                  />
                );
              },
            },
          ],
        },
      ],
    },
  ];
};

export default routesConfig;
