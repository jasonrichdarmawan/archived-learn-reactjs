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

function dummyData() {
  // debug only: dummy data
  let employee_primary = [
      {},
      {},
      {
          id: "2",
          name: "Jeff Bezos Long Name",
          email: "jeff_bezos_long_name@gmail.com"
      },
      {},
      {
          id: "4",
          name: "Jeff Bezos Long Name",
          email: "jeff_bezos_long_name@gmail.com"
      },
      {},
      {
          id: "6",
          name: "Jeff Bezos Long Name",
          email: "jeff_bezos_long_name@gmail.com"
      },
      {},
      {
          id: "8",
          name: "Jeff Bezos Long Name",
          email: "jeff_bezos_long_name@gmail.com"
      },
  ];
  localStorage.employee_primary = JSON.stringify(employee_primary);
  let employee_info = [
      {},
      {},
      {
          primary_id: "2",
          nationalIDNumber: "2222",
          idValidityDate: "2020-12-20",
          taxpayerIDNumber: "2222",
          taxPeriod: "2020-12-20",
          birthDate: "2020-12-20",
          nationality: "ID",
          gender: "Male",
          religion: "Islam",
          maritalStatus: "Not married",
          education: "Postgraduate"
      },
      {},
      {
          primary_id: "4",
          nationalIDNumber: "5555",
          idValidityDate: "2020-12-20",
          taxpayerIDNumber: "5555",
          taxPeriod: "2020-12-20",
          birthDate: "2020-12-20",
          nationality: "ID",
          gender: "Male",
          religion: "Islam",
          maritalStatus: "Not married",
          education: "Postgraduate"
      },
      {},
      {
          primary_id: "6",
          nationalIDNumber: "6666",
          idValidityDate: "2020-12-20",
          taxpayerIDNumber: "6666",
          taxPeriod: "2020-12-20",
          birthDate: "2020-12-20",
          nationality: "ID",
          gender: "Male",
          religion: "Islam",
          maritalStatus: "Not married",
          education: "Postgraduate"
      },
      {},
      {
          primary_id: "8",
          nationalIDNumber: "8888",
          idValidityDate: "2020-12-20",
          taxpayerIDNumber: "8888",
          taxPeriod: "2020-12-20",
          birthDate: "2020-12-20",
          nationality: "ID",
          gender: "Male",
          religion: "Islam",
          maritalStatus: "Not married",
          education: "Postgraduate"
      },
  ];
  localStorage.employee_info = JSON.stringify(employee_info);
  let department_primary = [
      {},
      {},
      {
          id: "2",
          name: "Board of Directors",
          email: "bod@gmail.com"
      },
      {},
      {
          id: "4",
          name: "C-Level Executives",
          email: "c-level@gmail.com"
      },
      {},
      {
          id: "6",
          name: "Operation",
          email: "operation@gmail.com"
      },
      {},
      {
          id: "8",
          name: "Marketing",
          email: "marketing@gmail.com"
      },
  ];
  localStorage.department_primary = JSON.stringify(department_primary);
  let department_info = [
      {},
      {},
      {
          primary_id: "2",
          employeeList: "[2]"
      },
      {},
      {
          primary_id: "4",
          employeeList: "[4]"
      },
      {},
      {
          primary_id: "6",
          employeeList: "[6]"
      },
      {},
      {
          primary_id: "8",
          employeeList: "[8]"
      }
  ];
  localStorage.department_info = JSON.stringify(department_info);
}

function App() {
  // dummyData();
  
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
