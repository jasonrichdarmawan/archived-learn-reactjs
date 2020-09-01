export const handleLogout = ({ authData, setAuthData }) => {
  const timer = setTimeout(() => {
    setAuthData({ ...authData, isAuthorized: false, type: undefined });
  }, 1000);
  return () => clearTimeout(timer);
};
