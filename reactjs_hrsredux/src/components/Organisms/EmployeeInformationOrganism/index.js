import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

export const EmployeeInformationOrganism = ({
  authData,
  formsMap,
  readOnly,
  handleButton,
  handleChange,
  res,
  error,
  handleSubmit,
}) => {
  return (
    <div className="d-flex flex-fill align-items-center">
      <div className="container">
        {error && <Alert variant="warning">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {authData.access === 0 && (
            <div className="row">
              <div className="col">
                <Button
                  type={readOnly ? "button" : "submit"}
                  className="float-right"
                  size="sm"
                  variant="outline-primary"
                  disabled={readOnly ? false : res === "await" ? true : false}
                  onClick={readOnly ? handleButton : undefined}
                >
                  {readOnly ? "Edit" : "Save"}
                </Button>
              </div>
            </div>
          )}
          {formsMap.map((form) => (
            <Form.Group controlId={form.controlId} key={form.controlId}>
              <Form.Label>{form.label}</Form.Label>
              <Form.Control
                required
                type={form.type}
                value={form.value}
                readOnly={form.readOnly ? true : readOnly}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </div>
    </div>
  );
};
