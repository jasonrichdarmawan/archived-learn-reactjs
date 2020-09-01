import React, { useState, useContext } from "react";
import { AuthDatabaseContext, AuthDataContext } from "../../providers";
import { LoginTemplate } from "../../components";

export const Login = () => {
  const { authDatabase } = useContext(AuthDatabaseContext);
  const { setAuthData } = useContext(AuthDataContext);

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

    // TODO: function get() to fetch data.
    const timer = setTimeout(() => {
      const res = authDatabase.find((object, index) =>
        object.username === username
          ? authDatabase[index].password === password && true
          : false
      );
      if (res) {
        setRes(true);
        setErrorMessage();

        setAuthData({ ...res, isAuthorized: true });
      } else {
        setRes(false);
        setErrorMessage("Either username or password is incorrect");
      }
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <LoginTemplate
      formInputs={formInputs}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      res={res}
      errorMessage={errorMessage}
    />
  );
};
