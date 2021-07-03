import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { setToken, getToken, setRole, getRole } from "../pages/api/token";
import jwtDecode from "jwt-decode";
const AuthContext = createContext({
  auth: {},
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
});

const AuthDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return "loggedin";
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setRealoadUser] = useState(false);
  useEffect(() => {
    const token = getToken();
    const role = getRole();
    if (token) {
      setAuth({
        token,
        userId: jwtDecode(token).id,
        role,
      });
    } else {
      setAuth(null);
    }
    setRealoadUser(false);
  }, [reloadUser]);
  const login = (token, userId, role) => {
    console.log(role, "en context");
    setToken(token);
    setRole(role);
    setAuth({
      token,
      userId,
      role,
    });
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout: () => null,
      setRealoadUser,
    }),
    [auth]
  );
  if (auth === undefined) return null;
  return (
    <AuthDispatchContext.Provider value="aun nada">
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
