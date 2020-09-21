import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectAuthState } from "features/AuthState/AuthStateSlice";

import { TopNavbar } from "components/TopNavbar";
import ListSalesOrders from "./ListSalesOrders";

export function Sales() {
  const { submodule, req, id } = useParams();
  console.log("Sales()", "submodule", submodule, "req", req, "id", id);

  let content = <></>;
  if (submodule === "sales_orders") {
    if (req === "list") content = <ListSalesOrders />
    else if (req === "view" && id !== undefined) content = <h5>TODO: View Sales Order</h5>
    else if (req === "add") content = <h5>TODO: Add Sales Order</h5>
  } else if (submodule === "invoices") {
    if (req === "list") content = <h5>TODO: List Invoices</h5>
    else if (req === "view" && id !== undefined) content = <h5>TODO: View Invoice</h5>
    else if (req === "add") content = <h5>TODO: Add Invoice</h5>
  }

  const authState = useSelector(selectAuthState);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="m-3">{content}</div>
    </div>
  );
}
