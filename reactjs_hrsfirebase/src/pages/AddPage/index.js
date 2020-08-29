import React, { useContext } from "react";
import { UserDataContext } from "../../App";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";
import { Route } from "react-router-dom";

const contentJSX = (props) => {
  if (props.match.params.request === "employee") {
    return "Add Page Employee";
  } else if (props.match.params.request === "department") {
    return "Add Page Department";
  } else return <Route component={() => <h1>Not Found!</h1>} />;
};

export const AddPage = (props) => {
  const userData = useContext(UserDataContext);

  if (userData.type !== "await") {
    return (
      <TopNavbarMiddleContent
        routesJSX={displayRouteMenu(routes)}
        contentJSX={contentJSX(props)}
      />
    );
  } else return "Loading";
};
