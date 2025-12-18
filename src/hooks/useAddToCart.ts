// src/hooks/useAddToCart.ts
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface CartItemAddRequest {
  artworkId: number;
}

export const useAddToCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (artworkId: number): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // ✅ 최종 요청: /api/v1/cart/items (axiosInstance baseURL이 /api라서)
      await axiosInstance.post("/v1/cart/items", {
        artworkId,
      } as CartItemAddRequest);

      return true;
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ??
        e?.message ??
        "장바구니에 담지 못했습니다.";
      setError(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { addToCart, isLoading, error };
};