import { createSlice } from "@reduxjs/toolkit";

const userDatabaseSlice = createSlice({
  name: "userDatabase",
  initialState: [
    {
      uid: 0,
      email: "jasonong713@gmail.com",
      password: "123456",
      access: 0,
      displayName: "Jason admin's account",
    },
    {
      uid: 1,
      email: "jason.onggo@tempatkerja.com",
      password: "abcdefg",
      access: 1,
      displayName: "Jason employee's account",
    },
  ],
  reducers: {
    createUserWithEmailPasswordAndDisplayName: (state, action) => {
      return [...state, action.payload];
    },
    // TODO: updateUser
    updateUserWithUID: (state, action) => {
      return state.map((user) =>
        user.uid === action.payload.uid ? { ...user, ...action.payload } : user
      );
    },
  },
});

export const {
  createUserWithEmailPasswordAndDisplayName,
  updateUserWithUID,
} = userDatabaseSlice.actions;

export const createUserWithEmailPasswordAndDisplayNameAsync = (res) => (
  dispatch
) => {
  setTimeout(() => {
    dispatch(createUserWithEmailPasswordAndDisplayName(res));
  });
};

export const selectUserDatabase = (state) => state.userDatabase;

export default userDatabaseSlice.reducer;
