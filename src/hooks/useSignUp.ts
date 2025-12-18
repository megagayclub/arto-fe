// hooks/useSignUp.ts

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

// API 통신을 위한 기본 URL 설정 (실제 서버 주소로 변경 필요)
const API_BASE_URL = 'http://52.79.193.77:8080/api/v1'; 

// SignUpRequestDto와 일치하는 타입을 정의합니다.
// SignUpPage에서 'signUpData' 객체를 만들 때 사용한 필드들입니다.
interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  // 주소, 전화번호 등 SignUpRequestDto에 필요한 나머지 필드들을 여기에 추가하세요.
  // address?: string; 
  // phone?: string;
}

// 응답 데이터 타입 (스프링 부트 API의 응답 형식에 맞춤)
interface SignUpResponse {
  message: string;
  userId: number;
}

/**
 * 회원가입 API 통신을 처리하는 커스텀 훅
 */
export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState<SignUpResponse | null>(null);

  /**
   * 회원가입 API 호출 함수
   * @param data SignUpRequest에 해당하는 요청 데이터
   */
  const signUp = async (data: SignUpRequest) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    
    try {
      // POST 요청: /api/v1/users/signup
      const res = await axios.post<SignUpResponse>(`${API_BASE_URL}/users/signup`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // HTTP 상태 코드 201 (CREATED) 성공 처리
      setResponse(res.data);
      setIsSuccess(true);
      
      console.log("회원가입 성공:", res.data);

    } catch (err) {
      const axiosError = err as AxiosError<any>;
      
      // 서버에서 보낸 에러 메시지 처리 (예: 이메일 중복, 유효성 검사 실패)
      if (axiosError.response) {
        // 서버의 응답 본문에서 에러 메시지를 찾습니다.
        const serverMessage = axiosError.response.data?.message || axiosError.response.data?.error;
        
        // 유효성 검사 실패 시 (HTTP 400 Bad Request)
        if (axiosError.response.status === 400 && axiosError.response.data.errors) {
             const validationErrors = axiosError.response.data.errors;
             // 첫 번째 유효성 검사 에러 메시지를 표시
             const firstError = validationErrors[0].defaultMessage || "入力内容を確認してください。";
             setError(firstError);
        } else {
             // 그 외의 일반적인 서버 에러 메시지
             setError(serverMessage || `登録に失敗しました。ステータスコード: ${axiosError.response.status}`);
        }
      } else if (axiosError.request) {
        // 요청은 보냈으나 응답을 받지 못한 경우 (네트워크 오류)
        setError("サーバーに接続できませんでした。ネットワーク状態を確認してください。");
      } else {
        // 요청 설정 중 발생한 오류
        setError("リクエストの準備中にエラーが発生しました。");
      }
      
      setIsSuccess(false);

    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error,
    isSuccess,
    response // 성공 시 응답 데이터
  };
};