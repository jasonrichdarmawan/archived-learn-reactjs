import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../providers/authDataSlice";
import { selectUserDatabase } from "../../providers/userDatabaseSlice";
import { FormGroupsOrganism } from "../../components/Organisms/FormGroupsOrganism";

export const LoginTemplate = () => {
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

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  const handleChange = (event) =>
    setInputs({ ...inputs, [event.target.id]: event.target.value });

  const [res, setRes] = useState();
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const database = useSelector(selectUserDatabase);
  // question: how to use extraReducers?
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRes("await");

    setTimeout(() => {
      // question: how login really works in Redux?
      // Does handleSubmit do the heavy lifting and then simply just pass the API response
      // or does Redux is the one who does the heavylifting?
      // dispatch(loginAsync({ email, password, database }));
      const res = database.find(
        (user) => user.email === email && user.password === password && true
      );
      if (res !== undefined) {
        setRes(true);
        setError();

        // only pass response to state authData.
        dispatch(login(res));
      } else if (res === undefined) {
        setRes(false);
        setError("Either email or password is incorrect.");
      }
    }, 1000);
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
};

export const LoginPage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        <LoginTemplate />
      </Container>
    </div>
  );
};
