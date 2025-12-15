// src/hooks/useLogin.ts

import { useState } from 'react';
import axios from 'axios';
// ⚠️ AuthContext가 외부 파일에 있다고 가정하고 import합니다.
//    (예: src/context/AuthContext.tsx)
import { useAuth } from '../context/AuthContext'; 

// --- 타입 정의 (API 요청/응답) ---
interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    tokenType: string;
}

// 백엔드 API의 기본 URL (실제 환경에 맞게 변경 필요)
const BASE_URL = 'http://localhost:8080/api/v1'; 
const LOGIN_URL = `${BASE_URL}/login`;

// --- 커스텀 훅 정의 ---
export const useLogin = () => {
    const { login } = useAuth(); // AuthContext에서 login 함수 가져오기
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * 로그인 API 호출 및 인증 처리 로직
     * @param data - LoginRequest (email, password)
     * @returns 성공 여부 (boolean)
     */
    const executeLogin = async (data: LoginRequest): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. API 호출 (Axios 사용)
            const response = await axios.post<LoginResponse>(LOGIN_URL, data); 
            
            // 2. 인증 컨텍스트에 토큰 및 이메일 저장
            const { accessToken } = response.data;
            login(data.email, accessToken); 

            return true; // 로그인 성공

        } catch (err) {
            // API 통신 에러 처리
            if (axios.isAxiosError(err) && err.response) {
                // 서버에서 발생한 오류 메시지 사용
                // 서버 응답 형태에 따라 .data.message 또는 .data.error 등을 확인해야 합니다.
                const errorMessage = err.response.data.message || 'ログイン情報が正しくありません。';
                setError(errorMessage);
            } else {
                setError('ネットワークエラーが発生しました。');
            }
            return false; // 로그인 실패
            
        } finally {
            setIsLoading(false);
        }
    };

    return { executeLogin, isLoading, error };
};