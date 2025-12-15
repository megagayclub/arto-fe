// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 실제 프로젝트에서는 로컬 스토리지에서 토큰 존재 여부를 확인합니다.
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (email: string, token: string) => {
    // 토큰 저장 (예: localStorage)
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    // 토큰 삭제
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};