import React from "react";
import { TopNavbarMiddleContent } from "../../components/templates";
import { displayRouteMenu, routes } from "../../routes";

export const About = () => {
  return <TopNavbarMiddleContent routesJSX={displayRouteMenu(routes)} />;
};
