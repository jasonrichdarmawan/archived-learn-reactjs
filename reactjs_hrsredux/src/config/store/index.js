import { configureStore } from "@reduxjs/toolkit";
import userDatabaseReducer from "../../providers/userDatabaseSlice";
import departmentDatabaseReducer from "../../providers/departmentDatabaseSlice";
import authDataReducer from "../../providers/authDataSlice";

export default configureStore({
  reducer: {
    userDatabase: userDatabaseReducer,
    departmentDatabase: departmentDatabaseReducer,
    authData: authDataReducer,
  },
});
