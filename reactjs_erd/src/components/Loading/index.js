import React from "react";
import { Spinner } from "react-bootstrap";

export function Loading() {
  return (
    <Spinner animation="border" size="sm" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}
