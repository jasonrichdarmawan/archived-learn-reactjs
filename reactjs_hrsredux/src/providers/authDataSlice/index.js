import { createSlice } from "@reduxjs/toolkit";

const jwt = require("jsonwebtoken");

const authDataSlice = createSlice({
  name: "authData",
  initialState: { isAuthorized: "await" },
  reducers: {
    // heavy lifter login.
    // login: (state, action) => {
    //   // return { isAuthorized: true, ...action.payload }
    //   const res = action.payload.database.find(
    //     (user) =>
    //       user.email === action.payload.email &&
    //       user.password === action.payload.password &&
    //       true
    //   );
    //   if (res !== undefined) return { ...res, isAuthorized: true };
    // },
    login: (state, action) => {
      try {
        const encoded = jwt.sign(
          { isAuthorized: true, ...action.payload },
          "secretOrPublicKey"
        );
        localStorage.setItem("state", encoded);
      } catch (err) {
        console.log(err);
      }
      return { isAuthorized: true, ...action.payload };
    },
    logout: () => {
      localStorage.removeItem("state");
      return { isAuthorized: false };
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
