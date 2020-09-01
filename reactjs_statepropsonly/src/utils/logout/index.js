export const handleLogout = ({ authData, setAuthData }) => {
  const timer = setTimeout(() => {
    setAuthData({ ...authData, res: false, type: undefined });
  }, 2000);
  return () => clearTimeout(timer);
};
