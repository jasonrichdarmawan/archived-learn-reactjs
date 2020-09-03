import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { NavBarOrganism, FormOrganism, TableOrganism } from "../../organisms";

import { useSelector, useDispatch } from "react-redux";
import { selectAuthData, logout } from "../../../providers/AuthDataSlice";

export const EditTemplate = ({
  // authData,
  // setAuthData,
  database,
  setDatabase,
  props,
}) => {
  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();
  const setAuthData = () => dispatch(logout());

  const [inputs, setInputs] = useState({
    profileUrl: props.match.params.id
      ? database[props.match.params.id].profileUrl
      : "",
    displayName: props.match.params.id
      ? database[props.match.params.id].displayName
      : "",
    quotes: props.match.params.id ? database[props.match.params.id].quotes : "",
    githubUrl: props.match.params.id
      ? database[props.match.params.id].githubUrl
      : "",
  });

  const [res, setRes] = useState();

  if (!props.match.params.id) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <NavBarOrganism authData={authData} setAuthData={setAuthData} />
        <Container className="w-auto mt-3">
          <TableOrganism database={database} />
        </Container>
      </div>
    );
  } else if (props.match.params.id) {
    const { profileUrl, displayName, quotes, githubUrl } = inputs;

    const forms = [
      {
        controlId: "profileUrl",
        label: "Profile Url",
        type: "text",
        value: profileUrl,
      },
      {
        controlId: "displayName",
        label: "Name",
        type: "text",
        value: displayName,
      },
      {
        controlId: "quotes",
        label: "Quotes",
        type: "text",
        value: quotes,
      },
      {
        controlId: "githubUrl",
        label: "Github Url",
        type: "text",
        value: githubUrl,
      },
    ];

    const handleChange = (event) => {
      const { id, value } = event.target;
      setInputs({ ...inputs, [id]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      event.stopPropagation();
      setRes("await");

      setTimeout(() => {
        setRes(true);

        setDatabase(
          database.map((object) =>
            object.uid === parseInt(props.match.params.id)
              ? { ...object, ...inputs }
              : object
          )
        );
      }, 1000);
    };

    return (
      <div className="min-vh-100 d-flex flex-column">
        <NavBarOrganism authData={authData} setAuthData={setAuthData} />
        <Container className="w-auto mt-3">
          <FormOrganism
            forms={forms}
            res={res}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </Container>
      </div>
    );
  }
};
