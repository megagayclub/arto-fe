import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface InquiryRequest {
  artworkId: number;
  title: string;
  category: string;
  content: string;
}

export const useInquiry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitInquiry = async (data: InquiryRequest): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    // 1. 저장된 토큰 가져오기 (보통 'token' 혹은 'accessToken' 이름으로 저장됨)
    const token = localStorage.getItem("authToken"); 

    try {
      // 2. 백엔드 주소로 요청 (프록시가 없다면 http://localhost:8080 추가)
      await axiosInstance .post("http://localhost:8080/api/v1/inquiries", data, {
        headers: {
          "Content-Type": "application/json",
          // 3. 토큰이 있으면 헤더에 넣어줌
          ...(token && { "Authorization": `Bearer ${token}` })
        }
      });
      return true;
    } catch (err: any) {
      // 백엔드에서 준 에러 메시지를 우선 출력
      const errorMessage = err.response?.data?.message || "문의 등록에 실패했습니다.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitInquiry, isLoading, error };
};