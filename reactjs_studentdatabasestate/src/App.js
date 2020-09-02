import React from "react";

import { DatabaseProvider, AuthDataProvider } from "./providers";
import { RenderRoutes } from "./utils";

function App() {
  return (
    <DatabaseProvider>
      <AuthDataProvider>
        <RenderRoutes />
      </AuthDataProvider>
    </DatabaseProvider>
  );
}

export default App;
