import React, { useContext, useState } from "react";
import { AddTemplate } from "../../components";
import {
  AuthDataContext,
  AuthDatabaseContext,
  RoutesContext,
  DepartmentDatabaseContext,
} from "../../providers";

export const AddPage = (props) => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const { authDatabase, setAuthDatabase } = useContext(AuthDatabaseContext);
  const { departmentDatabase, setDepartmentDatabase } = useContext(
    DepartmentDatabaseContext
  );
  const routes = useContext(RoutesContext);

  // question: which is better? put destructured inputs in organism AddForm or put that here?
  const [inputs, setInputs] = useState({
    uid: authDatabase.length,
    username: "",
    password: "",
    name: "",
    phoneNumber: "",
    email: "",
  });
  const { uid, username, password, name, phoneNumber, email } = inputs;
  const formInputs = [
    { label: "uid", type: "text", value: uid, readOnly: true },
    { label: "username", type: "text", value: username },
    { label: "password", type: "password" },
    { label: "name", type: "text", value: name },
    { label: "phoneNumber", type: "text", value: phoneNumber },
    { label: "email", type: "email", value: email },
  ];
  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const [readOnly, setReadOnly] = useState(false);

  const [errorMessage, setErrorMessage] = useState();
  const [res, setRes] = useState();
  const handleSubmit = (event) => {
    setRes("await");
    setReadOnly(true);
    event.preventDefault();
    event.stopPropagation();

    // TODO: function get() to fetch data.
    const timer = setTimeout(() => {
      const res =
        props.match.params.request === "employee"
          ? authDatabase.find((object) =>
              object.username === username ? true : false
            )
          : props.match.params.request === "department" &&
            departmentDatabase.find((object) =>
              object.username === username ? true : false
            );
      if (!res) {
        setRes(true);
        setReadOnly(true);
        setErrorMessage();

        props.match.params.request === "employee"
          ? setAuthDatabase((authDatabase) => [
              ...authDatabase,
              {
                uid: uid,
                username: username,
                password: password,
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                type: 1,
              },
            ])
          : props.match.params.request === "department" &&
            setDepartmentDatabase((departmentDatabase) => [
              ...departmentDatabase,
              { uid: uid, username: username },
            ]);
      } else {
        setRes(false);
        setReadOnly(false);
        setErrorMessage("The username is taken.");
      }
    }, 2000);
    return () => clearTimeout(timer);
  };

  return (
    <AddTemplate
      {...props}
      routes={routes}
      authData={authData}
      setAuthData={setAuthData}
      authDatabase={authDatabase}
      setAuthDatabase={setAuthDatabase}
      departmentDatabase={departmentDatabase}
      setDepartmentDatabase={setDepartmentDatabase}
      formInputs={formInputs}
      handleChange={handleChange}
      readOnly={readOnly}
      errorMessage={errorMessage}
      res={res}
      handleSubmit={handleSubmit}
    />
  );
};
