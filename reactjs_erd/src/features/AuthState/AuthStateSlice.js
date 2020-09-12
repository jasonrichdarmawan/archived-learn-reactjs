import { createSlice } from "@reduxjs/toolkit";
import { firebase } from "api/firebase";

const authStateSlice = createSlice({
  name: "authState",
  initialState: { isAuthorized: "" },
  reducers: {
    signIn: (state, action) => {
      // TODO
      return { isAuthorized: true, ...action.payload };
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
    if (user) {
      if (localStorage.getItem("authState")) {
        const jwtVerify = firebase
          .app()
          .functions("asia-southeast2")
          .httpsCallable("jwtVerify");
        jwtVerify(localStorage.getItem("authState"))
          .then(({ data: decoded }) => dispatch(signIn(decoded)))
          .catch((error) => {
            console.log(error);
            dispatch(signOut({ error: { ...error } }));
          });
      } else if (!localStorage.getItem("authState")) {
        firebase
          .firestore()
          .collection("user")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              dispatch(signIn({ document: { ...doc.data() } }));

              const jwtSign = firebase
                .app()
                .functions("asia-southeast2")
                .httpsCallable("jwtSign");
              jwtSign({
                isAuthorized: true,
                document: { ...doc.data() },
              })
                .then(({ data: encoded }) =>
                  localStorage.setItem("authState", encoded)
                )
                .catch((error) => dispatch(signOut({ error: { ...error } })));
            } else if (!doc.exists) {
              dispatch(
                signOut({
                  error: {
                    message:
                      "User exists but the user's document is not found.",
                  },
                })
              );
            }
          })
          .catch(() => {
            dispatch(
              signOut({
                error: {
                  message:
                    "User exists but the user has insufficient permissions to access the requested document.",
                },
              })
            );
          });
      }
    } else if (!user) {
      console.log("hit");
      dispatch(signOut());
    }
  });
};

export const signInWithEmailAndPassword = (email, password) => (dispatch) => {
  // console.log("signInWithEmailAndPassword");
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => dispatch(signIn()))
    .catch((error) => dispatch(signOut({ error: { ...error } })));
};

export const selectAuthState = (state) => state.authState;

export default authStateSlice.reducer;
