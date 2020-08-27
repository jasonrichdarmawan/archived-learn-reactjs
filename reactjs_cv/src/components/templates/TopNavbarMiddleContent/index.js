import React from "react";
import { NavigationBar, MiddleContent } from "../../organisms";

export const TopNavbarMiddleContent = (props) => {
  return (
    <React.Fragment>
      <NavigationBar routesJSX={props.routesJSX} />
      <MiddleContent contentJSX={props.contentJSX} />
    </React.Fragment>
  );
}