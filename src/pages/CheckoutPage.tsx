import React from "react";
import { Checkout } from "../components/Checkout/Checkout";
import Header from "../components/layout/Header/Header";
import { DUMMY_PRODUCTS, DUMMY_SUMMARY } from "../components/data/CheckoutData";
import {
  SectionWrapper,
  SectionTitle,
} from "../components/Checkout/CheckoutStyles";

export const CheckoutPage: React.FC = () => {
  // 실제로는 여기서 useFetchUserOrders, useFetchCartItems 등의 훅을 사용해 데이터를 불러옵니다.
  const products = DUMMY_PRODUCTS;
  const summary = DUMMY_SUMMARY;

  // 실제 결제 API 호출 함수
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("결제 진행 버튼 클릭됨. 데이터 유효성 검사 및 API 호출 시작.");
    // window.alert('결제 API 호출 로직 실행');
  };

  return (
    <>
      <Header />
      <Checkout>
        {/* 1. 좌측 (입력 폼 및 상품 요약) 컬럼 */}
        <Checkout.InputColumn>
          {/* 1-1. 상품 요약 정보 */}
          <Checkout.Product products={products} />

          {/* 1-2. 주문자 정보 섹션 */}
          <SectionWrapper>
            <SectionTitle>주문자 정보</SectionTitle>
            <form>
              <Checkout.InputGroup label="이름">
                <Checkout.InputField placeholder="홍길동" required />
              </Checkout.InputGroup>
              <Checkout.InputGroup label="연락처">
                <Checkout.Select>
                  <option>010</option>
                  <option>011</option>
                </Checkout.Select>
                <Checkout.InputField
                  placeholder="0000-0000"
                  style={{ flexGrow: 1 }}
                  required
                />
                {/* 예시: 휴대폰 인증 버튼 */}
                <button type="button" style={{ padding: "10px 15px" }}>
                  인증
                </button>
              </Checkout.InputGroup>
              <Checkout.InputGroup label="이메일">
                <Checkout.InputField
                  placeholder="your-email@example.com"
                  type="email"
                  required
                />
              </Checkout.InputGroup>
            </form>

            {/* 약관 동의 영역 */}
            <div
              style={{
                fontSize: "12px",
                marginTop: "20px",
                borderTop: "1px dashed #eee",
                paddingTop: "10px",
              }}
            >
              <label>
                <input type="checkbox" /> 개인정보 수집 및 이용에 동의합니다.
              </label>
            </div>
          </SectionWrapper>

          {/* 1-3. 배송지 정보 섹션 */}
          <SectionWrapper>
            <SectionTitle>배송지 정보</SectionTitle>
            <form>
              <Checkout.InputGroup label="수령인">
                <Checkout.InputField placeholder="수령인 이름" required />
              </Checkout.InputGroup>
              <Checkout.InputGroup label="주소">
                <Checkout.InputField
                  placeholder="우편번호"
                  style={{ maxWidth: "100px" }}
                />
                <button type="button" style={{ padding: "10px 15px" }}>
                  주소 검색
                </button>
              </Checkout.InputGroup>
              <Checkout.InputGroup label="상세주소">
                <Checkout.InputField
                  placeholder="기본 주소"
                  style={{ marginBottom: "5px" }}
                  required
                />
                <Checkout.InputField placeholder="상세 주소" required />
              </Checkout.InputGroup>
            </form>
          </SectionWrapper>

          {/* 1-4. 결제 방법 선택 섹션 */}
          <SectionWrapper>
            <Checkout.Payment />
          </SectionWrapper>
        </Checkout.InputColumn>

        {/* 2. 우측 (결제 요약 및 버튼) 컬럼 */}
        <Checkout.SummaryColumn>
          {/* 2-1. 최종 결제 요약 (FinalSummary 컴포넌트는 내부에 FinalButton을 포함) */}
          <form onSubmit={handleCheckout}>
            <Checkout.FinalSummary summary={summary} />
          </form>
        </Checkout.SummaryColumn>
      </Checkout>
    </>
  );
};
