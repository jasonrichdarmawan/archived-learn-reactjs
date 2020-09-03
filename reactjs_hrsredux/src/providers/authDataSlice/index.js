import { createSlice } from "@reduxjs/toolkit";

const authDataSlice = createSlice({
  name: "authData",
  initialState: { isAuthorized: "await" },
  reducers: {
    login: (state, action) => {
      return { isAuthorized: true, ...action.payload }
    },
    logout: () => {
      return { isAuthorized: false }
    },
    updateAuthData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { login, logout, updateAuthData } = authDataSlice.actions;

export const loginAsync = (res) => (dispatch) => {
  setTimeout(() => {
    dispatch(login(res));
  }, 1000);
};

export const selectAuthData = (state) => state.authData;

export default authDataSlice.reducer;
