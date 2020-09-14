import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { Loading } from "components/Loading";

export function AlertFormButton({
  formArrObj,
  extraSelect,
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

        {extraSelect &&
          extraSelect.map((select, i) => (
            <Form.Group key={select.controlId + i} controlId={select.controlId}>
              <Form.Label>{select.label}</Form.Label>
              <Form.Control as="select" custom onChange={handleChange}>
                <option></option>
                {select.options.map((option, i) => (
                  <option key={option.label + i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          ))}

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
