// src/hooks/useArtworkDetail.ts
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

// ========================
// 프론트에서 사용하는 타입
// ========================
export type ProductDetailType = {
  id: number;
  title: string;
  description: string;
  artist: string;

  price: number;
  shippingCost: number;
  shippingMethod: string;

  size: string;
  frame: string; // DTO에 없음 → 빈값 처리
  medium: string; // DTO에 없음 → 빈값 처리
  genre: string; // DTO에 없음 → 빈값 처리
  year: string; // DTO에 없음 → 빈값 처리

  imagePlaceholder: string;

  // 태그 정보
  colors: string[];
  spaces: string[];
  moods: string[];
};

type UseArtworkDetailReturn = {
  artworkDetail: ProductDetailType | null;
  isLoading: boolean;
  error: string | null;
};

const API_BASE_URL = "http://52.79.193.77:8080";

export const useArtworkDetail = (artworkId: number): UseArtworkDetailReturn => {
  const [artworkDetail, setArtworkDetail] = useState<ProductDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!artworkId) return;

    const controller = new AbortController();

    async function fetchDetail() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await axiosInstance.get(
          `${API_BASE_URL}/api/v1/artworks/${artworkId}`,
          {
            signal: controller.signal,
          }
        );

        const data = res.data;

        // ========================
        // DTO → ProductDetailType 매핑
        // ========================
        const mapped: ProductDetailType = {
          id: data.artworkId,
          title: data.title,
          description: data.description,
          artist: data.artistName,

          price: Number(data.price),
          shippingCost: Number(data.shippingCost),
          shippingMethod: data.shippingMethod,

          // 프론트 요구 스펙 중 DTO에 없는 필드는 빈값 처리
          size: data.dimensions ?? "",
          frame: "",
          medium: "",
          genre: "",
          year: "",

          imagePlaceholder: data.thumbnailImageUrl,

          colors: data.colors ?? [],
          spaces: data.spaces ?? [],
          moods: data.moods ?? [],
        };

        setArtworkDetail(mapped);
      } catch (err: any) {
        // ✅ abort로 취소된 요청은 정상 동작이므로 무시
         if (err?.code === "ERR_CANCELED" || err?.name === "CanceledError") {
    return;
  }

        console.error("작품 상세 API 오류:", err);
        
        const msg =
          err?.response?.data?.message ??
          err?.message ??
          "작품 정보를 불러오는 중 오류가 발생했습니다.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetail();

    return () => controller.abort();
  }, [artworkId]);

  return { artworkDetail, isLoading, error };
};
