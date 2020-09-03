import { createSlice } from "@reduxjs/toolkit";

export const authDataSlice = createSlice({
  name: "authData",
  initialState: {
    authData: { isAuthorized: "await" },
  },
  reducers: {
    login: (state, action) => {
      state.authData = { isAuthorized: true, ...action.payload };
    },
    logout: (state) => {
      state.authData = { isAuthorized: false };
    },
    // TODO
    update: (state, action) => {
      state.authData = { ...state.authData, ...action.payload };
    },
  },
});

export const { login, logout, update } = authDataSlice.actions;

export const loginAsync = (res) => (dispatch) =>
  setTimeout(() => dispatch(login(res)), 1000);

export const selectAuthData = (state) => state.authData.authData;

export default authDataSlice.reducer;
