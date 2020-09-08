import React from "react";
import { Redirect } from "react-router-dom";
import RenderRoutes from "./RenderRoutes";
import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  ListPage,
  EditPage,
} from "pages";

function routesConfig({ authenticated, userData, setUserData }) {
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
      },
    },
    {
      key: "APP_ROOT",
      path: "/app",
      exact: false,
      component: (props) => {
        if (authenticated === true) return <RenderRoutes {...props} />;
        else if (authenticated === false) return <Redirect to="/login" />;
        else return "Loading";
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          display: 1,
          component: () => {
            return (
              <DashboardPage
                routes={routesConfig({ authenticated })}
                userData={userData}
                setUserData={setUserData}
              />
            );
          },
        },
        {
          key: "List",
          path: "/app/list",
          exact: true,
          display: 0,
          component: () => {
            return (
              <ListPage
                routes={routesConfig({ authenticated })}
                userData={userData}
              />
            );
          },
        },
        {
          key: "EDIT_ROOT",
          path: "/app/edit",
          exact: false,
          component: (props) => {
            if (userData.access === 0) return <RenderRoutes {...props} />;
            else if (userData.access > 0) return <Redirect to="/app" />;
            else return "Loading";
          },
          routes: [
            {
              key: "Edit",
              path: "/app/edit",
              exact: true,
              display: 0,
              component: () => {
                return (
                  <EditPage
                    routes={routesConfig({ authenticated })}
                    userData={userData}
                  />
                );
              },
            },
            {
              key: "EDIT_ID",
              path: "/app/edit/:id",
              exact: true,
              component: () => {
                return (
                  <EditPage
                    routes={routesConfig({ authenticated })}
                    userData={userData}
                  />
                );
              },
            },
          ],
        },
        // {
        //   key: "Edit",
        //   path: "/app/edit/:id?",
        //   exact: true,
        //   display: 0,
        //   component: () => {
        //     if (userData.access === 0) return <EditPage />;
        //     else if (userData.access > 0) return <Redirect to="/app" />;
        //     else return "Loading";
        //   },
        // },
      ],
    },
  ];
}

export { RenderRoutes } from "./RenderRoutes";

export default routesConfig;
