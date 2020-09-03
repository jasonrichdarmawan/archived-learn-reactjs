import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { NavBarOrganism, FormOrganism } from "../../organisms";

import { useSelector, useDispatch } from "react-redux";
import { selectAuthData } from "../../../providers/AuthDataSlice";

import { logout } from "../../../providers/AuthDataSlice";

export const AddTemplate = ({
  // authData,
  // setAuthData,
  database,
  setDatabase,
}) => {
  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const setAuthData = () => dispatch(logout());

  const [error, setError] = useState();

  const [res, setRes] = useState();

  const forms = [
    {
      controlId: "username",
      label: "username",
      type: "text",
      placeholder: "Enter username for the student",
    },
    {
      controlId: "password",
      label: "password",
      type: "password",
      placeholder: "Enter password for the student",
    },
    {
      controlId: "profileUrl",
      label: "Profile Url",
      type: "text",
      placeholder: "Enter student's profile Url",
    },
    {
      controlId: "displayName",
      label: "Name",
      type: "text",
      placeholder: "Enter student's name",
    },
    {
      controlId: "quotes",
      label: "Quotes",
      type: "text",
      placeholder: "Enter the student's quotes",
    },
    {
      controlId: "githubUrl",
      label: "Github Url",
      type: "text",
      placeholder: "Enter the student's Github Url",
    },
  ];

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    profileUrl: "",
    displayName: "",
    quotes: "",
    githubUrl: "",
  });

  const { username } = inputs;

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setRes("await");

    setTimeout(() => {
      const res = database.find((object) =>
        object.username === username ? true : false
      );
      if (!res) {
        setRes(true);
        setError();

        setDatabase((database) => [
          ...database,
          { uid: database.length, type: 1, ...inputs },
        ]);
      } else if (res) {
        setRes(false);
        setError("Username is taken.");
      }
    }, 1000);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavBarOrganism authData={authData} setAuthData={setAuthData} />
      <Container className="w-auto mt-3">
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
