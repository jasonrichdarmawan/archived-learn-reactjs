import React, { useContext } from "react";
import { PlacementTemplate } from "../../components/templates/PlacementTemplate";
import { RoutesContext } from "../../providers";

export const PlacementPage = (props) => {
  const routes = useContext(RoutesContext);
  return <PlacementTemplate {...props} routes={routes} />;
};
