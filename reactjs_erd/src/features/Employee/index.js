import React from "react";
import { useParams } from "react-router-dom";

export function Employee() {
  const { req, id } = useParams();
  console.log("Employee()", "req", req, "id", id);
  return <>Employee</>;
}
