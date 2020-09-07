import React from "react";
import { FirebaseContext } from "providers/firebase";
import routesConfig, { RenderRoutes } from "utils/routes";

function App() {
  const FirebaseConsumer = React.useContext(FirebaseContext);
  return (
    <RenderRoutes
      routesConfig={routesConfig({
        authenticated: FirebaseConsumer.authenticated,
        userData: FirebaseConsumer.userData,
      })}
    />
  );
}

export default App;
