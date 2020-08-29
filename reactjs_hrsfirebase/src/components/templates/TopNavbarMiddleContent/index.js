import React from "react";
import { NavigationBar, Content } from "../../";

export const TopNavbarMiddleContent = (props) => {
  return (
    <React.Fragment>
      <NavigationBar routesJSX={props.routesJSX} />
      <Content className="mt-3" contentJSX={props.contentJSX} />
    </React.Fragment>
  );
}