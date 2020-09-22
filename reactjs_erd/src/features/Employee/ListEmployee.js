import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ResponsiveTable } from "components/ResponsiveTable";

import { selectEmployee, fetchUsersAsync } from "./EmployeeSlice";
import { Loading } from "components";

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

  const { isLoading, data } = useSelector(selectEmployee);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (Array.isArray(data) && data.length === 0) {
      dispatch(fetchUsersAsync());
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h5>List Employee</h5>
      <ResponsiveTable columns={columns} data={data} />
    </>
  );
}
