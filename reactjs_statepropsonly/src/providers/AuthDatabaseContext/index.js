import React from "react";

export const AuthDatabaseContext = React.createContext([
  {
    username: "admin",
    password: "123456",
  },
  {
    username: "employee",
    password: "abcdefg",
  },
]);
