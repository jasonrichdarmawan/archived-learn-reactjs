import React, { useContext } from "react";
import { DashboardTemplate } from "../../components";
import { AuthDataContext } from "../../providers";

export const DashboardPage = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);

  if (authData.type === 0) return <DashboardTemplate authData={authData} setAuthData={setAuthData} />;
  else if (authData.type > 0) return <DashboardTemplate />;
};
