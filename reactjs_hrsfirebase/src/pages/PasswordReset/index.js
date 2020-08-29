import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { firebase } from "../../providers";

export const PasswordReset = () => {
  const [inputs, setInputs] = useState({
    email: "",
  });
  const { email } = inputs;
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
        .sendPasswordResetEmail(email)
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

          <Button
            type="submit"
            block
            disabled={loading}
            variant={
              res === undefined ? "primary" : res ? "success" : "warning"
            }
          >
            {res ? "Success" : "Submit"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};
