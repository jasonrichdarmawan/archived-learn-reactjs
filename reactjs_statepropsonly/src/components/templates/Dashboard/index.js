import React from "react";
import { NavigationBar } from "../../organisms";

export const DashboardTemplate = ({ routes, authData, setAuthData }) => {
  return (
    <React.Fragment>
      <NavigationBar
        routes={routes}
        authData={authData}
        setAuthData={setAuthData}
      />
    </React.Fragment>
  );
};
