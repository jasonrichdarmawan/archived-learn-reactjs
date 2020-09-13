import { selectAuthState } from "features/AuthState/AuthStateSlice";

import React from "react";

import { useSelector } from "react-redux";

import { TopNavbar } from "components/TopNavbar";

export function Dashboard() {
  const authState = useSelector(selectAuthState);
  console.log("Dashboard() authState", authState);
  return (
    <div className="min-vh-100 d-flex flex-column">
      <TopNavbar authState={authState} />
      <div className="d-flex flex-fill align-items-center">
        <div className="container w-auto">
          <p>Hello, {authState.document.name}</p>
        </div>
      </div>
    </div>
  );
}
