import { useDispatch } from "react-redux";
import { updateAuthData } from "../../providers/authDataSlice";

export const FetchAuthData = ({ isAuthorized }) => {
  // console.log('isAuthorized', isAuthorized);
  const dispatch = useDispatch();

  if (isAuthorized === "await") {
    setTimeout(() => {
      dispatch(updateAuthData({ isAuthorized: false }))
    }, 1000);
    
    // TODO Loading JSX element
    return "Loading";
  }
};