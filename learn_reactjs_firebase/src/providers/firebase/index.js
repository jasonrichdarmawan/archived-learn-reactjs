import React, { useState, useEffect } from "react";
import firebase from "api/firebase";
import jwt from "jsonwebtoken";

export const FirebaseContext = React.createContext();

export function FirebaseProvider({ children }) {
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [authData, setAuthData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authData) => {
      setAuthData(authData);
      setLoadingAuthState(false);

      if (!localStorage.getItem("userData")) {
        firebase
          .firestore()
          .collection("users")
          .doc(authData.uid)
          .onSnapshot(
            (doc) => {
              if (doc.exists) {
                try {
                  setUserData(doc.data());

                  // bad practice
                  const encoded = jwt.sign(doc.data(), "secretOrPublicKey");
                  localStorage.setItem("userData", encoded);
                } catch (error) {
                  console.log("error jwt.sign()", error);
                }
              }
            },
            (error) => {
              console.log("error", error.code, error.message);
            }
          );
      }
    });

    if (localStorage.getItem("userData")) {
      try {
        // bad practice.
        const payload = jwt.verify(
          localStorage.getItem("userData"),
          "secretOrPublicKey"
        );

        setUserData(payload);
      } catch (error) {
        localStorage.removeItem("userData");
        console.log("error jwt.verify()", error);
      }
    }
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        loadingAuthState,
        authenticated:
          authData !== null
            ? true
            : loadingAuthState === true
            ? "await"
            : false,
        // authData,
        // setAuthData,
        userData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
