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
  if ((auth !== null && user === "await") || auth === "await")
    return <Loading />;
  // this is intentional. to speed up dev in case of new feature based on user.type
  // question: How to implement straightforward PrivateRoute?
  else if (auth === null) {
    return (
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/passwordreset" component={PasswordReset} />
        <Redirect to="/login" />
      </Switch>
    );
  } else if (auth !== null && user !== "await") {
    return (
      <Switch>
        {parseInt(user.type) < 2 ? (
          <Route path="/dashboard" component={Dashboard} />
        ) : null}
        <Route exact path="/list">
          <Redirect to="/list/ticket" />
        </Route>
        {user.type === "0" ? null : (
          <Route path="/list/operator">
            <Redirect to="/list" />
          </Route>
        )}
        <Route
          exact
          path="/list/:request"
          render={(props) => <List {...props} />}
        />
        {parseInt(user.type) < 2 ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/list" />
        )}
      </Switch>
    );
  } else if (user === "await") return null;
};
