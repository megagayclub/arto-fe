// src/hooks/useMyCart.ts
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchCart = async () => {
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
        const msg =
          e?.response?.data?.message ??
          e?.message ??
          "장바구니를 불러오지 못했습니다.";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  return { cart, isLoading, error };
};
