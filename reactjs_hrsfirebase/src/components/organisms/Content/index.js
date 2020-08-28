import React from "react";
import { Container } from "react-bootstrap";

export const Content = (props) => (
  <Container className="mt-3">
    {props.contentJSX}
  </Container>
);