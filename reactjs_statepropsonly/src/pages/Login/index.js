import React, { useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { FormAlert } from "../../components";
import { AuthDatabaseContext, AuthDataContext } from "../../providers";

export const Login = () => {
  const { authDatabase } = useContext(AuthDatabaseContext);
  const { authData, setAuthData } = useContext(AuthDataContext);

  const formInputs = [
    { label: "username", type: "text" },
    { label: "password", type: "password" },
  ];

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputs;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const [errorMessage, setErrorMessage] = useState();

  const [res, setRes] = useState();

  const handleSubmit = (event) => {
    setRes("await");
    event.preventDefault();
    event.stopPropagation();

    const timer = setTimeout(() => {
      const res = authDatabase.find((object, index) =>
        object.username === username
          ? authDatabase[index].password === password && true
          : false
      );
      if (res) {
        setRes(true);
        setAuthData({ ...authData, res: true });
      } else {
        setRes(false);
        setErrorMessage("Either username or password is incorrect");
      }
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        <FormAlert
          formInputs={formInputs}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          res={res}
          errorMessage={errorMessage}
        />
      </Container>
    </div>
  );
};
