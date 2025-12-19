// src/hooks/useCheckout.ts
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import type { PaymentMethodValue } from "../components/Checkout/Checkout";

type CheckoutRequest = {
  postCode: number;
  shippingAddress: string;
  shippingPhoneNumber: string;
  receiverName: string;
  paymentMethod: PaymentMethodValue; // 프론트에서 선택한 값
};

export const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (payload: CheckoutRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      // ✅ 백엔드가 /api/orders/checkout 로 바뀐 상태 기준
      const res = await axiosInstance.post("/orders/checkout", {
        postCode: payload.postCode,
        shippingAddress: payload.shippingAddress,
        shippingPhoneNumber: payload.shippingPhoneNumber,
        receiverName: payload.receiverName,
        // paymentMethod는 "지금 당장 orders 쪽에서 안 쓰면" 빼도 되는데
        // 나중에 결제 연동할 때 필요해서 프론트는 일단 들고있기
      });

      return res.data; // OrderResponse[] 예상
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        e?.message ||
        "체크아웃 실패";
      setError(msg);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { checkout, isLoading, error };
};