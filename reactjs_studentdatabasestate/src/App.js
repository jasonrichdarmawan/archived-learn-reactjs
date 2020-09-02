import React, { useState, useContext } from "react";
import { Redirect, Switch, Route, Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Alert,
  Navbar,
  Nav,
  Row,
  Col,
  Table,
} from "react-bootstrap";

import {
  DatabaseProvider,
  DatabaseContext,
  AuthDataProvider,
  AuthDataContext,
} from "./providers";
import { RenderRoutes } from "./utils";

// TEMP
import { FormOrganism, NavBarOrganism } from "./components";
import { ArraySplicer } from "./utils"

export const AddTemplate = ({
  authData,
  setAuthData,
  database,
  setDatabase,
}) => {
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

    const timer = setTimeout(() => {
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

export const AddPage = () => {
  const { database, setDatabase } = useContext(DatabaseContext);
  const { authData, setAuthData } = useContext(AuthDataContext);
  return (
    <AddTemplate
      authData={authData}
      setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
    />
  );
};

export const TableOrganism = ({ database }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Student's UID</th>
          <th>Student's Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {database.map((object) => (
          <tr key={object.displayName}>
            <td>{object.uid}</td>
            <td>{object.displayName}</td>
            <td>
              <Link to={"/app/edit/" + object.uid}>
                <Button size="sm" variant="outline-primary">
                  Edit
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export const EditTemplate = ({
  authData,
  setAuthData,
  database,
  setDatabase,
  props,
}) => {
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

  console.log(inputs);

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

      const timer = setTimeout(() => {
        setRes(true);

        setDatabase(
          database.map((object) =>
            object.uid == props.match.params.id
              ? { ...object, ...inputs }
              : object
          )
        );

        setAuthData();
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

export const EditPage = (props) => {
  const { authData, setAuthData } = useContext(AuthDataContext);
  const { database, setDatabase } = useContext(DatabaseContext);
  return (
    <EditTemplate
      authData={authData}
      setAuthData={setAuthData}
      database={database}
      setDatabase={setDatabase}
      props={props}
    />
  );
};

function App() {
  return (
    <DatabaseProvider>
      <AuthDataProvider>
        <RenderRoutes />
      </AuthDataProvider>
    </DatabaseProvider>
  );
}

export default App;
