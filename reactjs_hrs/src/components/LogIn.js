import React from "react";
import logo from "../logo.svg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LogIn extends React.Component {
  state = {
    email: "",
    password: "",
  };
  auth = (ev) => {
    ev.preventDefault();
  };

  handleChange = (ev) => {
    this.setState({
      [ev.target.type]: ev.target.value,
    });
  };

  render() {
    return (
      <div className="min-vh-100 d-flex align-items-center">
        <div className="container w-auto text-center">
          <img src={logo} alt="" />
          <Form>
            <Form.Group controlId="loginEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              {/* question: is it safe? */}
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="inputRemember">
              <Form.Check type="checkbox" label="Remember" />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              size="sm"
              block
              onClick={this.auth}
            >
              Log In
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default LogIn;
