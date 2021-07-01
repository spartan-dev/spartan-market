import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext({
  auth: { email: "" },
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
  const [user, setUser] = useState({ email: "" });
  const authData = useMemo(
    () => ({
      auth: { email: "drakarzamael@gmail.com" },
      login: () => null,
      logout: () => null,
      setReloadUser: () => null,
    }),
    []
  );
  return (
    <AuthDispatchContext.Provider value="aun nada">
      <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
