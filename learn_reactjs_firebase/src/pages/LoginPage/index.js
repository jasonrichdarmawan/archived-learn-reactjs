import React from "react";
import { Container } from "react-bootstrap";
import { FormGroupsOrganism } from "components/organisms/FormGroupsOrganism";
import firebase from "api/firebase";

function LoginTemplate() {
  const formsMap = [
    {
      controlId: "email",
      label: "email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
      placeholder: "password",
    },
  ];

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const handleChange = (event) =>
    setInputs({ ...inputs, [event.target.id]: event.target.value });

  const [res, setRes] = React.useState();
  const [error, setError] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRes("await");

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setRes(true);
        setError();
      })
      .catch((error) => {
        setRes(false);
        setError(error);
      });
  };

  return (
    <FormGroupsOrganism
      formsMap={formsMap}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      res={res}
      error={error}
    />
  );
}

export function LoginPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        <LoginTemplate />
      </Container>
    </div>
  );
}
