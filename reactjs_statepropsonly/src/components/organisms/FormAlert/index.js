import React from "react";
import { Alert, Form, Button } from "react-bootstrap";

export const FormAlert = ({
  formInputs,
  handleChange,
  handleSubmit,
  res,
  errorMessage,
}) => {
  return (
    <React.Fragment>
      {errorMessage ? <Alert variant="warning">{errorMessage}</Alert> : null}
      <Form onSubmit={handleSubmit}>
        {formInputs.map((input, i) => (
          <Form.Group controlId={input.label} key={input.label + i}>
            <Form.Label>{input.label}</Form.Label>
            <Form.Control
              type={input.type}
              placeholder={input.label}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
        <Button
          disabled={res === "await" ? true : false}
          variant={
            res === true ? "success" : res === false ? "warning" : "primary"
          }
          type="submit"
        >
          {res === true ? "Success" : res === false ? "Error" : "Submit"}
        </Button>
      </Form>
    </React.Fragment>
  );
};
