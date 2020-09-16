import React from "react";

import Table from "react-bootstrap/Table";

export function ResponsiveTable({ columns, data }) {
  // console.log('ResponsiveTable()', columns);
  return (
    <Table responsive className="mt-3" size="sm" striped bordered hover>
      <thead>
        <tr>
          {columns.map((column, i) => (
            <th key={"th" + column.accessor + i}>{column.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((col, index) => (
              <td key={"td" + col.accessor + index}>
                {item.data[col.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
