import React from "react";
import { Routes, RenderRoutes } from "./routes";
import { selectAuthState } from "features/AuthState/AuthStateSlice";
import { useSelector } from "react-redux";

function App() {
  const authState = useSelector(selectAuthState);
  // console.log("App()", authState);
  return <RenderRoutes routes={Routes({ authState: authState })} />;
}

export default App;
