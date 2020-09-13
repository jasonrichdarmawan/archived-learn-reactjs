import React from "react";
import { useParams } from "react-router-dom";

export function Inventory() {
  const { submodule, req, id } = useParams();
  console.log("Inventory()", "submodule", submodule, "req", req, "id", id);
  return <>Inventory</>;
}
