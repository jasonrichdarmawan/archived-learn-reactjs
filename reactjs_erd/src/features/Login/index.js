import React from "react";

import Container from "react-bootstrap/Container";

import { AlertFormButton } from "components/AlertFormButton";

import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthState,
  signInWithEmailAndPassword,
} from "features/AuthState/AuthStateSlice";

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
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const error = authState.error && authState.error.message;
  function handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setLoading(true);

      dispatch(signInWithEmailAndPassword(email, password));
    }
  }

  // console.log('Login()', authState)

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto text-center">
        <AlertFormButton
          formArrObj={formArrObj}
          handleChange={handleChange}
          validated={validated}
          isLoading={isLoading}
          error={error}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
}
