import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Loading } from "components/Loading";

export function AlertFormButton({
  data,
  handleChange,
  validated,
  isLoading,
  res,
  error,
  handleSubmit,
}) {
  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {data.map((obj, i) => {
          if (obj.type === "form") {
            return (
              <Form.Group key={obj.data.controlId + i} controlId={obj.data.controlId}>
                <Form.Control
                  required
                  type={obj.data.type}
                  placeholder={obj.data.placeholder}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {obj.data.feedback}
                </Form.Control.Feedback>
              </Form.Group>
            );
          } else if (obj.type === "select") {
            return (
              <Form.Group
                key={obj.data.controlId + i}
                controlId={obj.data.controlId}
              >
                <Form.Label>{obj.data.label}</Form.Label>
                <Form.Control as="select" custom onChange={handleChange}>
                  <option></option>
                  {obj.data.options.map((option, i) => (
                    <option key={option.label + i} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            );
          } else return null;
        })}

        <Button
          type="submit"
          block
          size="sm"
          disabled={isLoading}
          variant={error ? "warning" : res === true ? "success" : "primary"}
        >
          {isLoading ? <Loading /> : res === true ? "Success" : "Submit"}
        </Button>
      </Form>
    </>
  );
}
