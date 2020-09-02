import React, { useContext } from "react";
import { DatabaseContext, AuthDataContext } from "../../providers";
import { AddTemplate } from "../../components/templates";

export const AddPage = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const { authData, setAuthData } = useContext(AuthDataContext);
  return (
    <AddTemplate
      authData={authData}
      setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
    />
  );
};
