import React from "react";
import { Container } from "react-bootstrap";

export const EmployeeInformation = ({ authData }) => { console.log(authData);return (
  <div className="d-flex flex-fill align-items-center">
    <Container className="text-center">Hello, {authData.displayName}</Container>
  </div>
);}
