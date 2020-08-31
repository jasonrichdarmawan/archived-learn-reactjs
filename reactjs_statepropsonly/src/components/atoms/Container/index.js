import React from "react";
import classnames from "classnames";

export const Container = ({ className, children }) => (
  <div className={classnames("container", className)}>{children}</div>
)