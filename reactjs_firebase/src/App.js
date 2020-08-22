import React, { useState } from "react";
import { LogIn } from "./containers/pages/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Register } from "./containers/pages/register";
import { Dashboard } from "./containers/pages/dashboard";
import { PasswordReset } from "./containers/pages/passwordreset";

function App() {
  const [user, setUser] = useState(null);
  return user ? (
    <Dashboard />
  ) : (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/passwordreset" component={PasswordReset} />
      </Switch>
    </Router>
  );
}

export default App;
