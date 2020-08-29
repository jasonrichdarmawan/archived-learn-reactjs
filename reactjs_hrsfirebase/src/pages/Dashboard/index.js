import React, { useContext } from "react";
import { UserDataContext } from "../../App";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";

export const Dashboard = () => {
  const user = useContext(UserDataContext);
  if (user.type === 0) return (
    <TopNavbarMiddleContent routesJSX={displayRouteMenu(routes)} />
  );
  else if (user.type > 0) return (
    <TopNavbarMiddleContent routesJSX={displayRouteMenu(routes)} />
  )
  else return "Loading";
};