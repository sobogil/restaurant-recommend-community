// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // 사용자 정보를 토큰에서 가져오기
  useEffect(() => {
    if (token) {
      const userData = JSON.parse(atob(token.split('.')[1])); // JWT에서 payload 부분 디코딩
      setUser(userData); // 사용자 정보를 상태에 설정
    }
  }, [token]);

  const login = async (email, password) => {
    console.log(email);
    const response = await loginUser({ email, password });
    setUser(response.data.user);
    setToken(response.data.token);
    console.log(response.data.token);
    localStorage.setItem('token', response.data.token); // 로컬 스토리지에 토큰 저장
  };

  const register = async (username, email, password) => {
    const response = await registerUser({ username, email, password });
    setUser(response.data.user);
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token); // 로컬 스토리지에 토큰 저장
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};