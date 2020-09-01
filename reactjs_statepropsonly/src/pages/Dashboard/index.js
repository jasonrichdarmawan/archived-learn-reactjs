import React, { useContext, useState } from "react";
import { DashboardTemplate } from "../../components";
import {
  AuthDataContext,
  AuthDatabaseContext,
  RoutesContext,
} from "../../providers";

export const DashboardPage = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const { authDatabase, setAuthDatabase } = useContext(AuthDatabaseContext);
  const routes = useContext(RoutesContext);

  const [inputs, setInputs] = useState({
    uid: authData.uid,
    username: authData.username,
    password: "",
    name: authData.name,
    phoneNumber: authData.phoneNumber,
    email: authData.email,
  });
  const { uid, username, password, name, phoneNumber, email } = inputs;
  const formInputs = [
    { label: "uid", type: "text", value: uid, readOnly: true },
    { label: "username", type: "text", value: username, readOnly: true },
    { label: "password", type: "password" },
    { label: "name", type: "text", value: name },
    { label: "phoneNumber", type: "text", value: phoneNumber },
    { label: "email", type: "email", value: email },
  ];
  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const [readOnly, setReadOnly] = useState(true);
  const handleButton = () => {
    readOnly ? setReadOnly(false) : setReadOnly(true);
  };

  const [errorMessage, setErrorMessage] = useState();
  const [res, setRes] = useState();
  const handleSubmit = (event) => {
    setRes("await");
    event.preventDefault();
    event.stopPropagation();

    // TODO: function get() to fetch data.
    const timer = setTimeout(() => {
      let index;
      const res = authDatabase.find((object, i) =>
        object.username === username
          ? authDatabase[i].password === password && ((index = i), true)
          : false
      );
      if (res) {
        setRes(true);
        setErrorMessage();

        setAuthDatabase(
          authDatabase.map((item, i) =>
            i === index
              ? { ...item, name: name, email: email, phoneNumber: phoneNumber }
              : item
          )
        );
        setAuthData({
          ...authData,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
        });
      } else {
        setRes(false);
        setErrorMessage("Either username or password is incorrect");
      }
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <DashboardTemplate
      routes={routes}
      authData={authData}
      setAuthData={setAuthData}

      formInputs={formInputs}
      handleChange={handleChange}
      handleButton={handleButton}
      readOnly={readOnly}
      handleSubmit={handleSubmit}
      res={res}
      errorMessage={errorMessage}
    />
  );
};
