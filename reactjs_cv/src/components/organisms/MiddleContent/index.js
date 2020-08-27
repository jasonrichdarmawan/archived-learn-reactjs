import React from "react";
import { Container } from "react-bootstrap";

export const MiddleContent = (props) => (
  <Container className="mt-3">
    {props.contentJSX}
  </Container>
);