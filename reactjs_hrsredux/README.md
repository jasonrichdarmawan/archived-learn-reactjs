### Redux Reducers

```
import React from "react";

// temporary
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthData,
  loginAsync,
  updateAuthData,
} from "./providers/authDataSlice";
import {
  selectUserDatabase,
  createUserWithEmailPasswordAndDisplayNameAsync,
  updateUserWithUID,
} from "./providers/userDatabaseSlice";
import {
  selectDepartmentDatabase,
  createDepartmentWithHandlerAndUsersUIDAsync,
  updateDepartmentWithUID,
} from "./providers/departmentDatabaseSlice";

const App = () => {
  // temporary
  const userDatabase = useSelector(selectUserDatabase);
  const departmentDatabase = useSelector(selectDepartmentDatabase);
  const authData = useSelector(selectAuthData);

  const dispatch = useDispatch();

  console.log(
    "userDatabase",
    userDatabase,
    "departmentDatabase",
    departmentDatabase,
    "authData",
    authData
  );

  const handleLogin = () => {
    dispatch(
      loginAsync({
        uid: 0,
        email: "jasonong713@gmail.com",
        password: "123456",
        access: 0,
        displayName: "Jason admin's account",
      })
    );
    console.log("loginAsync", authData);
  };

  const handleUpdateAuthData = () => {
    dispatch(updateAuthData({ isAuthorized: false }));
    console.log("update", authData);
  };

  const handleCreateDepartment = () => {
    dispatch(
      createDepartmentWithHandlerAndUsersUIDAsync({
        uid: 2,
        handler: "abcd",
        users_uid: [0, 1],
      })
    );
    console.log("createDepartment", departmentDatabase);
  };

  const handleUpdateDepartmentWithUID = () => {
    dispatch(
      updateDepartmentWithUID({ uid: 2, handler: "new name", users_uid: [0] })
    );
    console.log("updateDepartment", departmentDatabase);
  };

  const handleCreateUser = () => {
    dispatch(
      createUserWithEmailPasswordAndDisplayNameAsync({
        uid: 2,
        email: "jadada",
        password: "abcdeadafg",
        access: 1,
        displayName: "Jasonadada employee's account",
      })
    );
    console.log("create user", userDatabase);
  };

  const handleUpdateUserWithUID = () => {
    dispatch(updateUserWithUID({ uid: 2, email: "aaa", displayName: "aaa" }));
    console.log("update user with uid", userDatabase);
  };

  return (
    <>
      <p>
        {authData.isAuthorized === true
          ? "authorized"
          : authData.isAuthorized === false
          ? "not authorized"
          : "awaiting"}
      </p>
      <p>{authData.email}</p>
      {departmentDatabase.map((department) => (
        <p key={department.handler}>{department.handler}</p>
      ))}
      {userDatabase[2] && <p>{userDatabase[2].displayName}</p>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleUpdateAuthData}>Update Auth Data</button>
      <button onClick={handleCreateDepartment}>Create Department</button>
      <button onClick={handleUpdateDepartmentWithUID}>
        Update Department With UID
      </button>
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleUpdateUserWithUID}>Update User With UID</button>
    </>
  );
};

export default App;
```
