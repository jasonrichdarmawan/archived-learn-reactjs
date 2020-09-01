import React from "react";
import { NavigationBar, PlacementTable } from "../../organisms";

export const PlacementTemplate = ({ routes, ...props }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar routes={routes} />
      <PlacementTable {...props} />
    </div>
  );
};
