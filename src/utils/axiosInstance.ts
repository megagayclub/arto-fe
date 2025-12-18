// src/utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "/api", (기존)
  baseURL: "http://52.79.193.77:8080/api", // 실제 서버 주소
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
