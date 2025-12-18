// src/hooks/useMyInquiries.ts
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export type InquiryResponseDto = {
  inquiryId: number;
  title: string;
  content: string;
  category: string; // enum이지만 프론트에선 문자열로 받는 게 일반적
  status: string;   // enum이지만 프론트에선 문자열로 받는 게 일반적
  createdAt: string; // LocalDateTime -> 보통 ISO string으로 옴
  artworkTitle: string | null;

  answerContent: string | null;
  answeredAt: string | null;
};

type UseMyInquiriesReturn = {
  inquiries: InquiryResponseDto[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

export const useMyInquiries = (): UseMyInquiriesReturn => {
  const [inquiries, setInquiries] = useState<InquiryResponseDto[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchMyInquiries(signal?: AbortSignal) {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ axiosInstance baseURL="/api" 이므로 "/v1/..."만 붙이면 됨
      const res = await axiosInstance.get<InquiryResponseDto[]>("/v1/inquiries", { signal });
      setInquiries(res.data ?? []);
    } catch (err: any) {
      // ✅ 취소는 에러로 치지 않음
      if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") return;

      const msg =
        err?.response?.data?.message ??
        err?.message ??
        "문의 내역을 불러오는 중 오류가 발생했습니다.";
      setError(String(msg));
      setInquiries(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    fetchMyInquiries(controller.signal);
    return () => controller.abort();
  }, []);

  return {
    inquiries,
    isLoading,
    error,
    refetch: () => fetchMyInquiries(),
  };
};
