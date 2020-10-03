import React from "react";
import { RenderRoutes } from "./routes/RenderRoutes";
import { routes } from "./routes/config";

const App = () => {
  return <RenderRoutes routes={routes} />;
};

export default App;
