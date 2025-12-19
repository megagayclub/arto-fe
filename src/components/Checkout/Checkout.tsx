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
  SummaryBox,
  SummaryRow,
  FinalPrice,
  FinalButton,
  PaymentMethod,
  RadioLabel,
  SideSection,
  SideInfoText,
  AgreementSection,
} from "./CheckoutStyles";
import { ProductItem, OrderSummaryData } from "../data/CheckoutData";

// --- 하위 컴포넌트 정의 ---

const ProductSummary: React.FC<{ products: ProductItem[] }> = ({ products }) => (
  <ProductSummaryBlock>
    <SectionTitle>注文・お支払い</SectionTitle>
    {products.map((p) => (
      <ProductInfo key={p.id}>
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

const InputGroup: React.FC<{ label: string; children: ReactNode }> = ({ label, children }) => (
  <FormRow>
    <label>{label}</label>
    <div>{children}</div>
  </FormRow>
);

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

// 4. 우측 최종 결제 요약 (사진의 주문자 정보 + 배송안내 + 결제박스 포함)
const FinalSummary: React.FC<{ summary: OrderSummaryData; userEmail?: string }> = ({ 
  summary, 
  userEmail="시발럼"
}) => (
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

interface CheckoutLayoutProps {
  children: ReactNode;
}

const CheckoutLayoutBase: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <MainGrid>{children}</MainGrid>
    </LayoutContainer>
  );
};

export const Checkout = Object.assign(CheckoutLayoutBase, {
  InputColumn: InputColumn,
  Product: ProductSummary,
  InputGroup: InputGroup,
  InputField: InputField,
  Select: SelectBox,
  Payment: PaymentSelection,
  SummaryColumn: SummaryColumn,
  FinalSummary: FinalSummary,
});
