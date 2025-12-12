// src/hooks/useArtworkDetail.ts
import { useEffect, useState } from "react";
import axios from "axios";

// ProductDetail.tsx에서 사용하는 타입 정의
export type ProductDetailType = {
  id: number;
  title: string;
  artist: string;
  year: number | string;
  genre: string;
  medium: string;
  frame: string;
  size: string;
  shippingCost: number;
  shippingMethod: string;
  price: number;
  imagePlaceholder: string; // 상세 페이지에서 써야 하는 대표 이미지 URL
};

type UseArtworkDetailReturn = {
  artworkDetail: ProductDetailType | null;
  isLoading: boolean;
  error: string | null;
};

// ✅ 개발 환경 기준: 스프링부트 기본 포트 8080
// 필요하면 나중에 import.meta.env.VITE_API_BASE_URL 같은 환경변수로 바꿔도 됨
const API_BASE_URL = "http://localhost:8080";

export const useArtworkDetail = (artworkId: number): UseArtworkDetailReturn => {
  const [artworkDetail, setArtworkDetail] = useState<ProductDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (artworkId == null) return;

    const controller = new AbortController();

    async function fetchArtworkDetail() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/artworks/${artworkId}`,
          {
            signal: controller.signal,
            // JWT 쿠키를 쓰고 있으면 아래 옵션 켜야 함 (백엔드 CORS도 credentials 허용 필요)
            // withCredentials: true,
          }
        );

        const data = response.data; // ArtworkDetailResponseDto

        // ⚠️ 여기부터가 "백엔드 DTO → 프론트용 타입" 매핑 부분
        // ⚠️ ArtworkDetailResponseDto 실제 필드명을 보고 아래 필드를 맞춰줘야 한다.
        const mapped: ProductDetailType = {
          id: data.artworkId ?? artworkId,

          // TODO: DTO 필드명에 맞게 수정 필요
          // 예시: title, artistName, creationYear, genre, medium, frameType, dimensions, shippingCost, shippingMethod, price, thumbnailImageUrl ...
          title: data.title, // 예: ArtworkDetailResponseDto에 title 필드가 있다고 가정
          artist: data.artistName ?? data.artist ?? "", // 예: artistName 또는 artist
          year: data.creationYear ?? data.year ?? "",
          genre: data.genre ?? "",
          medium: data.medium ?? data.material ?? "",
          frame: data.frameType ?? data.frame ?? "",
          size: data.dimensions ?? data.size ?? "",
          shippingCost: Number(
            data.shippingCost ?? data.deliveryFee ?? 0
          ),
          shippingMethod: data.shippingMethod ?? "",
          price: Number(data.price ?? 0),

          // 대표 이미지 URL
          imagePlaceholder:
            data.thumbnailImageUrl ??
            data.mainImageUrl ??
            "/placeholder-image.png",
        };

        setArtworkDetail(mapped);
      } catch (err: any) {
        if (axios.isCancel(err)) return;

        console.error("[useArtworkDetail] API 호출 에러:", err);

        const message =
          err?.response?.data?.message ??
          err?.message ??
          "작품 정보를 불러오지 못했습니다.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArtworkDetail();

    return () => {
      controller.abort();
    };
  }, [artworkId]);

  return {
    artworkDetail,
    isLoading,
    error,
  };
};
