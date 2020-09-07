import React from "react";
import { Container } from "react-bootstrap";
import { FormGroupsOrganism } from "components/organisms/FormGroupsOrganism";
import firebase from "api/firebase";

function RegisterTemplate() {
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
      controlId: "profileUrl",
      label: "profile url",
      type: "text",
      placeholder: "profile url",
    },
    {
      controlId: "displayName",
      label: "name",
      type: "text",
      placeholder: "name",
    },
    {
      controlId: "quotes",
      label: "quotes",
      type: "type",
      placeholder: "quotes",
    },
    {
      controlId: "githubUrl",
      label: "github url",
      type: "text",
      placeholder: "github url",
    },
  ];

  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
    profileUrl: "",
    displayName: "",
    quotes: "",
    githubUrl: "",
  });
  const {
    email,
    password,
    profileUrl,
    displayName,
    quotes,
    githubUrl,
  } = inputs;
  const handleChange = (event) =>
    setInputs({ ...inputs, [event.target.id]: event.target.value });

  const [res, setRes] = React.useState();
  const [error, setError] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRes("await");

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user
          .updateProfile({
            displayName: displayName,
            profileUrl: profileUrl,
          })
          .then(() => {
            let db = firebase.firestore();
            db.collection("users")
              .doc(res.user.uid)
              .set({
                access: 1,
                email: email,
                profileUrl: profileUrl,
                displayName: displayName,
                quotes: quotes,
                githubUrl: githubUrl,
              })
              .then()
              .catch((error) => {
                setRes(false);
                setError(error.message);
              });
          })
          .catch((error) => {
            setRes(false);
            setError(error.message);
          });

        setRes(true);
      })
      .catch((error) => {
        setRes(false);
        setError(error.message);
      });
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
}

export function RegisterPage() {
  return (
    <div className="min-vh-100 d-flex align-items-center">
      <Container className="w-auto">
        <RegisterTemplate />
      </Container>
    </div>
  );
}
