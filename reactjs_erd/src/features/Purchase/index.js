import React from "react";
import { useParams } from "react-router-dom";

export function Purchase() {
  const { submodule, req, id } = useParams();
  console.log("Purchase()", "submodule", submodule, "req", req, "id", id);
  return <>Purchase</>;
}
