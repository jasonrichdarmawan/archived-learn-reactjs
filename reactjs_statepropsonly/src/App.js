import React, { useState, useEffect } from "react";
import { Routes } from "./config";
import { RenderRoutes } from "./utils";
import { AuthDatabaseContext, AuthDataContext } from "./providers";

const App = () => {
  const [authDatabase, setAuthDatabase] = useState();
  const [authData, setAuthData] = useState({ res: "await" });

  // const routes = { routes: Routes({ isAuthorized: authData.res }) };
  const routes = Routes({ isAuthorized: authData.res });

  useEffect(() => {
    // TODO: function get() to fetch data.
    const timer = setTimeout(() => {
      setAuthData({ ...authData, res: false });
      setAuthDatabase([
        {
          username: "admin",
          password: "123456",
        },
        {
          username: "employee",
          password: "abcdefg",
        },
      ]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthDatabaseContext.Provider value={{ authDatabase, setAuthDatabase }}>
      <AuthDataContext.Provider value={{ authData, setAuthData }}>
        <RenderRoutes routes={routes} />
      </AuthDataContext.Provider>
    </AuthDatabaseContext.Provider>
  );
};

export default App;
