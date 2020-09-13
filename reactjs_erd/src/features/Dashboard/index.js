import { selectAuthState } from "features/AuthState/AuthStateSlice";
import React from "react";

import { useSelector } from "react-redux";

import { TopNavbar } from "components/TopNavbar";

export function Dashboard() {
  const authState = useSelector(selectAuthState);
  // console.log("Dashboard()", authState);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
    </div>
  );
}
