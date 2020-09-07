import React from "react";
import { NavbarOrganism } from "components/organisms/NavbarOrganism";

export function DashboardPage({ userData }) {
  console.log(userData);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavbarOrganism />
    </div>
  );
}
