import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync, selectAuth } from "../../providers/authSlice";

export const Login = () => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <p>{auth === true ? "authorized" : auth === "await" ? "await" : "not authorized"}</p>
      <button onClick={() => dispatch(loginAsync())}>Login</button>
    </React.Fragment>
  );
};
