import React from "react";
import { FirebaseContext } from "providers/firebase";
import routesConfig, { RenderRoutes } from "utils/routes";

function App() {
  const FirebaseConsumer = React.useContext(FirebaseContext);
  return (
    <RenderRoutes
      routes={routesConfig({
        authenticated: FirebaseConsumer.authenticated,
        userData: FirebaseConsumer.userData,
        setUserData: FirebaseConsumer.setUserData,
      })}
    />
  );
}

export default App;
