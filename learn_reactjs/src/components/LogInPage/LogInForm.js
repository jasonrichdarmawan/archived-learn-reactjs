import React from 'react';
import Logo from '../../logo.svg';

class LogInForm extends React.Component {
  render() {
    // TODO: research safe way to generate Authorization token.
    function generateToken() {
      localStorage.Authorization = "Bearer " + Math.random().toString(36).substr(2);
    }
    
    return (
      <div className="min-vh-100 d-flex align-items-center">
        <div className="container w-25 text-center">
          <form>
            <img className="mb-3" src={Logo} alt=""/>
            <div className="form-group">
              <input type="email" className="form-control" id="inputEmail" placeholder="Email address"></input>
              <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
            </div>
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="inputRemember"></input>
              <label className="form-check-label" htmlFor="inputRemember">Remember</label>
            </div>
            <button type="submit" className="btn btn-primary btn-block" onClick={generateToken}>Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LogInForm;