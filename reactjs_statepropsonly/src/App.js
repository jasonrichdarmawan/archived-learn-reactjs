import React, { useState, useEffect } from "react";
import { Routes } from "./config";
import { RenderRoutes } from "./utils";
import { AuthDatabaseContext, AuthDataContext, RoutesContext } from "./providers";

const App = () => {
  const [authDatabase, setAuthDatabase] = useState();
  const [authData, setAuthData] = useState({ isAuthorized: "await" });

  const routes = Routes({ authData: authData });

  useEffect(() => {
    // TODO: function get() to fetch data.
    const timer = setTimeout(() => {
      setAuthData((a) => ({ ...a, isAuthorized: false }));
      setAuthDatabase([
        {
          username: "admin",
          password: "123456",
          type: 0,
          uid: 0,
          name: "Jason admin",
          email: "jason@admin.com",
          phoneNumber: "0889 0889 2668",
        },
        {
          username: "employee",
          password: "abcdefg",
          type: 1,
          uid: 0,
          name: "Jason employee",
          email: "jason@employee.com",
          phoneNumber: "0889 0889 2668",
        },
      ]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthDatabaseContext.Provider value={{ authDatabase, setAuthDatabase }}>
      <AuthDataContext.Provider value={{ authData, setAuthData }}>
        <RoutesContext.Provider value={routes}>
          <RenderRoutes routes={routes} />
        </RoutesContext.Provider>
      </AuthDataContext.Provider>
    </AuthDatabaseContext.Provider>
  );
};

export default App;
