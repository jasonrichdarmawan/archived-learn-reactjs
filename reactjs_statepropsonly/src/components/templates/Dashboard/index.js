import React from "react";
import { NavigationBar, EmployeeInformation } from "../../organisms";

export const DashboardTemplate = ({ routes, authData, setAuthData }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar
        routes={routes}
        authData={authData}
        setAuthData={setAuthData}
      />
      <EmployeeInformation authData={authData} />
    </div>
  );
};
