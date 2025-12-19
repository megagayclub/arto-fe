// src/components/Checkout/Checkout.tsx
import React, { ReactNode } from "react";
import {
  LayoutContainer,
  MainGrid,
  InputColumn,
  SectionWrapper,
  SectionTitle,
  FormRow,
  InputField,
  SelectBox,
  InfoBlock,
  ProductSummaryBlock,
  ProductInfo,
  SummaryColumn,
  SummaryRow,
  FinalPrice,
  FinalButton,
  PaymentMethod,
  RadioLabel,
} from "./CheckoutStyles";
import {
  DUMMY_PRODUCTS,
  DUMMY_SUMMARY,
  ProductItem,
  OrderSummaryData,
} from "../data/CheckoutData";

// --- 하위 컴포넌트 정의 ---

// 1. 상품 요약 정보
const ProductSummary: React.FC<{ products: ProductItem[] }> = ({
  products,
}) => (
  <ProductSummaryBlock>
    <SectionTitle>주문 / 결제</SectionTitle>
    {products.map((p) => (
      <ProductInfo key={p.id}>
        <div>{/* Image Placeholder */}</div>
        <div>
          <p>[미등록] {p.title}</p>
          <p>
            {p.year}. {p.size}
          </p>
          <span>{p.price.toLocaleString()}원</span>
        </div>
      </ProductInfo>
    ))}
  </ProductSummaryBlock>
);

// 2. 입력 필드 그룹
const InputGroup: React.FC<{ label: string; children: ReactNode }> = ({
  label,
  children,
}) => (
  <FormRow>
    <label>{label}</label>
    <div>{children}</div>
  </FormRow>
);

// 3. 결제 방법 선택
const PaymentSelection: React.FC = () => (
  <InfoBlock>
    <SectionTitle>결제 진행</SectionTitle>
    <PaymentMethod>
      <RadioLabel>
        <input type="radio" name="payment" defaultChecked />
        신용카드 결제
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="payment" />
        계좌 이체 (실시간)
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="payment" disabled />
        무통장 입금 (미지원)
      </RadioLabel>
    </PaymentMethod>
  </InfoBlock>
);

// 4. 우측 최종 결제 요약
const FinalSummary: React.FC<{ summary: OrderSummaryData }> = ({ summary }) => (
  <SummaryColumn>
    <SectionTitle>총 결제 금액</SectionTitle>

    <SummaryRow>
      <span>상품 금액 합계</span>
      <span>{summary.subtotal.toLocaleString()}원</span>
    </SummaryRow>
    <SummaryRow>
      <span>배송비</span>
      <span>{summary.shippingFee.toLocaleString()}원</span>
    </SummaryRow>
    <SummaryRow>
      <span>할인 금액</span>
      <span>{summary.discount.toLocaleString()}원</span>
    </SummaryRow>

    <FinalPrice>{summary.totalAmount.toLocaleString()}원</FinalPrice>

    <p style={{ fontSize: "12px", color: "#666", marginTop: "15px" }}>
      * 상품의 상세 정보와 결제 금액을 확인하였으며, 구매에 동의합니다.
    </p>

    <FinalButton>결제 진행</FinalButton>
  </SummaryColumn>
);

// --- Compound Component 구성 ---

interface CheckoutLayoutProps {
  children: ReactNode;
}

// Base Component: 메인 Grid 레이아웃을 정의
const CheckoutLayoutBase: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <MainGrid>{children}</MainGrid>
    </LayoutContainer>
  );
};

// 하위 컴포넌트들을 Base에 연결
export const Checkout = Object.assign(CheckoutLayoutBase, {
  // 상품 및 입력 섹션 (Left Column)
  InputColumn: InputColumn,
  Product: ProductSummary,
  InputGroup: InputGroup,
  InputField: InputField,
  Select: SelectBox,

  // 결제 방식
  Payment: PaymentSelection,

  // 결제 요약 섹션 (Right Column)
  SummaryColumn: SummaryColumn,
  FinalSummary: FinalSummary,
});
