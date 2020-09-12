import { selectAuthState } from "features/AuthState/AuthStateSlice";
// import React from "react";

import { useSelector } from "react-redux";

// import { firebase } from "api/firebase";

export function Dashboard() {
  const authState = useSelector(selectAuthState);
  console.log('Dashboard()', authState);
  // firebase.auth().signOut()
  return "Dashboard";
}
