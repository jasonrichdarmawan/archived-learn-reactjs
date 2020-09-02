import React, { useContext } from "react";
import { AuthDataContext, DatabaseContext } from "../../providers";
import { DashboardTemplate } from "../../components/templates";

export const DashboardPage = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const { database, setDatabase } = useContext(DatabaseContext);
  return (
    <DashboardTemplate
      authData={authData}
      setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
    />
  );
};
