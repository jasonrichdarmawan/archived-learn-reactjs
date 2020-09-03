import React from "react";
import { RenderRoutes } from "./utils/RenderRoutes";
import routesConfig from "./config/routes";
import { useSelector } from "react-redux";
import { selectAuthData } from "./providers/authDataSlice";

const App = () => {
  const authData = useSelector(selectAuthData);
  const routes = routesConfig({ authData });
  return <RenderRoutes routes={routes} />;
};

export default App;
