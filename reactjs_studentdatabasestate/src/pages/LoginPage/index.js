import React, { useContext } from "react";
import { AuthDataContext, DatabaseContext } from "../../providers";
import { LoginTemplate } from "../../components";


export const LoginPage = () => {
  const { database } = useContext(DatabaseContext);
  const { setAuthData } = useContext(AuthDataContext);

  return <LoginTemplate database={database} setAuthData={setAuthData} />;
};