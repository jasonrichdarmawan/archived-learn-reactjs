import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TableOrganism = ({ database }) => {
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Student's UID</th>
          <th>Student's Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {database.map((object) => (
          <tr key={object.displayName}>
            <td>{object.uid}</td>
            <td>{object.displayName}</td>
            <td>
              <Link to={"/app/edit/" + object.uid}>
                <Button size="sm" variant="outline-primary">
                  Edit
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
