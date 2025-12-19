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
    <SectionTitle>注文・お支払い</SectionTitle>
    {products.map((p) => (
      <ProductInfo key={p.id}>
        <div>{/* Image Placeholder */}</div>
        <div>
          <p>[未登録] {p.title}</p>
          <p>
            {p.year}. {p.size}
          </p>
          <span>{p.price.toLocaleString()}円</span>
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
    <SectionTitle>お支払い方法</SectionTitle>
    <PaymentMethod>
      <RadioLabel>
        <input type="radio" name="payment" defaultChecked />
        クレジットカード決済
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="payment" />
        口座振替（リアルタイム）
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="payment" disabled />
        銀行振込（未対応）
      </RadioLabel>
    </PaymentMethod>
  </InfoBlock>
);

// 4. 우측 최종 결제 요약
const FinalSummary: React.FC<{ summary: OrderSummaryData }> = ({ summary }) => (
  <SummaryColumn>
    <SectionTitle>お支払い合計金額</SectionTitle>

    <SummaryRow>
      <span>商品合計金額</span>
      <span>{summary.subtotal.toLocaleString()}원</span>
    </SummaryRow>
    <SummaryRow>
      <span>送料</span>
      <span>{summary.shippingFee.toLocaleString()}원</span>
    </SummaryRow>
    <SummaryRow>
      <span>割引金額</span>
      <span>{summary.discount.toLocaleString()}원</span>
    </SummaryRow>

    <FinalPrice>{summary.totalAmount.toLocaleString()}원</FinalPrice>

    <p style={{ fontSize: "12px", color: "#666", marginTop: "15px" }}>
      * 商品の詳細内容およびお支払い金額を確認の上、購入に同意します。
    </p>

    <FinalButton>お支払いへ進む</FinalButton>
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
