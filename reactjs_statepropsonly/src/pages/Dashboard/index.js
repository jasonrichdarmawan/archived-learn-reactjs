import React, { useContext } from "react";
import { DashboardTemplate } from "../../components";
import { AuthDataContext, RoutesContext } from "../../providers";

export const DashboardPage = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const routes = useContext(RoutesContext);

  return (
    <DashboardTemplate
      routes={routes}
      authData={authData}
      setAuthData={setAuthData}
    />
  );
};
