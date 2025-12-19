import React, { useState } from "react";
import { Checkout, PaymentMethodValue } from "../components/Checkout/Checkout";
import Header from "../components/layout/Header/Header";
import { useMyCart, OrderCheckoutRequest } from "../hooks/useMyCart";
import { useAuth } from "../context/AuthContext";
import {
  SectionWrapper,
  SectionTitle,
} from "../components/Checkout/CheckoutStyles";
import axiosInstance from "../utils/axiosInstance";

const CheckoutPage: React.FC = () => {
  /* ================================
   * ✅ 모든 Hook은 무조건 최상단
   * ================================ */
  const { cart, isLoading, error } = useMyCart();
  const { userEmail } = useAuth();

  const [orderInfo, setOrderInfo] = useState<OrderCheckoutRequest>({
    shippingAddress: "",
    receiverName: "",
    receiverPhone: "",
  });

  const [detailAddress, setDetailAddress] = useState("");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodValue>("CARD");

  /* ================================
   * ✅ 조건부 return은 Hook 이후
   * ================================ */
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  /* ================================
   * 입력 핸들러
   * ================================ */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

  /* ================================
   * 주문(결제) 처리
   * ================================ */
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cart || cart.items.length === 0) {
      alert("결제할 상품이 없습니다.");
      return;
    }

    try {
      const fullAddress = `${orderInfo.shippingAddress} ${detailAddress}`.trim();

      const payload = {
        ...orderInfo,
        shippingAddress: fullAddress,
        paymentMethod, // ✅ 백엔드 enum 그대로
      };

      // axiosInstance.baseURL = "/api"
      // → POST /api/orders/checkout
      const res = await axiosInstance.post("/v1/orders/checkout", payload);

      console.log("checkout result:", res.data);

      alert("주문이 완료되었습니다!");
      window.location.href = "/mypage";
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "결제 중 오류가 발생했습니다.");
    }
  };

  /* ================================
   * 화면용 데이터 가공
   * ================================ */
  const summaryData = {
    subtotal: cart?.totalAmount ?? 0,
    shippingFee: 0,
    discount: 0,
    totalAmount: cart?.totalAmount ?? 0,
  };

  const mappedProducts =
    cart?.items.map((item) => ({
      id: String(item.cartItemId),
      title: item.title,
      artist: item.artistName,
      size: "Original Work",
      price: item.price,
      year: new Date().getFullYear(),
      thumbnail: item.thumbnailImageUrl,
    })) ?? [];

  /* ================================
   * 렌더
   * ================================ */
  return (
    <>
      <Header />

      <Checkout>
        <Checkout.InputColumn>
          {/* 상품 목록 */}
          <Checkout.Product products={mappedProducts as any} />

          {/* 주문자 정보 */}
          <SectionWrapper>
            <SectionTitle>주문자 정보</SectionTitle>
            <Checkout.InputGroup label="이메일">
              <Checkout.InputField value={userEmail ?? ""} disabled />
            </Checkout.InputGroup>
          </SectionWrapper>

          {/* 배송지 정보 */}
          <SectionWrapper>
            <SectionTitle>배송지 정보</SectionTitle>

            <Checkout.InputGroup label="수령인">
              <Checkout.InputField
                name="receiverName"
                value={orderInfo.receiverName}
                onChange={handleInputChange}
                required
              />
            </Checkout.InputGroup>

            <Checkout.InputGroup label="연락처">
              <Checkout.InputField
                name="receiverPhone"
                value={orderInfo.receiverPhone}
                onChange={handleInputChange}
                required
              />
            </Checkout.InputGroup>

            <Checkout.InputGroup label="주소">
              <Checkout.InputField
                name="shippingAddress"
                value={orderInfo.shippingAddress}
                onChange={handleInputChange}
                required
              />
            </Checkout.InputGroup>

            <Checkout.InputGroup label="상세주소">
              <Checkout.InputField
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                required
              />
            </Checkout.InputGroup>
          </SectionWrapper>

          {/* 결제 수단 */}
          <SectionWrapper>
            <Checkout.Payment
              value={paymentMethod}
              onChange={setPaymentMethod}
            />
          </SectionWrapper>
        </Checkout.InputColumn>

        {/* 결제 요약 */}
        <Checkout.SummaryColumn>
          <form onSubmit={handleCheckout}>
            <Checkout.FinalSummary summary={summaryData} />
          </form>
        </Checkout.SummaryColumn>
      </Checkout>
    </>
  );
};

export default CheckoutPage;
