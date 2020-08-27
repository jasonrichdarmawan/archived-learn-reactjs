import React from "react";
import { TopNavbarMiddleContent } from "../../components/templates";
import { displayRouteMenu, routes } from "../../routes";

export const Home = () => {
  return <TopNavbarMiddleContent routesJSX={displayRouteMenu(routes)} />
};
