import React, { useState } from "react";
import { NavbarOrganism, FormGroupsOrganism } from "../../components/Organisms";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserDatabase,
  createUserWithEmailPasswordAndDisplayName,
} from "../../providers/userDatabaseSlice";

export const AddTemplate = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });
  const { email } = inputs;
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
    {
      controlId: "displayName",
      label: "name",
      type: "text",
      placeholder: "Enter name",
    },
    {
      controlId: "phoneNumber",
      label: "phone number",
      type: "text",
      placeholder: "Enter phone number",
    },
  ];
  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const database = useSelector(selectUserDatabase);
  const dispatch = useDispatch();
  const [res, setRes] = useState();
  const [error, setError] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRes("await");

    setTimeout(() => {
      const res = database.find((user) => user.email === email && true);

      console.log(res);
      if (res === undefined) {
        setRes(true);
        setError();

        dispatch(
          createUserWithEmailPasswordAndDisplayName({
            uid: database.length,
            ...inputs,
            access: 1,
          })
        );
      } else if (res !== undefined) {
        setRes(false);
        setError("Email is taken.");
      }
    }, 1000);
  };

  console.log(database);

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

export const AddPage = ({ authData, routesConfig }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism authData={authData} routesConfig={routesConfig} />
      <div className="d-flex flex-fill align-items-center">
        <div className="container w-auto">
          <AddTemplate />
        </div>
      </div>
    </div>
  );
};
