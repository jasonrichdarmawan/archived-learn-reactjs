import React, { useState, useEffect } from "react";
import { routes, RenderRoutes } from "./routes";
import { firebase } from "./providers";

export const AuthDataContext = React.createContext();
export const UserDataContext = React.createContext();

const App = () => {
  const [authData, setAuthData] = useState("await");
  const [userData, setUserData] = useState("await");
  useEffect(() => {
    const auth = firebase.auth().onAuthStateChanged((res) => {
      res ? setAuthData(res) : setAuthData();
    });

    // question: will this cause memory leak?
    if (authData && authData !== "await")
      firebase
        .firestore()
        .collection("users")
        .doc(authData.uid)
        .onSnapshot(
          (doc) => {
            console.log("doc.data()", doc.data());
            doc.exists ? setUserData(doc.data()) : setUserData();
          },
          (error) => {
            console.log("error", error.code, error.message);
          }
        );

    return () => {
      auth();
    };
  }, [authData]);

  return (
    <React.Fragment>
      <AuthDataContext.Provider value={authData}>
        <UserDataContext.Provider value={userData}>
          <RenderRoutes routes={routes} />
        </UserDataContext.Provider>
      </AuthDataContext.Provider>
    </React.Fragment>
  );
};

export default App;
