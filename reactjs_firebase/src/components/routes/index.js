import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthDataContext } from "../../providers/authdata";
import {
  LogIn,
  Register,
  PasswordReset,
  Dashboard,
  List,
} from "../../containers/pages";

export const Routes = () => {
  const user = useContext(AuthDataContext);
  if (user) {
    return (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/list" component={List} />
        <Redirect to="/dashboard" />
      </Switch>
    );
  } else if (user === "first") return null;
  else {
    return (
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/passwordreset" component={PasswordReset} />
        <Redirect to="/login" />
      </Switch>
    );
  }
};
