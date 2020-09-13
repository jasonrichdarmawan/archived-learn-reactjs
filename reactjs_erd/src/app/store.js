import { configureStore } from "@reduxjs/toolkit";

import authStateReducer from "features/AuthState/AuthStateSlice";
import employeeReducer from "features/Employee/EmployeeSlice";

export default configureStore({
  reducer: {
    authState: authStateReducer,
    employee: employeeReducer,
  },
});
