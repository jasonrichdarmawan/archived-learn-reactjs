import { createSlice } from "@reduxjs/toolkit";
import { firebase } from "api/firebase";

const authStateSlice = createSlice({
  name: "authState",
  initialState: { isAuthorized: "" },
  reducers: {
    signIn: () => {
      // TODO
      return { isAuthorized: true };
    },
    signOut: (state, action) => {
      // TODO
      return { isAuthorized: false, ...action.payload };
    },
  },
});

export const { signIn, signOut } = authStateSlice.actions;

export const fetchAuthState = () => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) dispatch(signIn());
    else if (!user) dispatch(signOut());
  });
};

export const signInWithEmailAndPassword = (email, password) => (dispatch) => {
  console.log("signInWithEmailAndPassword");
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch(signIn()))
    .catch((error) => dispatch(signOut({ error: { ...error } })));
};

export const selectAuthState = (state) => state.authState;

export default authStateSlice.reducer;
