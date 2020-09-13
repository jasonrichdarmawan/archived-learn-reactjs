import React from "react";

import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { selectAuthState } from "features/AuthState/AuthStateSlice";

import { TopNavbar } from "components/TopNavbar";
import { ResponsiveTable } from "components/ResponsiveTable";

import { selectEmployee, fetchUsersAsync } from "./EmployeeSlice";

export function Employee() {
  const { req, id } = useParams();
  // console.log("Employee()", "req", req, "id", id);

  const authState = useSelector(selectAuthState);

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
  // console.log("Employee() data", data);

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (req === "list") dispatch(fetchUsersAsync());
  }, []);

  let content = <></>;
  if (req === "list")
    content = (
      <>
        <h5>List Employee</h5>
        <ResponsiveTable columns={columns} data={data} />
      </>
    );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="m-3">{content}</div>
    </div>
  );
}
