import React, { useContext } from "react";
import {
  //  AuthDataContext,
  DatabaseContext,
} from "../../providers";
import { DashboardTemplate } from "../../components/templates";

import { useSelector, useDispatch } from "react-redux";
import { selectAuthData } from "../../providers/AuthDataSlice";

export const DashboardPage = () => {
  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const setAuthData = (req) => dispatch(req);

  // const { authData, setAuthData } = useContext(AuthDataContext);
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
