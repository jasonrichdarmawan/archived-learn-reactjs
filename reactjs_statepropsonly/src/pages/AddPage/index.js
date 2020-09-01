import React, { useContext } from "react";
import { AddTemplate } from "../../components";
import {
  AuthDataContext,
  AuthDatabaseContext,
  RoutesContext,
} from "../../providers";

export const AddPage = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const { authDatabase, setAuthDatabase } = useContext(AuthDatabaseContext);
  const routes = useContext(RoutesContext);

  return (
    <AddTemplate
      routes={routes}
      authData={authData}
      setAuthData={setAuthData}
    />
  );
};
