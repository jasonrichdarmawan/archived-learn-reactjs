import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Loading } from "components/Loading";

export function AlertFormButton({
  formArrObj,
  handleChange,
  validated,
  isLoading,
  error,
  handleSubmit,
}) {
  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {formArrObj.map((obj, i) => (
          <Form.Group key={obj.controlId + i} controlId={obj.controlId}>
            <Form.Control
              required
              type={obj.type}
              placeholder={obj.placeholder}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {obj.feedback}
            </Form.Control.Feedback>
          </Form.Group>
        ))}

        <Button
          type="submit"
          block
          size="sm"
          disabled={isLoading}
          variant={error ? "warning" : "primary"}
        >
          {isLoading ? <Loading /> : "Submit"}
        </Button>
      </Form>
    </>
  );
}
