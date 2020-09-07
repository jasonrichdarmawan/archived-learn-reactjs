import React, { useState, useEffect } from "react";
import firebase from "api/firebase";

export const FirebaseContext = React.createContext();

export function FirebaseProvider({ children }) {
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoadingAuthState(false);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{ loadingAuthState, authenticated: user !== null, user, setUser }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
