import { useContext } from "react";
import { AuthDataContext } from "../../providers";

// Fake Auth Req, Res
export const FetchAuthData = () => {
  const { authData, setAuthData } = useContext(AuthDataContext);

  if (authData.isAuthorized === "await") {
    setTimeout(() => {
      setAuthData({ isAuthorized: false });
    }, 1000);
    return "Loading";
  }
};
