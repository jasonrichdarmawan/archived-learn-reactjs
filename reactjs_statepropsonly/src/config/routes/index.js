import React from "react";
import { Redirect } from "react-router-dom";
import {
  Login,
  DashboardPage,
  AddPage,
  ListPage,
  PlacementPage,
} from "../../pages";
import { RenderRoutes } from "../../utils";

export const Routes = ({ authData }) => {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false)
          return <Redirect to="/login" />;
        else return "Loading";
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <Login />;
        else return "Loading";
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
        else return "Loading";
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
          key: "APP_ADD_ROOT",
          path: "/app/add",
          exact: false,
          component: (props) => {
            if (authData.type === 0) return <RenderRoutes {...props} />;
            else if (authData.type > 0) return <Redirect to="/login" />;
            else return "Loading";
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
              path: "/app/add/:request",
              exact: true,
              display: false,
              component: AddPage,
            },
          ],
        },
        {
          key: "APP_LIST_ROOT",
          path: "/app/list",
          exact: false,
          component: (props) => {
            if (authData.type === 0) return <RenderRoutes {...props} />;
            else if (authData.type > 0) return <Redirect to="/login" />;
            else return "Loading";
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
              path: "/app/list/:request",
              exact: true,
              display: false,
              component: ListPage,
            },
            {
              key: "APP_LIST_REQUEST_ID",
              path: "/app/list/:request/:id",
              exact: true,
              display: false,
              component: ListPage,
            },
          ],
        },
        {
          key: "APP_PLACEMENT_ROOT",
          path: "/app/placement",
          exact: false,
          display: false,
          component: (props) => {
            if (authData.type === 0) return <RenderRoutes {...props} />;
            else if (authData.type > 0) return <Redirect to="/login" />;
            else return "Loading";
          },
          routes: [
            {
              key: "Placement",
              path: "/app/placement",
              exact: true,
              display: true,
              component: PlacementPage,
            },
            {
              key: "APP_PLACEMENT_ID",
              path: "/app/placement/:id",
              exact: true,
              display: false,
              component: PlacementPage,
            },
          ],
        },
      ],
    },
  ];
};
