import React from 'react';
import { LogIn } from './containers/pages/login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Register } from './containers/pages/register'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
