import React from "react";
import { Redirect } from "react-router-dom";
import FetchAuthData from "../../utils/FetchAuthData";

const routesConfig = ({ isAuthorized }) => {
  console.log("routesConfig", isAuthorized);

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
  ];
};

export default routesConfig;
