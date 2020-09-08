import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

export function FormGroupsOrganism({
  formsMap,
  handleChange,
  handleSubmit,
  res,
  error,
}) {
  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {formsMap.map((form) => (
          <Form.Group key={form.controlId} controlId={form.controlId}>
            <Form.Label>{form.label}</Form.Label>
            <Form.Control
              required
              type={form.type}
              placeholder={form.placeholder}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
        <Button
          type="submit"
          size="sm"
          variant={res === true ? "success" : "primary"}
          disabled={res === "await" ? true : false}
        >
          {res === true ? "Success" : "Submit"}
        </Button>
      </Form>
    </>
  );
}
