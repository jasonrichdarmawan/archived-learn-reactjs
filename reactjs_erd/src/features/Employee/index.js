import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectAuthState } from "features/AuthState/AuthStateSlice";

import { TopNavbar } from "components/TopNavbar";

import { ListEmployee } from "./ListEmployee";
import { AddEmployee } from "./AddEmployee";

export function Employee() {
  const { req, id } = useParams();
  console.log("Employee()", "req", req, "id", id);

  const authState = useSelector(selectAuthState);

  let content = <></>;
  if (req === "list")
    content = (
      <>
        <ListEmployee />
      </>
    );
  else if (req === "add")
    content = (
      <>
        <AddEmployee />
      </>
    );
  else if (req === "view")
    content = (
      <>
        <h5>TODO: View Employee</h5>
      </>
    );

  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="m-3">{content}</div>
    </div>
  );
}
