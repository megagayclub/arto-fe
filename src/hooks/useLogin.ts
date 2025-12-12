// src/hooks/useLogin.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance'; 

// --- 인터페이스 정의 (Types 분리 없이 내부 통합) ---

// 로그인 요청 DTO (Spring Boot의 @RequestBody와 일치)
export interface LoginRequestDto {
  email: string;
  password: string;
}

// 로그인 응답 DTO
interface LoginResponse {
  accessToken: string;
  tokenType: string;
}

interface UseLoginResult {
  login: (credentials: LoginRequestDto) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

export const useLogin = (): UseLoginResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const login = useCallback(async (credentials: LoginRequestDto) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await axiosInstance.post<LoginResponse>('/login', credentials);
      
      const { accessToken, tokenType } = response.data;

      // 토큰 저장 (실제 환경에서는 보안 고려 필요)
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('tokenType', tokenType);

      setIsSuccess(true);
      console.log("로그인 성공! 토큰:", accessToken);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        // 백엔드에서 반환된 에러 메시지 사용
        const errorMessage = err.response?.data?.message || '로그인 요청에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
        setError(errorMessage);
        console.error("로그인 에러 응답:", err.response?.data);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
        console.error("알 수 없는 에러:", err);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { login, isLoading, error, isSuccess };
};