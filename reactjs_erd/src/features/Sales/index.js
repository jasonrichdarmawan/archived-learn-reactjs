import React from "react";
import { useParams } from "react-router-dom";

export function Sales() {
  const { submodule, req, id } = useParams();
  console.log("Sales()", "submodule", submodule, "req", req, "id", id);
  return <>Sales</>;
}
