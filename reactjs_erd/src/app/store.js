import { configureStore } from "@reduxjs/toolkit";
import authStateReducer from "features/AuthState/AuthStateSlice";

export default configureStore({
  reducer: {
    authState: authStateReducer,
  },
});
