import React from "react";
import { Redirect } from "react-router-dom";

import { FetchAuthData, RenderRoutes } from "../../utils";
import { LoginPage, DashboardPage, AddPage, EditPage } from "../../pages";

export const Routes = ({ authData }) => {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <DashboardPage />;
        else return <FetchAuthData />;
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <LoginPage />;
        else return <FetchAuthData />;
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
        else return <FetchAuthData />;
      },
      routes: [
        {
          key: "Dashboard",
          path: "/app",
          exact: true,
          display: true,
          component: DashboardPage,
        },
        {
          key: "ADD_ROOT",
          path: "/app/add",
          exact: false,
          component: (props) => {
            if (authData.type === 0) return <RenderRoutes {...props} />;
            else if (authData.type > 0) return <Redirect to="/app" />;
            else return <FetchAuthData />;
          },
          routes: [
            {
              key: "Add",
              path: "/app/add",
              exact: true,
              display: 0,
              component: AddPage,
            },
          ],
        },
        {
          key: "EDIT_ROOT",
          path: "/app/edit",
          exact: false,
          component: (props) => {
            if (authData.type === 0) return <RenderRoutes {...props} />;
            else if (authData.type > 0) return <Redirect to="/app" />;
            else return <FetchAuthData />;
          },
          routes: [
            {
              key: "Edit",
              path: "/app/edit",
              exact: true,
              display: 0,
              component: EditPage,
            },
            {
              key: "EDIT_ID",
              path: "/app/edit/:id",
              exact: true,
              display: false,
              component: EditPage,
            },
          ],
        },
      ],
    },
  ];
};
