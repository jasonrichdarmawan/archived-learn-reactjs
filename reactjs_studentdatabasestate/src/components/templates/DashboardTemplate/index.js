import React from "react";
import { NavBarOrganism, CardTemplate } from "../../";

export const DashboardTemplate = ({
  authData,
  setAuthData,
  database,
  setDatabase,
}) => (
  <div className="min-vh-100 d-flex flex-column">
    <NavBarOrganism authData={authData} setAuthData={setAuthData} />
    <CardTemplate
      database={database}
      setDatabase={setDatabase}
      authData={authData}
      setAuthData={setAuthData}
    />
  </div>
);
