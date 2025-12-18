// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  // ✅ Vite proxy("/api" -> http://localhost:8080) 타게 하기
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청마다 토큰 자동 첨부
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
