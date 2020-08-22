import React, { useState } from "react";
import { Container, Alert, Image, Form, Button } from "react-bootstrap";
import logo from "../../../logo.svg";
import firebase from "../../../config/firebase";

export function Register() {
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

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((_) => setRes(true))
        .catch((error) => {
          setRes(false);
          setErrorMessage(error.message);
        });
    }

    setValidated(true);
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto text-center">
        {errorMessage == null ? (
          <Image src={logo} alt="" />
        ) : (
          <Alert variant="warning">{errorMessage}</Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            {/* question: is it safe? */}
            <Form.Control
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            block
            disabled={res}
            variant={res == null ? "primary" : res ? "success" : "warning"}
          >
            {res ? "Success" : "Register"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}
