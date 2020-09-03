import React, { useContext, useEffect } from "react";
import { RenderRoutes } from "./utils";
import { DatabaseContext } from "./providers";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthData, update } from "./providers/AuthDataSlice";

function App() {
  // Temporary Listener, this is bad practice.
  const { database } = useContext(DatabaseContext);
  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(update({ ...authData, ...database[authData.uid] }));
  }, [database]);

  return <RenderRoutes />;
}

export default App;
