import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container w-25 text-center">
        <form>
          <img className="mb-3" src={logo} alt=""/>
          <div className="form-group">
            <input type="email" className="form-control" id="inputEmail" placeholder="Email address"></input>
            <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
          </div>
          <div class="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="inputRemember"></input>
            <label className="form-check-label" for="inputRemember">Remember</label>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default App;
