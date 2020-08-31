import React, { useState } from "react";
import { Routes } from "./config";
import { RenderRoutes } from "./utils";

const App = () => {
  const [AuthData, setAuthData] = useState({ res: "await" });
  const routes = { routes: Routes({ isAuthorized: AuthData.res }) };

  return <RenderRoutes routes={routes} />;
};

export default App;
