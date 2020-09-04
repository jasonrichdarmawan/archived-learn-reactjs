import { useDispatch } from "react-redux";
import { updateAuthData } from "../../providers/authDataSlice";

const jwt = require("jsonwebtoken");

export const FetchAuthData = ({ isAuthorized }) => {
  // console.log('isAuthorized', isAuthorized);
  const dispatch = useDispatch();

  if (isAuthorized === "await") {
    if (localStorage.getItem("state")) {
      try {
        const payload = jwt.verify(
          localStorage.getItem("state"),
          "secretOrPublicKey"
        );
        dispatch(updateAuthData(payload));
      } catch (e) {
        console.log(e);
      }
    } else {
      setTimeout(() => {
        dispatch(updateAuthData({ isAuthorized: false }));
      }, 1000);
    }
  }
  // TODO Loading JSX element
  return "Loading";
};
