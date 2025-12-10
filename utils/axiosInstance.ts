// src/utils/axiosInstance.ts

import axios from 'axios';

// 백엔드 API의 기본 URL을 설정합니다.
// 개발 환경에 맞게 수정하세요. (예: http://localhost:8080)
const BASE_URL = 'http://localhost:8080'; 

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // 필요한 경우 withCredentials 등 추가 설정
});

export default axiosInstance;