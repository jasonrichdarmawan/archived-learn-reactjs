import React, { useState, useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";

const RouteWithSubRoutes = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={(props) => <route.component {...props} routes={route.routes} />}
  />
);

export const RenderRoutes = () => {
  const { authData } = useContext(AuthDataContext);

  const routes = Routes({ authData: authData });

  return (
    <Switch>
      {routes.map((route) => (
        <RouteWithSubRoutes key={route.key} {...route} />
      ))}
    </Switch>
  );
};

const FetchAuthData = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);

  if (authData.isAuthorized === "await") {
    const timer = setTimeout(() => {
      setAuthData({ isAuthorized: false });
    }, 1000);
    return () => clearTimeout(timer);
  }
};

export const Login = () => {
  return "Login";
};

export const Routes = ({ authData }) => {
  return [
    {
      key: "ROOT",
      path: "/",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false)
          return <Redirect to="/login" />;
        else return <FetchAuthData />;
      },
    },
    {
      key: "LOGIN",
      path: "/login",
      exact: true,
      component: () => {
        if (authData.isAuthorized === true) return <Redirect to="/app" />;
        else if (authData.isAuthorized === false) return <Login />;
        else return <FetchAuthData />;
      },
    },
    // {
    //   key: "APP_ROOT",
    //   path: "/app",
    //   exact: false,
    //   component: (props) => {
    //     if (authData.isAuthorized === true) return <RenderRoutes {...props} />;
    //     else if (authData.isAuthorized === false) return <Redirect to="/login" />;
    //     else return "Loading";
    //   },
    // },
  ];
};

const AuthDataContext = React.createContext();

const AuthDataProvider = ({ children }) => {
  const [authData, setAuthData] = useState({ isAuthorized: "await" });
  return (
    <AuthDataContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthDataContext.Provider>
  );
};

function App() {
  return (
    <AuthDataProvider>
      {/* <RenderRoutes routes={Routes({ authData: authData })} /> */}
      <RenderRoutes />
    </AuthDataProvider>
  );
}

export default App;
