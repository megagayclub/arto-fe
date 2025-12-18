// src/hooks/useMyCart.ts
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

export interface CartItem {
  cartItemId: number;
  artworkId: number;
  title: string;
  artistName: string;
  price: number;
  thumbnailImageUrl: string;
}

export interface CartResponse {
  cartId: number;
  userId: number;
  items: CartItem[];
  totalAmount: number;
}

export const useMyCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. 데이터 패칭 로직을 함수로 분리
  const fetchCart = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axiosInstance.get<CartResponse>("/v1/cart");

      const safeCart: CartResponse = {
        ...res.data,
        items: res.data.items ?? [],
      };
      setCart(safeCart);
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? e?.message ?? "장바구니를 불러오지 못했습니다.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 2. 삭제 로직 추가
  const removeItem = async (cartItemId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      // 서버에 삭제 요청 (CartController @DeleteMapping("/items/{cartItemId}"))
      await axiosInstance.delete(`/v1/cart/items/${cartItemId}`);
      
      // 성공 시 UI 즉시 반영 (다시 불러오기)
      await fetchCart();
      alert("삭제되었습니다.");
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "삭제 중 오류가 발생했습니다.";
      alert(msg);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { cart, isLoading, error, removeItem, refresh: fetchCart };
};