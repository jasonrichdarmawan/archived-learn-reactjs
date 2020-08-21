import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import LogIn from './components/LogIn';

function App() {
  let isLoggedIn = localStorage.Authorization != null;
  return (
    <Router>
      <Route exact path="/">
        {isLoggedIn ? <div>{localStorage.Authorization}</div> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/" /> : <LogIn />}
      </Route>
    </Router>
  );
}

export default App;
