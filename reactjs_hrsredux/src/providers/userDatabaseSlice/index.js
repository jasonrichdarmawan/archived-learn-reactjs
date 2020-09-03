import { createSlice } from "@reduxjs/toolkit";

const userDatabaseSlice = createSlice({
  name: "userDatabase",
  initialState: [
    {
      uid: 0,
      email: "jasonong713@gmail.com",
      password: "123456",
      access: 1,
      displayName: "Jason admin's account",
      phoneNumber: "123 456 789",
    },
    {
      uid: 1,
      email: "jason.onggo@tempatkerja.com",
      password: "abcdefg",
      access: 1,
      displayName: "Jason employee's account",
      phoneNumber: "123 123 123",
    },
  ],
  reducers: {
    createUserWithEmailPasswordAndDisplayName: (state, action) => {
      return [...state, action.payload];
    },
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
