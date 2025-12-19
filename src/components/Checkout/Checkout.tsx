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
          <img src={p.thumbnail} alt={p.title} />
        </div>
        <div>
          <p>{p.title}</p>
          <p>{p.year}, {p.artist}</p>
          <span>{p.price.toLocaleString()}원</span>
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
    <SectionTitle>결제정보</SectionTitle>
    <PaymentMethod style={{ flexDirection: "row", gap: "30px" }}>
      <RadioLabel>
        <input type="radio" name="payment" defaultChecked />
        카드 결제
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="payment" />
        실시간 계좌이체
      </RadioLabel>
      <RadioLabel>
        <input type="radio" name="payment" />
        무통장 입금
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
    <SummaryBox>
    {/* 주문자 정보 섹션 */}
    <SideSection>
      <SectionTitle>주문자 정보</SectionTitle>
      <p style={{ fontSize: "14px", color: "#333" }}>{userEmail}</p>
    </SideSection>

    {/* 배송 안내 섹션 */}
    <SideSection style={{marginBottom: "100px"}}>
      <SideInfoText>
        <h4>택배 배송</h4>
        <p>택배 배송이 가능한 작품들은 1만원의 포장 및 배송료가 부과됩니다.</p>
      </SideInfoText>
      <SideInfoText>
        <h4>착불 배송</h4>
        <p>택배 배송이 불가한 작품(부피, 무게 초과)의 경우 미술품 전문차량으로 개별 배송되며...</p>
      </SideInfoText>
      <SideInfoText>
        <h4>개별 배송</h4>
        <p>개별 배송되는 작품은 미술품 전문배송차량으로 개별 배송됩니다. (무료서비스)</p>
      </SideInfoText>
    </SideSection>
    </SummaryBox>
    {/* 결제 요약 박스 */}
    <SummaryBox>
      <SectionTitle style={{ border: "none", marginBottom: "10px" }}>총 결제금액</SectionTitle>
      <FinalPrice>{summary.totalAmount.toLocaleString()}원</FinalPrice>

      <SummaryRow>
        <span>총 상품금액</span>
        <span>{summary.subtotal.toLocaleString()}원</span>
      </SummaryRow>
      <SummaryRow>
        <span>배송비</span>
        <span>{summary.shippingFee.toLocaleString()}원</span>
      </SummaryRow>

      <AgreementSection>
        <label>
          <input type="checkbox" /> <strong>전체동의</strong>
        </label>
        <div className="sub-agreement">
          <label><input type="checkbox" /> Arto 구매약관 동의</label>
          <label><input type="checkbox" /> 개인정보수집 및 이용, 제3자 제공/위탁 동의</label>
          <label><input type="checkbox" /> 위 상품의 구매조건 확인 및 결제진행 동의</label>
        </div>
      </AgreementSection>

      <FinalButton>결제하기</FinalButton>
    </SummaryBox>
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