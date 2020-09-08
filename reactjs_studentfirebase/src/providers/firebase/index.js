import React from "react";
import firebase from "api/firebase";
import jwt from "jsonwebtoken";

export const FirebaseContext = React.createContext();

export function FirebaseProvider({ children }) {
  // const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [authData, setAuthData] = React.useState("await");
  const [userData, setUserData] = React.useState("await");

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((authData) => {
      setAuthData(authData);
      console.log('authData', authData, 'userData', userData);
      // setLoadingAuthState(false);
      if (authData !== null && !localStorage.getItem("userData")) {
        firebase
          .firestore()
          .collection("users")
          .doc(authData.uid)
          .onSnapshot(
            (doc) => {
              if (doc.exists) {
                try {
                  const payload = { ...doc.data(), uid: doc.id };
                  setUserData(payload);

                  // bad practice
                  const encoded = jwt.sign(payload, "secretOrPublicKey");
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
        // loadingAuthState,
        authenticated: authData !== "await" ? userData !== "await" && true : "await",
        // authenticated: authData !== null ? userData !== null ? true : "await" : "await",
        // authData,
        // setAuthData,
        userData,
        setUserData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
