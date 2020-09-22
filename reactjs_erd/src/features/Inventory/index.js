import React from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { selectAuthState } from "features/AuthState/AuthStateSlice";

import { TopNavbar } from "components/TopNavbar";
import ListProducts from "./ListProducts";

export function Inventory() {
  const { submodule, req, id } = useParams();
  console.log("Inventory()", "submodule", submodule, "req", req, "id", id);

  let content = <></>;
  if (submodule === "products") {
    if (req === "list") content = <ListProducts />;
    else if (req === "view" && id !== undefined)
      content = <h5>TODO: View Product</h5>;
    else if (req === "add") content = <h5>TODO: Add Product</h5>;
  } else if (submodule === "delivery_orders") {
    if (req === "list") content = <h5>TODO: List Delivery Orders</h5>;
    else if (req === "view" && id !== undefined)
      content = <h5>TODO: View Delivery Order</h5>;
    else if (req === "add") content = <h5>TODO: Add Delivery Order</h5>;
  } else if (submodule === "receipts") {
    if (req === "list") content = <h5>TODO: List Receipts</h5>;
    else if (req === "view" && id !== undefined)
      content = <h5>TODO: View Receipts</h5>;
    else if (req === "add") content = <h5>TODO: Add Receipt</h5>;
  }

  const authState = useSelector(selectAuthState);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="m-3">{content}</div>
    </div>
  );
}
