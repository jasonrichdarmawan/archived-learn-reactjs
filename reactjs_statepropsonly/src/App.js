import React, { useState, useEffect } from "react";
import { Routes } from "./config";
import { RenderRoutes } from "./utils";

const App = () => {
  const [AuthData, setAuthData] = useState({ res: "await" });
  const routes = { routes: Routes({ isAuthorized: AuthData.res }) };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthData({ ...AuthData, res: false });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return <RenderRoutes routes={routes} />;
};

export default App;
