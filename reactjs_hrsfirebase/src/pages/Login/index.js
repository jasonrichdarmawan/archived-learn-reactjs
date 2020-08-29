import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firebase } from "../../providers";

export const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const [validated, setValidated] = useState(false);
  const [res, setRes] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    setLoading(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          setLoading(false);
          setRes(true);
        })
        .catch((error) => {
          setLoading(false);
          setRes(false);
          setErrorMessage(error.message);
        });
    } else setLoading(false);

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto text-center">
        {errorMessage ? (
          <Alert variant="warning">{errorMessage}</Alert>
        ) : undefined}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Control
              required
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>

          <p>
            <Link to="/passwordreset">Forgot Password?</Link>
          </p>

          <Button
            type="submit"
            block
            disabled={loading}
            variant={
              res === undefined ? "primary" : res ? "success" : "warning"
            }
          >
            {res ? "Success" : "Login"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};
