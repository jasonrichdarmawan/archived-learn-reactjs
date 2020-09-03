// import { AuthDataContext } from "../../providers";

import { useSelector, useDispatch } from "react-redux";
import { selectAuthData, logout } from "../../providers/AuthDataSlice";

// Fake Auth Req, Res
export const FetchAuthData = () => {
  // const { authData, setAuthData } = useContext(AuthDataContext);

  const authData = useSelector(selectAuthData);
  const dispatch = useDispatch();

  if (authData.isAuthorized === "await") {
    setTimeout(() => {
      dispatch(logout());
    }, 1000);
    return "Loading";
  }
};
