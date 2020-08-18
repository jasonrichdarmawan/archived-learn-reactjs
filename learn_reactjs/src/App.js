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
import ListsPage from './components/ListsPage/ListsPage';
import CreatePage from './components/CreatePage/CreatePage';
import ViewPage from './components/ViewPage/ViewPage';

function App() {
  // TODO: research safe way to store Authorization token.
  if (localStorage.Authorization === undefined) {
    return (
      <Router>
        <Route exact path="/">
          <Redirect to="/login"/>
        </Route>
        <Route
          path="/login"
          component={LogInPage}/>
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
          <Route 
            exact path="/"
            component={HomePage}
          />

          {/* TODO: refactor the route logic */}
          <Route
            exact path="/lists"
            component={() => <ListsPage request="employees"/>}
          >
            <Redirect to="/lists/employees"/>
          </Route>
          <Route
            exact path="/lists/employees" 
            component={() => <ListsPage request="employees"/>}
          />
          <Route
            exact path="/lists/departments" 
            component={() => <ListsPage request="departments"/>}
          />

          <Route
            exact path="/create"
            component={() => <CreatePage request="employees"/>}
          >
            <Redirect to="/create/employee"/>
          </Route>
          <Route
            exact path="/create/employee"
            component={() => <CreatePage request="employees"/>}
          />
          <Route
            exact path="/create/department"
            component={() => <CreatePage request="departments"/>}
          />

          <Route
            path="/view/:request/:id"
            component={(props) => <ViewPage {...props}/>}
          />

        </Switch>
      </Router>
    )
  }
}

export default App;
