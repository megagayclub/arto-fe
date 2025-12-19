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

// 주문 요청 시 필요한 데이터 타입 (백엔드 DTO와 일치)
export interface OrderCheckoutRequest {
  shippingAddress: string;
  receiverName: string;
  receiverPhone: string;
}

export const useMyCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const removeItem = async (cartItemId: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axiosInstance.delete(`/v1/cart/items/${cartItemId}`);
      await fetchCart();
      alert("삭제되었습니다.");
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "삭제 중 오류가 발생했습니다.";
      alert(msg);
    }
  };

  // 🎯 장바구니 -> 주문 생성 (Checkout) 로직 추가
  const checkout = async (userId: number, request: OrderCheckoutRequest) => {
    try {
      // 백엔드: @PostMapping("/api/orders/checkout/{userId}") 호출
      const res = await axiosInstance.post(`/api/orders/checkout/${userId}`, request);
      await fetchCart(); // 주문 후 장바구니 비워짐 반영
      return res.data;
    } catch (e: any) {
      const msg = e?.response?.data?.message ?? "주문 처리 중 오류가 발생했습니다.";
      throw new Error(msg);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return { cart, isLoading, error, removeItem, checkout, refresh: fetchCart };
};