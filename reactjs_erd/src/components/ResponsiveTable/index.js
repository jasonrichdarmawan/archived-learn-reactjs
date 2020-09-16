import React from "react";

import Table from "react-bootstrap/Table";

export function ResponsiveTable({ columns, data }) {
  // console.log('ResponsiveTable()', columns);
  return (
    <Table responsive className="mt-3" size="sm" striped bordered hover>
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={column.accessor + i}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.data.name}</td>
            <td>{user.data.email}</td>
            <td>{user.data.phone}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
