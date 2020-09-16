import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ResponsiveTable } from "components/ResponsiveTable";

import { selectEmployee, fetchUsersAsync } from "./EmployeeSlice";

export function ListEmployee() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
    ],
    []
  );

  const data = useSelector(selectEmployee);
  console.log("ListEmployee() data", data);

  const dispatch = useDispatch();
  if (Array.isArray(data) && data.length === 0) {
    dispatch(fetchUsersAsync());
    return null;
  }

  return (
    <>
      <h5>List Employee</h5>
      <ResponsiveTable columns={columns} data={data} />
    </>
  );
}
