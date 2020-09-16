import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectAuthState } from "features/AuthState/AuthStateSlice";

import { TopNavbar } from "components/TopNavbar";

export function Purchase() {
  const { submodule, req, id } = useParams();
  console.log("Purchase()", "submodule", submodule, "req", req, "id", id);

  let content = <></>;
  if (submodule === "purchase_orders") {
    if (req === "list") content = <h5>TODO: List Purchase Orders</h5>;
    else if (req === "view" && id !== undefined)
      content = <h5>TODO: View Purchase Order</h5>;
    else if (req === "add") content = <h5>TODO: Add Purchase Order</h5>;
  } else if (submodule === "bills") {
    if (req === "list") content = <h5>TODO: List Bills</h5>;
    else if (req === "view" && id !== undefined)
      content = <h5>TODO: View Bill</h5>;
    else if (req === "add") content = <h5>TODO: Add Bill</h5>;
  }

  const authState = useSelector(selectAuthState);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="m-3">{content}</div>
    </div>
  );
}
