import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { displayRoutesInNavbar } from "../../utils/displayRoutesInNavbar";
import { NavbarOrganism } from "../../components/Organisms/NavbarOrganism";

export const DashboardPage = ({ authData, routesConfig }) => {
  // console.log("dashboardPage", routesConfig);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism authData={authData} routesConfig={routesConfig} />
    </div>
  );
};
