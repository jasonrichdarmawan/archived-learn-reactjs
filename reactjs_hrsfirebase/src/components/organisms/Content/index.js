import React from "react";
import { Container, Alert } from "react-bootstrap";

export const Content = (props) => (
  <Container className={props.className}>
    {props.contentJSX}
  </Container>
);