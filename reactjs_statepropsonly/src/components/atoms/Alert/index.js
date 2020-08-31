import React from "react";
import classnames from "classnames";

export const Alert = ({ variant, className, children }) => (
  <div
    className={classnames(
      "alert",
      variant
        ? variant === "warning"
          ? "alert-warning"
          : null // TODO
        : "alert-primary",
      className
    )}
  >
    {children}
  </div>
);
