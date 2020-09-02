import React, { useState, useEffect, useContext } from "react";
import { DatabaseContext } from "../Database";

// Fake Database
export const AuthDataContext = React.createContext();

export const AuthDataProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ isAuthorized: "await" });
  const { database } = useContext(DatabaseContext);

  useEffect(() => {
    setAuthData({ ...authData, ...database[authData.uid] });
  }, [database]);

  return (
    <AuthDataContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthDataContext.Provider>
  );
};
