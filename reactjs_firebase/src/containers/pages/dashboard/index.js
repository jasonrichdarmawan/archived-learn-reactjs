import React, { useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { AuthDataContext } from "../../../providers/authdata";

export function Dashboard() {
  // question: what is the difference between useContext(Context) vs Context.Consumer which require function component ?
  const user = useContext(AuthDataContext);
  return (
    // <AuthDataContext.Consumer>
    // {(user) => (
    <div className="d-flex flex-fill align-items-center">
      <Container className="text-center">
        {user === "first" ? (
          <Spinner animation="grow" role="status" size="sm"></Spinner>
        ) : (
          <p>Hello, {user.email}</p>
        )}
      </Container>
    </div>
    // )}
    // </AuthDataContext.Consumer>
  );
}
