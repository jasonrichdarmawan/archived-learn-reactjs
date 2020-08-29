import React from "react";
import { NavigationBar } from "../../";

export const TopNavbarMiddleContent = (props) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar routesJSX={props.routesJSX} />
      {props.contentJSX}
    </div>
  );
}