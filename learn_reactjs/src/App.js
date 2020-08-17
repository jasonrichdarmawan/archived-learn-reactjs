import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import LogInPage from './components/LogInPage/LogInPage';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';

function App() {
  // TODO: research safe way to store Authorization token.
  if (localStorage.Authorization === undefined) {
    return (
      <Router>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route path="/login" component={LogInPage}/>
      </Router>
    );
  } else {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/login">
            <Redirect to="/" />
          </Route>
          <Route exact path="/" component={HomePage}/>
          <Route path="/lists" component={Lists}/>
        </Switch>
      </Router>
    )
  }
}

const Lists = () => (
  <div>Lists</div>
)

export default App;
