import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import LoginPage from './components/LoginPage/LoginPage';

function App() {
  // TODO: research safe way to store Authorization token.
  if (localStorage.Authorization === undefined) {
    return (
      <LoginPage />
    );
  } else {
    return (
      <div>HomePage</div>
    )
  }
}

export default App;
