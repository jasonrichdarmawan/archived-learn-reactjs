import { createSlice } from "@reduxjs/toolkit";

const departmentDatabaseSlice = createSlice({
  name: "departmentDatabase",
  initialState: [
    {
      uid: 0,
      handler: "management",
      users_uid: [0],
    },
    {
      uid: 1,
      handler: "marketing",
      users_uid: [0, 1],
    },
  ],
  reducers: {
    createDepartmentWithHandlerAndUsersUID: (state, action) => {
      return [...state, action.payload];
    },
    updateDepartmentWithUID: (state, action) => {
      return state.map((department) =>
        department.uid === action.payload.uid
          ? { ...department, ...action.payload }
          : department
      );
    },
  },
});

export const {
  createDepartmentWithHandlerAndUsersUID,
  updateDepartmentWithUID,
} = departmentDatabaseSlice.actions;

export const createDepartmentWithHandlerAndUsersUIDAsync = (res) => (
  dispatch
) => {
  setTimeout(() => {
    dispatch(createDepartmentWithHandlerAndUsersUID(res));
  }, 1000);
};

export const selectDepartmentDatabase = (state) => state.departmentDatabase;

export default departmentDatabaseSlice.reducer;
