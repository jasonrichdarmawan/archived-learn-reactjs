import React from "react";

export const FormControl = ({ type, placeholder, controlId }) => (
  <input
    type={type}
    className="form-control form-control-sm"
    id={controlId}
    placeholder={placeholder}
  />
);
