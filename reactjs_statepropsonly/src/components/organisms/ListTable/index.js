import React, { useContext } from "react";
import {
  AuthDatabaseContext,
  DepartmentDatabaseContext,
} from "../../../providers";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ListTable = ({ ...props }) => {
  const { authDatabase } = useContext(AuthDatabaseContext);
  const { departmentDatabase } = useContext(DepartmentDatabaseContext);
  return (
    <Table responsive>
      <thead>
        <tr>
          {props.match.params.request === "employee" ||
          (props.match.params.id &&
            props.match.params.request === "department") ? (
            <React.Fragment>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Email</th>
            </React.Fragment>
          ) : (
            props.match.params.request === "department" && (
              <React.Fragment>
                <th>#</th>
                <th>Name</th>
              </React.Fragment>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {!props.match.params.id
          ? props.match.params.request === "employee"
            ? authDatabase.map((user, i) => (
                <tr key={user.name + i}>
                  <td>
                    <Link
                      to={`/app/list/${props.match.params.request}/${user.uid}`}
                    >
                      {user.uid}
                    </Link>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            : props.match.params.request === "department" &&
              departmentDatabase.map((department, i) => (
                <tr key={department.username + i}>
                  <td>
                    <Link
                      to={`/app/list/${props.match.params.request}/${department.uid}`}
                    >
                      {department.uid}
                    </Link>
                  </td>
                  <td>{department.username}</td>
                </tr>
              ))
          : authDatabase
              .filter((object) => {
                return (
                  departmentDatabase[props.match.params.id].members.find(
                    (member) => member === object.uid
                  ) !== undefined && true
                );
              })
              .map((user, i) => (
                <tr key={user.name + i}>
                  <td>
                    <Link
                      to={`/app/list/${props.match.params.request}/${user.uid}`}
                    >
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
  );
};
