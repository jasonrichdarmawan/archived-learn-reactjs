import React from 'react';
import logo from '../../logo.svg';

class LoginForm extends React.Component {
    render() {
        return (
            <div className="min-vh-100 d-flex align-items-center">
            <div className="container w-25 text-center">
              <form>
                <img className="mb-3" src={logo} alt=""/>
                <div className="form-group">
                  <input type="email" className="form-control" id="inputEmail" placeholder="Email address"></input>
                  <input type="password" className="form-control" id="inputPassword" placeholder="Password"></input>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" className="form-check-input" id="inputRemember"></input>
                  <label className="form-check-label" htmlFor="inputRemember">Remember</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
              </form>
            </div>
          </div>
        );
    }
}

export default LoginForm;