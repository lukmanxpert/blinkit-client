const useIsAdmin = (role) => {
  if (role === "ADMIN") {
    return true;
  }
  return false;
};

export default useIsAdmin;
