import { createContext, useContext, useMemo, useState, useEffect } from "react";
import {
  setToken,
  getToken,
  setRole,
  getRole,
  removeToken,
} from "../pages/api/token";
import jwtDecode from "jwt-decode";
const AuthContext = createContext({
  auth: {},
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
});
const DispatchContext = createContext();
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
    setToken(token);
    setRole(role);
    setAuth({
      token,
      userId,
      role,
    });
  };
  const logout = () => {
    removeToken();
  };
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setRealoadUser,
    }),
    [auth]
  );
  if (auth === undefined) return null;
  return (
    <AuthDispatchContext.Provider value="nada aun">
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const useDispatch = () => useContext(DispatchContext);
