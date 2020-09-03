import React from "react";
import { NavBarOrganism, CardTemplate } from "../../";

import { logout } from "../../../providers/AuthDataSlice";

export const DashboardTemplate = ({
  authData,
  setAuthData,
  database,
  setDatabase,
}) => (
  <div className="min-vh-100 d-flex flex-column">
    <NavBarOrganism authData={authData} setAuthData={() => setAuthData(logout())} />
    <CardTemplate
      database={database}
      setDatabase={setDatabase}
      authData={authData}
      setAuthData={setAuthData}
    />
  </div>
);

// setAuthData({update({"konten": "konten"}))