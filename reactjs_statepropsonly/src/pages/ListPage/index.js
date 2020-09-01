import React, { useContext } from "react";
import { ListTemplate } from "../../components";
import { RoutesContext } from "../../providers";

export const ListPage = () => {
  const routes = useContext(RoutesContext);
  return <ListTemplate routes={routes} />;
};
