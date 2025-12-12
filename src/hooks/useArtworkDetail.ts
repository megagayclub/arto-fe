// src/hooks/useArtworkDetail.ts

import { useState, useEffect } from "react";
import axios from "axios";

// ==========================================================
// 1. 데이터 DTO (타입 정의)
// 백엔드 ArtworkDetailResponseDto에 대응하는 타입 정의
// ==========================================================
export interface ProductDetailType {
  artworkId: number;
  title: string;
  artist: string;
  year: string;
  genre: string;
  medium: string;
  frame: string;
  size: string;
  shippingCost: number;
  shippingMethod: string;
  price: number;
  imagePlaceholder: string; // 이미지 URL이라고 가정
  // ... 백엔드 DTO의 나머지 필드
}

// ==========================================================
// 2. API 호출 함수 (커스텀 훅 내부에 정의)
// ==========================================================

// 백엔드 API 기본 URL (실제 환경에 맞게 조정 필요)
const API_BASE_URL = "http://localhost:8080/api/v1";

/**
 * 작품 상세 정보를 조회하는 API 호출 함수
 * GET /api/v1/artworks/{artworkId}
 * @param artworkId 조회할 작품 ID
 * @returns ProductDetailType
 */
const fetchArtworkDetail = async (
  artworkId: number
): Promise<ProductDetailType> => {
  try {
    const response = await axios.get<ProductDetailType>(
      `${API_BASE_URL}/artworks/${artworkId}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("작품 상세 정보 조회 실패:", error.message);
      throw new Error(
        error.response?.data?.message || "작품 정보를 불러오는데 실패했습니다."
      );
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};


// ==========================================================
// 3. 커스텀 훅 정의 (기존 로직 유지)
// ==========================================================

/**
 * 작품 상세 정보를 불러오는 커스텀 훅
 * @param artworkId 조회할 작품 ID
 * @returns {artworkDetail, isLoading, error}
 */
export const useArtworkDetail = (artworkId: number) => {
  const [artworkDetail, setArtworkDetail] = useState<ProductDetailType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artworkId || artworkId <= 0) {
      setError("유효하지 않은 작품 ID입니다.");
      setIsLoading(false);
      return;
    }

    const loadArtworkDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchArtworkDetail(artworkId);
        setArtworkDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "데이터 로드 실패");
      } finally {
        setIsLoading(false);
      }
    };

    loadArtworkDetail();
  }, [artworkId]);

  return { artworkDetail, isLoading, error };
};