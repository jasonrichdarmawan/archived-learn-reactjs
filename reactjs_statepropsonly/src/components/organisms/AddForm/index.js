import React from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AddForm = ({
  formInputs,
  handleChange,
  errorMessage,
  readOnly,
  res,
  handleSubmit,
  ...props
}) => {
  return (
    <div className="d-flex flex-fill align-items-center">
      <Container>
        {errorMessage && <Alert variant="warning">{errorMessage}</Alert>}
        <Row>
          <Col sm="6">
            <p className="font-weight-bold">Add {props.match.params.request}</p>
          </Col>
          <Col sm="6">
            <Button className="float-right" size="sm" variant="outline-primary">
              {props.match.params.request === "employee" ? (
                <Link to="/app/add/department">Department</Link>
              ) : (
                props.match.params.request === "department" && (
                  <Link to="/app/add/employee">Employee</Link>
                )
              )}
            </Button>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          {props.match.params.request === "employee" ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            props.match.params.request === "department" && (
              <React.Fragment>
                <Form.Row>
                  <Col sm="4">
                    <Form.Group controlId="username">
                      <Form.Label>username</Form.Label>
                      <Form.Control type="text" onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Form.Row>
              </React.Fragment>
            )
          )}
          <Button
            disabled={res === "await" ? true : false}
            variant={res === true ? "success" : "primary"}
            type="submit"
          >
            {res === true ? "Success" : "Submit"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};
