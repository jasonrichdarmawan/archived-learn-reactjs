import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthorized: "await",
  },
  reducers: {
    login: (state) => {
      state.isAuthorized = true;
    },
    logout: (state) => {
      state.isAuthorized = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const loginAsync = () => (dispatch) =>
  setTimeout(() => dispatch(login()), 1000);

export const selectAuth = (state) => state.auth.isAuthorized;

export default authSlice.reducer;
