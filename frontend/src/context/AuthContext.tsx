import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from '../api';

interface AuthContextType {
  user: any;
  login: (userInfo: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(() => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // keep user in sync with localStorage
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (userInfo: any) => {
    setUser(userInfo);
    try {
      // fetch wishlist for this user and save locally for UI consistency
      if (userInfo && userInfo.email) {
        const resp = await api.get('wishlist/', { params: { email: userInfo.email } });
        localStorage.setItem('wishlist', JSON.stringify(resp.data || []));
      }
    } catch {
      // ignore network errors; keep client-only wishlist
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wishlist');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
