import React, { useState } from "react";
import { TopNavbarMiddleContent } from "../../components";
import { displayRouteMenu, routes } from "../../routes";
import { Route } from "react-router-dom";
import { Container, Form, Button, Col, Alert } from "react-bootstrap";
import { firebase } from "../../providers";

const useContentJSX = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    displayName: "",
    phoneNumber: "",
  });
  const { email, password, displayName, phoneNumber } = inputs;
  const handleChange = (event) => {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  };

  const [file, setFile] = useState();
  const handleFile = (event) => setFile(event.target.files[0]);

  const [validated, setValidated] = useState(false);
  const [res, setRes] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    setLoading(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const createUser = firebase
        .app()
        .functions("asia-southeast2")
        .httpsCallable("createUser");

      createUser({
        email: email,
        password: password,
        displayName: displayName,
      })
        .then(({ data: user }) => {
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              type: 1,
              email: email,
              displayName: displayName,
              phoneNumber: phoneNumber,
            })
            .catch((error) => {
              setLoading(false);
              setRes(false);
              setErrorMessage(error.message);
            });

          firebase.storage().ref(`/users/${user.uid}/${file.name}`).put(file);
        })
        .then(setRes(true))
        .catch((error) => {
          setLoading(false);
          setRes(false);
          setErrorMessage(error.message);
        });
    } else setLoading(false);

    event.preventDefault();
    event.stopPropagation();

    setValidated(true);
  };

  if (props.match.params.request === "employee") {
    return (
      <Container className="mt-3 w-auto">
        {errorMessage ? (
          <Alert className="mt-3" variant="warning">
            {errorMessage}
          </Alert>
        ) : null}
        <p className="font-weight-bold">Add Employee</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="email">
              <Form.Label>Employee's Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="password">
              <Form.Label>Employee's Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="4" controlId="displayName">
              <Form.Label>Employee's Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="phoneNumber">
              <Form.Label>Employee's Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Phone Number"
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="cv">
              <Form.File id="cv">
                <Form.File.Label>Employee's Curriculum Vitae</Form.File.Label>
                <Form.File.Input required onChange={handleFile} />
                <Form.Control.Feedback type="invalid">
                  Please provide employee's CV
                </Form.Control.Feedback>
              </Form.File>
            </Form.Group>
          </Form.Row>
          <Button
            block
            disabled={loading}
            variant={res == null ? "primary" : res ? "success" : "warning"}
            onClick={handleSubmit}
          >
            {res ? "Success" : "Register"}
          </Button>
        </Form>
      </Container>
    );
  } else if (props.match.params.request === "department") {
    return "Add Page Department";
  } else return <Route component={() => <h1>Not Found!</h1>} />;
};

export const AddPage = (props) => {
  return (
    <TopNavbarMiddleContent
      routesJSX={displayRouteMenu(routes)}
      contentJSX={useContentJSX(props)}
    />
  );
};
