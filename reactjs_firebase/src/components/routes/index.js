import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthDataContext, UserDataContext } from "../../providers/authdata";
import {
  LogIn,
  Register,
  PasswordReset,
  Dashboard,
  List,
} from "../../containers/pages";
import { Loading } from "../loading";

export const Routes = () => {
  const auth = useContext(AuthDataContext);
  const user = useContext(UserDataContext);
  if (user === "await") return <Loading />;
  // this is intentional. to speed up dev in case of new feature based on user.type
  else if (auth !== null && user.type === "0") {
    return (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/list">
          <Redirect to="/list/operator" />
        </Route>
        <Route
          exact
          path="/list/:request"
          render={(props) => <List {...props} />}
        />
        <Redirect to="/dashboard" />
      </Switch>
    );
  } else if (auth !== null && user.type === "1") {
    return (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/list">
          <Redirect to="/list/ticket" />
        </Route>
        <Route
          exact
          path="/list/:request"
          render={(props) => <List {...props} />}
        />
        <Redirect to="/dashboard" />
      </Switch>
    );
  } else if (auth === null) {
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
