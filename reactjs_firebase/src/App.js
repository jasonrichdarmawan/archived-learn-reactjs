import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components/layout";
import { Routes } from "./components/routes";
import { AuthDataContext } from "./providers/authdata";
import firebase from "./providers/firebase";

function App() {
  const [user, setUser] = useState('await');
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);
  return (
    <Router>
      <AuthDataContext.Provider value={user}>
        <Layout>
          <Routes />
        </Layout>
      </AuthDataContext.Provider>
    </Router>
  );
}

export default App;
