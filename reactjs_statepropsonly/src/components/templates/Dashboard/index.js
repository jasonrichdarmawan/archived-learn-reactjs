import React from "react";
import { NavigationBar } from "../../organisms";

export const DashboardTemplate = ({ authData, setAuthData }) => (
  <React.Fragment>
    <NavigationBar authData={setAuthData} setAuthData={setAuthData} />
  </React.Fragment>
);
