import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { FormOrganism } from "../../organisms";

export const LoginTemplate = ({ database, setAuthData }) => {
  const [error, setError] = useState();

  const [res, setRes] = useState();

  const forms = [
    {
      controlId: "username",
      label: "username",
      type: "text",
      placeholder: "Enter username",
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
      placeholder: "Enter password",
    },
  ];

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setRes("await");

    setTimeout(() => {
      // TODO: Database. Listener.
      // question: how to make a listener?
      const res = database.find((object, index) =>
        object.username === username
          ? database[index].password === password && true
          : false
      );
      if (res) {
        setRes(true);
        setError();
        setAuthData({ ...res, isAuthorized: true });
      } else if (!res) {
        setRes(false);
        setError("Either username or password is incorrect.");
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        {error && <Alert variant="warning">{error}</Alert>}
        <FormOrganism
          forms={forms}
          res={res}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Container>
    </div>
  );
};
