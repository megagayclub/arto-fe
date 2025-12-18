import { useState } from "react";
import axios from "axios";

// 백엔드 DTO 구조에 맞춤
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

    try {
      // 프록시 설정(/api)이 되어있다고 가정
      await axios.post("/api/v1/inquiries", data);
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "문의 등록에 실패했습니다.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitInquiry, isLoading, error };
};