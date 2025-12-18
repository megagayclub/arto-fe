// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. 초기값 설정: 로컬 스토리지에 토큰이 있으면 true로 시작
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('authToken');
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('userEmail');
  });

  const login = (email: string, token: string) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email); // 이메일도 저장해야 유지됨
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail(null);
    window.location.href = '/login'; // 로그아웃 시 로그인 페이지로 강제 이동 (선택)
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};