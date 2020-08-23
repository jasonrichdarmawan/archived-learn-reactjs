import React from "react";
import { NavBar } from "../navbar";

export const Layout = (props) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBar />
      {props.children}
    </div>
  );
};
