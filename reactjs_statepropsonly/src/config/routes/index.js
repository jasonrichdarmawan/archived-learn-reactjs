import React from "react";
import { Redirect } from "react-router-dom";
import { Login } from "../../pages";

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
        if (isAuthorized === true) return <Redirect to="/app" />
        else if (isAuthorized === false) return <Login />
        else return "Loading"
      }
    }
  ];
};