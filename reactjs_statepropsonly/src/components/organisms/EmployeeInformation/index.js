import React from "react";
import { Container, Form, Col, Button, Alert } from "react-bootstrap";

export const EmployeeInformation = ({
  formInputs,
  handleChange,
  handleButton,
  readOnly,
  handleSubmit,
  res,
  errorMessage,
}) => {
  return (
    <div className="d-flex flex-fill align-items-center">
      <Container>
        {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
        <Form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              {readOnly ? (
                <div
                  className="float-right btn btn-outline-primary btn-sm"
                  onClick={handleButton}
                >
                  Edit
                </div>
              ) : (
                <Button
                  className="float-right"
                  type="submit"
                  size="sm"
                  disabled={res === "await" ? true : false}
                  variant={res === true ? "success" : "primary"}
                >
                  {res === true ? "Success" : "Submit"}
                </Button>
              )}
            </div>
          </div>
          <Form.Row>
            {formInputs.map(
              (input, i) =>
                i < 3 && (
                  <Form.Group
                    as={Col}
                    controlId={input.label}
                    key={input.label + i}
                  >
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      value={input.value}
                      readOnly={input.readOnly ? true : readOnly}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )
            )}
          </Form.Row>
          <Form.Row>
            {formInputs.map(
              (input, i) =>
                i >= 3 && (
                  <Form.Group
                    as={Col}
                    controlId={input.label}
                    key={input.label + i}
                  >
                    <Form.Label>{input.label}</Form.Label>
                    <Form.Control
                      type={input.type}
                      value={input.value}
                      readOnly={input.readOnly ? true : readOnly}
                      onChange={handleChange}
                    />
                  </Form.Group>
                )
            )}
          </Form.Row>
        </Form>
      </Container>
    </div>
  );
};
