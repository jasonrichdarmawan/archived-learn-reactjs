import React from "react";
import { Container, Spinner } from "react-bootstrap";

export const Loading = () => {
  return (
    <div className="d-flex flex-fill align-items-center">
      <Container className="text-center">
        <Spinner animation="grow" role="status" size="sm"></Spinner>
      </Container>
    </div>
  );
};
