import React from "react";
import { NavigationBar, Content } from "../../";

export const TopNavbarMiddleContent = (props) => {
  return (
    <React.Fragment>
      <NavigationBar routesJSX={props.routesJSX} />
      <Content contentJSX={props.contentJSX} />
    </React.Fragment>
  );
}