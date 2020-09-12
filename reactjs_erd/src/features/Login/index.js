import React from "react";
import { Container } from "react-bootstrap";
import { AlertFormButton } from "components/AlertFormButton";

export function Login() {
  const formArrObj = [
    {
      controlId: "email",
      type: "email",
      placeholder: "Enter email",
      feedback: "Please provide a valid email.",
    },
    {
      controlId: "password",
      type: "password",
      placeholder: "Enter password",
      feedback: "Please provide a valid password.",
    },
  ];
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  }

  const { email, password } = inputs;
  const [validated, setValidated] = React.useState();
  const [isLoading, setLoading] = React.useState();
  const [response, setResponse] = React.useState();
  const [error, setError] = React.useState();
  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setLoading(true);
      // TODO
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto text-center">
        <AlertFormButton
          formArrObj={formArrObj}
          handleChange={handleChange}
          validated={validated}
          isLoading={isLoading}
          response={response}
          error={error}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
}
