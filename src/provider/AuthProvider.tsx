import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState, useCallback, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const setToken = (newToken: string | null) => {
    setToken_(newToken);
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      setToken(response.data.token);
      setUser(response.data.user);
    } catch (error) {
      throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      axios.defaults.headers.common["Content-Type"] = "application/json";
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      user,
      login,
      logout,
      token,
      setToken,
    }),
    [login, logout, token, user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export type User = {
  id: number;
};

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default AuthProvider;
