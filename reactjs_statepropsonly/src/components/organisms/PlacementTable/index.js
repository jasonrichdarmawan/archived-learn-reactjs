import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Table, Row, Col } from "react-bootstrap";
import {
  DepartmentDatabaseContext,
  AuthDatabaseContext,
} from "../../../providers";
import { Link } from "react-router-dom";

export const PlacementTable = (props) => {
  const { authDatabase } = useContext(AuthDatabaseContext);
  const { departmentDatabase, setDepartmentDatabase } = useContext(
    DepartmentDatabaseContext
  );
  const [checkedUID, setCheckedUID] = useState({});

  useEffect(() => {
    if (props.match.params.id) {
      setCheckedUID(
        departmentDatabase[props.match.params.id].members.reduce((acc, cur) => {
          acc[cur] = true;
          return acc;
        }, {})
      );
    }
  }, []);

  const handleCheckbox = (event) => {
    setCanEdit(true);

    checkedUID[event.target.value]
      ? setCheckedUID({ ...checkedUID, [event.target.value]: false })
      : setCheckedUID({ ...checkedUID, [event.target.value]: true });
  };

  const [canEdit, setCanEdit] = useState(false);
  const [res, setRes] = useState();

  const handleSubmit = () => {
    setCanEdit(false);

    // TODO: function get() to fetch data.
    const timer = setTimeout(() => {
      setCanEdit(true);
      setRes(true);

      setDepartmentDatabase(
        departmentDatabase.map((item, i) =>
          i === parseInt(props.match.params.id)
            ? {
                ...item,
                members: Object.keys(checkedUID).map((uid) => parseInt(uid)),
              }
            : item
        )
      );
    }, 1000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="d-flex flex-fill mt-3">
      <Container>
        {props.match.params.id && (
          <React.Fragment>
            <Row>
              <Col>
                <p className="font-weight-bold">
                  {departmentDatabase[props.match.params.id].username}
                </p>
              </Col>
              <Col>
                <Button
                  className="float-right"
                  size="sm"
                  disabled={canEdit ? false : true}
                  onClick={handleSubmit}
                  variant={res ? "success" : "outline-primary"}
                >
                  {res ? "Success" : "Save"}
                </Button>
              </Col>
            </Row>
            <Table responsive className="mt-3">
              <thead>
                <tr>
                  <th></th>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {authDatabase.map((user, i) => (
                  <tr key={user.name + i}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={user.uid}
                        checked={
                          checkedUID[user.uid] ? checkedUID[user.uid] : false
                        }
                        onChange={handleCheckbox}
                      />
                    </td>
                    <td>
                      <Link to={`/app/list/employee/${user.uid}`}>
                        {user.uid}
                      </Link>
                    </td>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        )}
        {!props.match.params.id && (
          <React.Fragment>
            <p className="font-weight-bold">select the department</p>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {departmentDatabase.map((department, i) => (
                  <tr key={department.username + i}>
                    <td>
                      <Link to={`/app/placement/${department.uid}`}>
                        {department.uid}
                      </Link>
                    </td>
                    <td>{department.username}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        )}
      </Container>
    </div>
  );
};
