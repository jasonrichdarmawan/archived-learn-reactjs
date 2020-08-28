import React from "react";
import { routes, RenderRoutes } from "./routes";

const App = () => (
  <React.Fragment>
    <RenderRoutes routes={routes} />
  </React.Fragment>
);

export default App;