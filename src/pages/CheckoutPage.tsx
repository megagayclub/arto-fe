import React, { useState } from "react";
import { Checkout } from "../components/Checkout/Checkout";
import Header from "../components/layout/Header/Header";
import { useMyCart, OrderCheckoutRequest } from "../hooks/useMyCart";
import { useAuth  } from "../context/AuthContext";
import { SectionWrapper, SectionTitle } from "../components/Checkout/CheckoutStyles";
import axiosInstance from "../utils/axiosInstance";

const CheckoutPage: React.FC = () => {
  // 1. 커스텀 훅을 통한 장바구니 데이터 fetch
  const { cart, isLoading, error } = useMyCart();

  // 2. 배송 및 주문자 정보 상태 관리
  const [orderInfo, setOrderInfo] = useState<OrderCheckoutRequest>({
    shippingAddress: "",
    receiverName: "",
    receiverPhone: "",
  });

  const [detailAddress, setDetailAddress] = useState(""); // 상세주소 별도 관리

  // 3. 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

  // 4. 결제(주문) API 호출
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cart || cart.items.length === 0) {
      alert("결제할 상품이 없습니다.");
      return;
    }

    try {
      const fullAddress = `${orderInfo.shippingAddress} ${detailAddress}`;
      const payload = {
        ...orderInfo,
        shippingAddress: fullAddress,
      };

      // 백엔드 주문 생성 엔드포인트 호출 (예시: /v1/orders)
      await axiosInstance.post("/v1/orders", payload);
      
      alert("주문이 완료되었습니다!");
      // 결제 완료 후 페이지 이동 (예: 주문 내역 페이지)
      window.location.href = "/my/orders";
    } catch (err: any) {
      alert(err?.response?.data?.message || "결제 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  // 5. 컴포넌트 데이터 매핑
  const summaryData = {
    subtotal: cart?.totalAmount || 0,
    shippingFee: 0,
    discount: 0,
    totalAmount: cart?.totalAmount || 0,
  };

  // CartItem[] 타입을 Checkout.Product가 기대하는 ProductItem[] 타입으로 매핑
  const { userEmail } = useAuth();
  const mappedProducts = cart?.items.map((item) => ({
    id: item.cartItemId.toString(),
    title: item.title,
    artist: item.artistName,
    size: "Original Work", // 필요시 추가 데이터 사용
    price: item.price,
    year: new Date().getFullYear(),
    thumbnail: item.thumbnailImageUrl
  })) || [];

  return (
    <>
      <Header />
      <Checkout>
        <Checkout.InputColumn>
          {/* 실제 장바구니 상품 목록 */}
          <Checkout.Product products={mappedProducts as any} />

          <SectionWrapper>
            <SectionTitle>주문자 정보</SectionTitle>
            <form>
               {/* 주문자 정보 필드들... */}
               <Checkout.InputGroup label="이름">
                <Checkout.InputField placeholder="홍길동" required />
              </Checkout.InputGroup>
            </form>
          </SectionWrapper>

          <SectionWrapper>
            <SectionTitle>배송지 정보</SectionTitle>
            <form>
              <Checkout.InputGroup label="수령인">
                <Checkout.InputField 
                  name="receiverName"
                  value={orderInfo.receiverName}
                  onChange={handleInputChange}
                  placeholder="수령인 이름" 
                  required 
                />
              </Checkout.InputGroup>
              <Checkout.InputGroup label="연락처">
                <Checkout.InputField
                  name="receiverPhone"
                  value={orderInfo.receiverPhone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  required
                />
              </Checkout.InputGroup>
              <Checkout.InputGroup label="주소">
                <Checkout.InputField
                  name="shippingAddress"
                  value={orderInfo.shippingAddress}
                  onChange={handleInputChange}
                  placeholder="기본 주소 (또는 우편번호)"
                  required
                />
              </Checkout.InputGroup>
              <Checkout.InputGroup label="상세주소">
                <Checkout.InputField 
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="상세 주소를 입력하세요" 
                  required 
                />
              </Checkout.InputGroup>
            </form>
          </SectionWrapper>

          <SectionWrapper>
            <Checkout.Payment />
          </SectionWrapper>
        </Checkout.InputColumn>

        <Checkout.SummaryColumn>
          {/* API에서 계산된 합계 금액 전달 */}
          <form onSubmit={handleCheckout}>
            <Checkout.FinalSummary 
            summary={summaryData} 
            userEmail={userEmail || "로그인이 필요합니다"} 
          />
          </form>
        </Checkout.SummaryColumn>
      </Checkout>
    </>
  );
};

export default CheckoutPage;