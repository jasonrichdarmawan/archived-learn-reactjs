import React, { useState, useEffect, useContext } from "react";
import { Routes } from "./config";
import { RenderRoutes } from "./utils";
import { AuthDatabaseContext, AuthDataContext } from "./providers";

const App = () => {
  const [authDatabase, setAuthDatabase] = useState(
    useContext(AuthDatabaseContext)
  );
  const [authData, setAuthData] = useState(useContext(AuthDataContext));

  const routes = { routes: Routes({ isAuthorized: authData.res }) };

  useEffect(() => {
    const timer = setTimeout(
      () => setAuthData({ ...authData, res: false }),
      2000
    );
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
