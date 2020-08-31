import React from "react";
import { Container } from "react-bootstrap";
import { FormAlert } from "../../";

export const LoginTemplate = ({ formInputs, handleChange, handleSubmit, res, errorMessage }) => (
  <div className="min-vh-100 d-flex align-items-center">
    <Container className="w-auto">
      <FormAlert
        formInputs={formInputs}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        res={res}
        errorMessage={errorMessage}
      />
    </Container>
  </div>
);
