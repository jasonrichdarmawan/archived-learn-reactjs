import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/layout";
import { Routes } from "./components/routes";
import { AuthDataContext, UserDataContext } from "./providers/authdata";
import firebase from "./providers/firebase";

function App() {
  const [auth, setAuth] = useState("await");
  const [user, setUser] = useState("await");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      if (auth) setAuth(auth);
      else setAuth(null);
    });

    if (auth !== null && auth !== "await") {
      let db = firebase.firestore();
      db.collection("users")
        .doc(auth.uid)
        .onSnapshot((doc) => {
          setUser(doc.data());

          // let source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          // console.log(source, " data: ", doc.data());
        });
    }
  }, [auth]);
  return (
    <Router>
      <AuthDataContext.Provider value={auth}>
        <UserDataContext.Provider value={user}>
          <Layout>
            <Routes />
          </Layout>
        </UserDataContext.Provider>
      </AuthDataContext.Provider>
    </Router>
  );
}

export default App;
