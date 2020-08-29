import React, { useState, useEffect } from "react";
import { routes, RenderRoutes } from "./routes";
import { firebase } from "./providers";

export const AuthDataContext = React.createContext();

const App = () => {
  const [authData, setAuthData] = useState("await");
  useEffect(() => {
    const unlisten = firebase.auth().onAuthStateChanged((res) => {
      res ? setAuthData(res) : setAuthData();
    });
    return () => {
      unlisten();
    };
  }, []);
  return (
    <React.Fragment>
      <AuthDataContext.Provider value={authData}>
        <RenderRoutes routes={routes} />
      </AuthDataContext.Provider>
    </React.Fragment>
  );
};

export default App;
