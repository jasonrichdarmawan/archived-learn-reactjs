import { createSlice } from "@reduxjs/toolkit";

import { firebase } from "api/firebase";

const employeeSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    fetchUsers: (state, action) => [...action.payload],
  },
});

export const { fetchUsers } = employeeSlice.actions;

export const fetchUsersAsync = () => (dispatch) => {
  const fetchFirestore = firebase
    .app()
    .functions("asia-southeast2")
    .httpsCallable("fetchFirestore");
  fetchFirestore("user").then(({ data }) => {
    // console.log("employeeSlice(), fetchFirestore(), data", data);
    dispatch(fetchUsers(data));
  });
};

export const selectEmployee = (state) => state.employee;

export default employeeSlice.reducer;
