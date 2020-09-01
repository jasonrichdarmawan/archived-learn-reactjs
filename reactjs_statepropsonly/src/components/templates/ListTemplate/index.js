import React from "react";
import { NavigationBar, ListTable, EmployeeInformation } from "../../organisms";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// TODO: major refactor, require changing how routes config behaves, reuseable component detected, used in the organism: AddForm
const LinkTo = ({ ...props }) => (
  <Row>
    <Col sm="6">
      <p className="font-weight-bold">List {props.match.params.request}</p>
    </Col>
    <Col sm="6">
      <Button className="float-right" size="sm" variant="outline-primary">
        {props.match.params.request === "employee" ? (
          <Link to="/app/list/department">Department</Link>
        ) : (
          props.match.params.request === "department" && (
            <Link to="/app/list/employee">Employee</Link>
          )
        )}
      </Button>
    </Col>
  </Row>
);

export const ListTemplate = ({ routes, formInputs, ...props }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar routes={routes} />
      <div className="d-flex flex-fill mt-3">
        <Container>
          {/* question: why separating LinkTo into smaller component still cause re-render for the entire page? */}
          <LinkTo {...props} />
          {!props.match.params.id ? (
            <ListTable {...props} />
          ) : props.match.params.request === "employee" ? (
            <EmployeeInformation
              formInputs={formInputs}
              todoRefactorRoutesLogic="list"
            />
          ) : (
            props.match.params.request === "department" && (
              <ListTable {...props} />
            )
          )}
        </Container>
      </div>
    </div>
  );
};
