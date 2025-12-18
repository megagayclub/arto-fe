// src/hooks/useMyOrders.ts
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export interface OrderHistoryItem {
  orderId: number;
  artworkTitle: string;
  artistName: string;
  thumbnailUrl: string | null;
  totalAmount: number | string; // BigDecimal이 string/number로 올 수 있어서 안전 처리
  orderDate: string;            // LocalDate -> "YYYY-MM-DD"
  orderStatus: string;          // "PENDING" | "SHIPPED" ...
}

export const useMyOrders = () => {
  const [orders, setOrders] = useState<OrderHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyOrders = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // axiosInstance.baseURL="/api" 이므로 "/orders/me" -> "/api/orders/me"
        const res = await axiosInstance.get<OrderHistoryItem[]>("/orders/my");
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (e: any) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "구매(주문) 이력 조회 실패";
        setError(msg);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  return { orders, isLoading, error };
};
