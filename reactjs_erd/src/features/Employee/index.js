import React from "react";

import { useParams } from "react-router-dom";

import { ListEmployee } from "./ListEmployee";
import { AddEmployee } from "./AddEmployee";

import { useSelector } from "react-redux";

import { selectAuthState } from "features/AuthState/AuthStateSlice";

import { TopNavbar } from "components/TopNavbar";

export function Employee() {
  const { req, id } = useParams();
  console.log("Employee()", "req", req, "id", id);

  let content = <></>;
  if (req === "list") content = <ListEmployee />;
  else if (req === "view" && id !== undefined)
    content = <h5>TODO: View Employee</h5>;
  else if (req === "add") content = <AddEmployee />;

  const authState = useSelector(selectAuthState);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="m-3">{content}</div>
    </div>
  );
}
