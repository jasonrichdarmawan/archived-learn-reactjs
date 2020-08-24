import React, { useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { AuthDataContext } from "../../../providers/authdata";

export function List() {
  // TODO async employees data instead of user.
  const user = useContext(AuthDataContext);
  return (
    <div className="d-flex flex-fill">
      <Container className="m-3">
        {user === "first" ? (
          <Spinner animation="grow" role="status" size="sm"></Spinner>
        ) : (
          <p>Table</p>
        )}
      </Container>
    </div>
  );
}