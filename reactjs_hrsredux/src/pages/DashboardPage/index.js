import React, { useState } from "react";
import {
  NavbarOrganism,
  EmployeeInformationOrganism,
} from "../../components/Organisms";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserDatabase,
  updateUserWithUID,
} from "../../providers/userDatabaseSlice";

export const DashboardTemplate = ({ authData }) => {
  const [readOnly, setReadOnly] = useState(true);
  const handleButton = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRes();
    readOnly ? setReadOnly(false) : setReadOnly(true);
  };

  const [inputs, setInputs] = useState({
    uid: authData.uid,
    email: authData.email,
    password: "",
    displayName: authData.displayName,
    phoneNumber: authData.phoneNumber,
  });
  const { uid, email, password, displayName, phoneNumber } = inputs;
  const formsMap = [
    {
      controlId: "uid",
      label: "uid",
      type: "text",
      value: uid,
      readOnly: true,
    },
    {
      controlId: "email",
      label: "email",
      type: "email",
      value: email,
      readOnly: true,
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
    },
    {
      controlId: "displayName",
      label: "name",
      type: "text",
      value: displayName,
    },
    {
      controlId: "phoneNumber",
      label: "phone number",
      type: "text",
      value: phoneNumber,
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
      // question: can a reducer return specific value while also changing the state?
      const res = database.find(
        (user) => user.email === email && user.password === password && true
      );

      if (res !== undefined) {
        setRes(true);
        setReadOnly(true);
        setError();

        dispatch(updateUserWithUID({ ...inputs }));
      } else if (res === undefined) {
        setRes(false);
        setError("Either username or password is incorrect.");
      }
    }, 1000);
  };

  return (
    <EmployeeInformationOrganism
      authData={authData}
      formsMap={formsMap}
      readOnly={readOnly}
      handleButton={handleButton}
      handleChange={handleChange}
      res={res}
      error={error}
      handleSubmit={handleSubmit}
    />
  );
};

export const DashboardPage = ({ authData, routesConfig }) => {
  // console.log("dashboardPage", routesConfig);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism authData={authData} routesConfig={routesConfig} />
      <DashboardTemplate authData={authData} />
    </div>
  );
};
