import React, { createContext } from "react";
import { useAuthFetch } from "../hooks/useAuthFetch";
import axios from "axios";

interface AuthContextType {
  user: any;
  login: (userData: any) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, setUser, loading } = useAuthFetch();

  const login = (userData: any) => {
    setUser(userData);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
