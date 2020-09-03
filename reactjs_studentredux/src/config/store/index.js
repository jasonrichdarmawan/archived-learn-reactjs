import { configureStore } from "@reduxjs/toolkit";
import authDataReducer from "../../providers/AuthDataSlice";

export default configureStore({
  reducer: {
    authData: authDataReducer,
  },
  devTools: true,
});
