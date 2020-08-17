import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import LogInPage from './components/LogInPage/LogInPage';
import NavBar from './components/NavBar/NavBar';

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
          <Route exact path="/" component={Home}/>
          <Route path="/lists" component={Lists}/>
        </Switch>
      </Router>
    )
  }
}

const Home = () => (
  <div>Home</div>
);

const Lists = () => (
  <div>Lists</div>
)

export default App;
