import React, { useContext } from "react";
import {
  // AuthDataContext,
  DatabaseContext,
} from "../../providers";
import { EditTemplate } from "../../components/templates";

export const EditPage = (props) => {
  // const { authData, setAuthData } = useContext(AuthDataContext);
  const { database, setDatabase } = useContext(DatabaseContext);
  return (
    <EditTemplate
      // authData={authData}
      // setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
      props={props}
    />
  );
};
