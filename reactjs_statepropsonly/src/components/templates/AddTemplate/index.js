import React, { useState } from "react";
import { NavigationBar } from "../../organisms";

import { Container, Alert } from "react-bootstrap";

export const AddTemplate = ({ routes, authData, setAuthData }) => {

  const [errorMessage, setErrorMessage] = useState();

  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar
        routes={routes}
        authData={authData}
        setAuthData={setAuthData}
      />
      <div className="d-flex flex-fill align-items-center">
        <Container>
          {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
        </Container>
      </div>
    </div>
  );
};
