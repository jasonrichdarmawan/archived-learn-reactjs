import React from "react";

export const FormLabel = ({ children, controlId }) => (
  <label for={controlId}>{children}</label>
)